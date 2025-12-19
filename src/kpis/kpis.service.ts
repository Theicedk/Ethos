import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateKpiDefinitionDto } from './dto/create-kpi-definition.dto';
import { UpdateKpiDefinitionDto } from './dto/update-kpi-definition.dto';
import { CreateKpiLogDto } from './dto/create-kpi-log.dto';

@Injectable()
export class KpisService {
    constructor(private prisma: PrismaService) { }

    // --- Definitions ---

    async createDefinition(userId: string, createDto: CreateKpiDefinitionDto) {
        return this.prisma.kPI_Definition.create({
            data: {
                ...createDto,
                userId,
            },
        });
    }

    async findAllDefinitions(userId: string) {
        return this.prisma.kPI_Definition.findMany({
            where: { userId },
        });
    }

    async findOneDefinition(userId: string, id: string) {
        const kpi = await this.prisma.kPI_Definition.findFirst({
            where: { id, userId },
        });

        if (!kpi) {
            throw new NotFoundException(`KPI Definition with ID ${id} not found`);
        }

        return kpi;
    }

    async updateDefinition(userId: string, id: string, updateDto: UpdateKpiDefinitionDto) {
        await this.findOneDefinition(userId, id); // Ensure ownership

        return this.prisma.kPI_Definition.update({
            where: { id },
            data: updateDto,
        });
    }

    // --- Logs ---

    async createLog(userId: string, createLogDto: CreateKpiLogDto) {
        const definition = await this.findOneDefinition(userId, createLogDto.kpiDefinitionId);

        // Ownership verified by findOneDefinition

        return this.prisma.kPI_Log.create({
            data: createLogDto,
        });
    }

    async getLogsForDefinition(userId: string, definitionId: string) {
        await this.findOneDefinition(userId, definitionId); // Ensure ownership

        return this.prisma.kPI_Log.findMany({
            where: { kpiDefinitionId: definitionId },
            orderBy: { date: 'desc' }
        });
    }

    async getDashboardMetrics(userId: string) {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const definitions = await this.prisma.kPI_Definition.findMany({
            where: { userId },
            include: {
                logs: {
                    where: {
                        date: {
                            gte: todayStart,
                            lte: todayEnd,
                        }
                    },
                    take: 1
                }
            }
        });

        return definitions.map(def => {
            const todayLog = def.logs[0];
            return {
                id: def.id,
                title: def.title,
                type: def.type,
                target: def.target_value,
                plannedValue: todayLog?.plannedValue || 0,
                actualValue: todayLog?.actualValue || 0,
            };
        });
    }
}

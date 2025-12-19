import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTimeBlockDto } from './dto/create-time-block.dto';
import { UpdateTimeBlockDto } from './dto/update-time-block.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TimeBlocksService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, createDto: CreateTimeBlockDto) {
        // --- DEBUG LOGS (Para ver qué está fallando) ---

        // 1. Validar que el Focus Area existe
        const focusArea = await this.prisma.focusArea.findUnique({
            where: { id: createDto.focusAreaId },
        });

        if (!focusArea) {
            console.error('❌ ERROR: El Focus Area NO existe en la base de datos.');
            throw new NotFoundException('Focus Area not found in DB');
        }

        if (focusArea.userId !== userId) {
            console.error(`❌ ERROR: El Area existe pero es de otro usuario.Dueño real: ${focusArea.userId}`);
            throw new NotFoundException('Focus Area belongs to another user');
        }

        console.log('✅ Focus Area validada correctamente.');

        // 2. Validar Goal (si existe)
        if (createDto.goalId) {
            const goal = await this.prisma.goal.findUnique({
                where: { id: createDto.goalId },
            });
            if (!goal || goal.focusAreaId !== focusArea.id) {
                throw new NotFoundException(
                    'Goal not found or does not belong to Focus Area',
                );
            }
        }

        // 3. Crear el bloque
        return this.prisma.timeBlock.create({
            data: {
                ...createDto,
                userId,
            },
        });
    }

    // ... (Mantén el resto de métodos findAll, update, remove igual que antes)
    async findAll(userId: string, startDate?: string, endDate?: string) {
        return this.prisma.timeBlock.findMany({
            where: {
                userId,
                startTime: startDate ? { gte: new Date(startDate) } : undefined,
                endTime: endDate ? { lte: new Date(endDate) } : undefined,
            },
            include: { focusArea: true }, // Incluir datos del area para mostrar colores
        });
    }

    async findOne(id: string, userId: string) {
        return this.prisma.timeBlock.findFirst({
            where: { id, userId }
        });
    }

    async update(id: string, userId: string, updateDto: UpdateTimeBlockDto) {
        return this.prisma.timeBlock.updateMany({
            where: { id, userId },
            data: updateDto
        });
    }

    async remove(id: string, userId: string) {
        return this.prisma.timeBlock.deleteMany({
            where: { id, userId }
        });
    }
}
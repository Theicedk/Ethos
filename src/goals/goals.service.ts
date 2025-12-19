import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { GoalStatus } from '@prisma/client';

@Injectable()
export class GoalsService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, createGoalDto: CreateGoalDto) {
        const focusArea = await this.prisma.focusArea.findUnique({
            where: { id: createGoalDto.focusAreaId },
        });

        if (!focusArea) {
            throw new NotFoundException('Focus Area not found');
        }

        if (focusArea.userId !== userId) {
            throw new ForbiddenException('You do not own this Focus Area');
        }

        return this.prisma.goal.create({
            data: {
                ...createGoalDto,
                status: createGoalDto.status || GoalStatus.ACTIVE,
            },
        });
    }

    async findAll(userId: string, status?: GoalStatus) {
        return this.prisma.goal.findMany({
            where: {
                focusArea: {
                    userId,
                },
                ...(status ? { status } : {}),
            },
            include: {
                focusArea: true,
            },
        });
    }

    async findOne(userId: string, id: string) {
        const goal = await this.prisma.goal.findFirst({
            where: {
                id,
                focusArea: {
                    userId,
                },
            },
            include: {
                focusArea: true,
            },
        });

        if (!goal) {
            throw new NotFoundException(`Goal with ID ${id} not found`);
        }

        return goal;
    }

    async update(userId: string, id: string, updateGoalDto: UpdateGoalDto) {
        await this.findOne(userId, id); // Ensure ownership

        return this.prisma.goal.update({
            where: { id },
            data: updateGoalDto,
        });
    }

    async remove(userId: string, id: string) {
        await this.findOne(userId, id); // Ensure ownership

        return this.prisma.goal.delete({
            where: { id },
        });
    }
}

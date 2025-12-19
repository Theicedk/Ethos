import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFocusAreaDto } from './dto/create-focus-area.dto';
import { UpdateFocusAreaDto } from './dto/update-focus-area.dto';

@Injectable()
export class FocusAreasService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, createFocusAreaDto: CreateFocusAreaDto) {
        return this.prisma.focusArea.create({
            data: {
                ...createFocusAreaDto,
                userId,
            },
        });
    }

    async findAll(userId: string) {
        return this.prisma.focusArea.findMany({
            where: { userId },
        });
    }

    async findOne(userId: string, id: string) {
        const focusArea = await this.prisma.focusArea.findFirst({
            where: { id, userId },
        });

        if (!focusArea) {
            throw new NotFoundException(`Focus Area with ID ${id} not found`);
        }

        return focusArea;
    }

    async update(userId: string, id: string, updateFocusAreaDto: UpdateFocusAreaDto) {
        await this.findOne(userId, id); // Ensure ownership

        return this.prisma.focusArea.update({
            where: { id },
            data: updateFocusAreaDto,
        });
    }

    async remove(userId: string, id: string) {
        await this.findOne(userId, id); // Ensure ownership

        return this.prisma.focusArea.delete({
            where: { id },
        });
    }
}

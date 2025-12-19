import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GoalStatus } from '@prisma/client';

@Controller('goals')
@UseGuards(JwtAuthGuard)
export class GoalsController {
    constructor(private readonly goalsService: GoalsService) { }

    @Post()
    create(@Request() req, @Body() createGoalDto: CreateGoalDto) {
        return this.goalsService.create(req.user.id, createGoalDto);
    }

    @Get()
    findAll(@Request() req, @Query('status') status?: GoalStatus) {
        return this.goalsService.findAll(req.user.id, status);
    }

    @Get(':id')
    findOne(@Request() req, @Param('id') id: string) {
        return this.goalsService.findOne(req.user.id, id);
    }

    @Patch(':id')
    update(@Request() req, @Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto) {
        return this.goalsService.update(req.user.id, id, updateGoalDto);
    }

    @Delete(':id')
    remove(@Request() req, @Param('id') id: string) {
        return this.goalsService.remove(req.user.id, id);
    }
}

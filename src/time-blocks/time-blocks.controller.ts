import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { TimeBlocksService } from './time-blocks.service';
import { CreateTimeBlockDto } from './dto/create-time-block.dto';
import { UpdateTimeBlockDto } from './dto/update-time-block.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('time-blocks')
@UseGuards(JwtAuthGuard)
export class TimeBlocksController {
    constructor(private readonly timeBlocksService: TimeBlocksService) { }

    @Post()
    create(@Request() req, @Body() createDto: CreateTimeBlockDto) {
        // CORREGIDO: Usamos req.user.id en vez de req.user.userId
        return this.timeBlocksService.create(req.user.id, createDto);
    }

    @Get()
    findAll(
        @Request() req,
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string,
    ) {
        // CORREGIDO
        return this.timeBlocksService.findAll(req.user.id, startDate, endDate);
    }

    @Get(':id')
    findOne(@Request() req, @Param('id') id: string) {
        // CORREGIDO
        return this.timeBlocksService.findOne(id, req.user.id);
    }

    @Patch(':id')
    update(@Request() req, @Param('id') id: string, @Body() updateDto: UpdateTimeBlockDto) {
        // CORREGIDO
        return this.timeBlocksService.update(id, req.user.id, updateDto);
    }

    @Delete(':id')
    remove(@Request() req, @Param('id') id: string) {
        // CORREGIDO
        return this.timeBlocksService.remove(id, req.user.id);
    }
}
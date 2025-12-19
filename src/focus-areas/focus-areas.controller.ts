import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { FocusAreasService } from './focus-areas.service';
import { CreateFocusAreaDto } from './dto/create-focus-area.dto';
import { UpdateFocusAreaDto } from './dto/update-focus-area.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('focus-areas')
@UseGuards(JwtAuthGuard)
export class FocusAreasController {
    constructor(private readonly focusAreasService: FocusAreasService) { }

    @Post()
    create(@Request() req, @Body() createFocusAreaDto: CreateFocusAreaDto) {
        return this.focusAreasService.create(req.user.id, createFocusAreaDto);
    }

    @Get()
    findAll(@Request() req) {
        return this.focusAreasService.findAll(req.user.id);
    }

    @Get(':id')
    findOne(@Request() req, @Param('id') id: string) {
        return this.focusAreasService.findOne(req.user.id, id);
    }

    @Patch(':id')
    update(@Request() req, @Param('id') id: string, @Body() updateFocusAreaDto: UpdateFocusAreaDto) {
        return this.focusAreasService.update(req.user.id, id, updateFocusAreaDto);
    }

    @Delete(':id')
    remove(@Request() req, @Param('id') id: string) {
        return this.focusAreasService.remove(req.user.id, id);
    }
}

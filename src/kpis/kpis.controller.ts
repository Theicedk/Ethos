import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { KpisService } from './kpis.service';
import { CreateKpiDefinitionDto } from './dto/create-kpi-definition.dto';
import { UpdateKpiDefinitionDto } from './dto/update-kpi-definition.dto';
import { CreateKpiLogDto } from './dto/create-kpi-log.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('kpis')
@UseGuards(JwtAuthGuard)
export class KpisController {
    constructor(private readonly kpisService: KpisService) { }

    // --- KPI Definitions ---

    @Post('definitions')
    createDefinition(@Request() req, @Body() createDto: CreateKpiDefinitionDto) {
        return this.kpisService.createDefinition(req.user.id, createDto);
    }

    @Get('definitions')
    findAllDefinitions(@Request() req) {
        return this.kpisService.findAllDefinitions(req.user.id);
    }

    @Get('definitions/:id')
    findOneDefinition(@Request() req, @Param('id') id: string) {
        return this.kpisService.findOneDefinition(req.user.id, id);
    }

    @Patch('definitions/:id')
    updateDefinition(@Request() req, @Param('id') id: string, @Body() updateDto: UpdateKpiDefinitionDto) {
        return this.kpisService.updateDefinition(req.user.id, id, updateDto);
    }

    // --- KPI Logs ---

    @Post('log')
    logKpi(@Request() req, @Body() createLogDto: CreateKpiLogDto) {
        return this.kpisService.createLog(req.user.id, createLogDto);
    }

    @Get('definitions/:id/logs')
    getLogs(@Request() req, @Param('id') definitionId: string) {
        return this.kpisService.getLogsForDefinition(req.user.id, definitionId);
    }

    @Get('dashboard')
    getDashboardMetrics(@Request() req) {
        return this.kpisService.getDashboardMetrics(req.user.id);
    }
}

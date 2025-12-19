import { IsNotEmpty, IsNumber, IsString, IsOptional, IsUUID, IsDateString } from 'class-validator';

export class CreateKpiLogDto {
    @IsNumber()
    @IsNotEmpty()
    value_recorded: number;

    @IsDateString()
    @IsNotEmpty()
    date: string;

    @IsString()
    @IsOptional()
    notes?: string;

    @IsUUID()
    @IsNotEmpty()
    kpiDefinitionId: string;
}

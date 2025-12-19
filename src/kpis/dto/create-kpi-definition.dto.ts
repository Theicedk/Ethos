import { IsNotEmpty, IsString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { KpiType, KpiFrequency } from '@prisma/client';

export class CreateKpiDefinitionDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsEnum(KpiType)
    @IsNotEmpty()
    type: KpiType;

    @IsNumber()
    @IsOptional()
    target_value?: number;

    @IsEnum(KpiFrequency)
    @IsNotEmpty()
    frequency: KpiFrequency;
}

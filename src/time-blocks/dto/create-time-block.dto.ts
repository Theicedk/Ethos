import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTimeBlockDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDateString()
    @IsNotEmpty()
    startTime: string; // ISO 8601

    @IsDateString()
    @IsNotEmpty()
    endTime: string; // ISO 8601

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    focusAreaId: string;

    @IsOptional()
    @IsString()
    @IsUUID()
    goalId?: string;

    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean;
}

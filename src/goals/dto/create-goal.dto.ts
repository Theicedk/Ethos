import { IsNotEmpty, IsString, IsOptional, IsEnum, IsUUID, IsDateString } from 'class-validator';
import { GoalStatus } from '@prisma/client';

export class CreateGoalDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDateString()
    @IsNotEmpty()
    deadline: string;

    @IsEnum(GoalStatus)
    @IsOptional()
    status?: GoalStatus;

    @IsUUID()
    @IsNotEmpty()
    focusAreaId: string;
}

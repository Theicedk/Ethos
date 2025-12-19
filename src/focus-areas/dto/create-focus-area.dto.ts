import { IsNotEmpty, IsString, IsHexColor } from 'class-validator';

export class CreateFocusAreaDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @IsHexColor()
    color_code: string;
}

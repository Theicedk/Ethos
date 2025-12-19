import { PartialType } from '@nestjs/mapped-types';
import { CreateFocusAreaDto } from './create-focus-area.dto';

export class UpdateFocusAreaDto extends PartialType(CreateFocusAreaDto) { }

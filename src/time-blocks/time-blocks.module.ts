import { Module } from '@nestjs/common';
import { TimeBlocksService } from './time-blocks.service';
import { TimeBlocksController } from './time-blocks.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [TimeBlocksController],
    providers: [TimeBlocksService],
})
export class TimeBlocksModule { }

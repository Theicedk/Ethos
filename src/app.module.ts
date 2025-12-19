import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { FocusAreasModule } from './focus-areas/focus-areas.module';
import { GoalsModule } from './goals/goals.module';
import { KpisModule } from './kpis/kpis.module';
import { TimeBlocksModule } from './time-blocks/time-blocks.module';

@Module({
  imports: [AuthModule, PrismaModule, FocusAreasModule, GoalsModule, KpisModule, TimeBlocksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

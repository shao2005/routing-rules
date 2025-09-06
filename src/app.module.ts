import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { RoutingRulesModule } from './rules/routing-rules.module.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [RoutingRulesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

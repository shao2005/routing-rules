import { Module } from '@nestjs/common';
import { RoutingRulesController } from './routing-rules.controller.js';
import { RoutingRulesService } from './routing-rules.service.js';
import { PrismaModule } from '../../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [RoutingRulesController],
  providers: [RoutingRulesService],
})
export class RoutingRulesModule {}

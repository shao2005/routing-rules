import { Module } from '@nestjs/common';
import { RoutingRulesController } from './routing-rules.controller';
import { RoutingRulesService } from './routing-rules.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RoutingRulesController],
  providers: [RoutingRulesService],
})
export class RoutingRulesModule {}

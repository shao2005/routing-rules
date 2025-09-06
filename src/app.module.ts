import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoutingRulesModule } from './rules/routing-rules.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [RoutingRulesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

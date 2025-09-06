import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RulesModule } from './rules/rules.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [RulesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

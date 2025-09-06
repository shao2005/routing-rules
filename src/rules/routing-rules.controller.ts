import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateRoutingRuleDto } from './dto/create-routing-rule.dto';
import { RoutingRulesService } from './routing-rules.service';

@Controller('routing-rules')
export class RoutingRulesController {
  constructor(private readonly routingRulesService: RoutingRulesService) {}

  @Post()
  async create(@Body() createDto: CreateRoutingRuleDto) {
    return this.routingRulesService.create(createDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.routingRulesService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.routingRulesService.findAll();
  }
}

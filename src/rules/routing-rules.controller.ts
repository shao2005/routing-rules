import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';

import { CreateRoutingRuleDto } from './dto/create-routing-rule.dto.js';
import { RoutingRulesService } from './routing-rules.service.js';
import { EvaluateContactDto } from './dto/evaluate-contact.dto.js';
import { UpdateRoutingRuleDto } from './dto/update-routing-rule.dto.js';

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

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateRoutingRuleDto,
  ) {
    return this.routingRulesService.update(id, updateDto);
  }

  @Post(':id/evaluate')
  async evaluate(
    @Param('id', ParseIntPipe) id: number,
    @Body() contactInfo: EvaluateContactDto,
  ) {
    const memberId = await this.routingRulesService.evaluateRule(
      id,
      contactInfo,
    );
    return { memberId };
  }
}

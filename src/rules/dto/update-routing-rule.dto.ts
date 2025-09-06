import { PartialType } from '@nestjs/mapped-types';
import { CreateRoutingRuleDto } from './create-routing-rule.dto.js';

export class UpdateRoutingRuleDto extends PartialType(CreateRoutingRuleDto) {}

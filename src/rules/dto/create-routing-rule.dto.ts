import {
  IsString,
  IsOptional,
  ValidateNested,
  ArrayMinSize,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class StatementDto {
  @IsString()
  field: string;

  @IsString()
  operator: string;

  @IsString()
  value: string;
}

export class RuleDto {
  @IsString()
  memberId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StatementDto)
  statements: StatementDto[];
}

export class CreateRoutingRuleDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  defaultMemberId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => RuleDto)
  rules: RuleDto[];
}

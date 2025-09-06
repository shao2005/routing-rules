import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateRoutingRuleDto,
  Operator,
} from './dto/create-routing-rule.dto.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { EvaluateContactDto } from './dto/evaluate-contact.dto';
import { UpdateRoutingRuleDto } from './dto/update-routing-rule.dto';

type ContactValue = string | number | Date | undefined;

const mapStatementOperatorToOperator = {
  '=': Operator.EQ,
  '>': Operator.GT,
  '<': Operator.LT,
};

@Injectable()
export class RoutingRulesService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateRoutingRuleDto) {
    const created = await this.prisma.routingRule.create({
      data: {
        name: createDto.name,
        description: createDto.description,
        defaultMemberId: createDto.defaultMemberId,
        rules: {
          create: createDto.rules.map((rule) => ({
            memberId: rule.memberId,
            statements: {
              create: rule.statements.map((stmt) => ({
                field: stmt.field,
                operator: stmt.operator,
                value: stmt.value,
              })),
            },
          })),
        },
      },
      include: {
        rules: { include: { statements: true } },
      },
    });

    return created;
  }

  async findOne(id: number) {
    const routingRuleSet = await this.prisma.routingRule.findUnique({
      where: { id },
      include: { rules: { include: { statements: true } } },
    });

    if (!routingRuleSet)
      throw new NotFoundException(`Routing rule ${id} not found`);

    return routingRuleSet;
  }

  async findAll() {
    const routingRulesSet = await this.prisma.routingRule.findMany({
      include: { rules: { include: { statements: true } } },
    });

    return routingRulesSet;
  }

  async update(id: number, updateDto: UpdateRoutingRuleDto) {
    const existingRule = await this.prisma.routingRule.findUnique({
      where: { id },
      include: { rules: { include: { statements: true } } },
    });

    if (!existingRule) {
      throw new NotFoundException(`Routing rule ${id} not found`);
    }

    // For simplicity, remove existing rules and statements, then recreate
    await this.prisma.statement.deleteMany({
      where: { ruleId: { in: existingRule.rules.map((r) => r.id) } },
    });

    await this.prisma.rule.deleteMany({
      where: { routingRuleId: id },
    });

    // Now update routingRule general fields and recreate rules/statements
    const updatedRule = await this.prisma.routingRule.update({
      where: { id },
      data: {
        name: updateDto.name,
        description: updateDto.description,
        defaultMemberId: updateDto.defaultMemberId,
        rules: {
          create: updateDto.rules?.map((rule) => ({
            memberId: rule.memberId,
            statements: {
              create: rule.statements.map((stmt) => ({
                field: stmt.field,
                operator: stmt.operator,
                value: stmt.value,
              })),
            },
          })),
        },
      },
      include: { rules: { include: { statements: true } } },
    });

    return updatedRule;
  }

  private compare(
    inputValue: ContactValue,
    operator: Operator,
    expectedStatementValue: string,
  ): boolean {
    if (inputValue === undefined) return false;

    if (typeof inputValue === 'number') {
      const expectedNum = Number(expectedStatementValue);
      if (isNaN(expectedNum)) return false;
      switch (operator) {
        case Operator.EQ:
          return inputValue === expectedNum;
        case Operator.GT:
          return inputValue > expectedNum;
        case Operator.LT:
          return inputValue < expectedNum;
        default:
          return false;
      }
    }

    if (inputValue instanceof Date) {
      const expectedDate = new Date(expectedStatementValue);
      if (isNaN(expectedDate.getTime())) return false;
      switch (operator) {
        case Operator.EQ:
          return inputValue.getTime() === expectedDate.getTime();
        case Operator.GT:
          return inputValue.getTime() > expectedDate.getTime();
        case Operator.LT:
          return inputValue.getTime() < expectedDate.getTime();
        default:
          return false;
      }
    }

    switch (operator) {
      case Operator.EQ:
        return (
          String(inputValue).toLowerCase() ===
          expectedStatementValue.toLowerCase()
        );
      default:
        return false;
    }
  }

  async evaluateRule(
    ruleId: number,
    contact: EvaluateContactDto,
  ): Promise<string> {
    const ruleSet = await this.findOne(ruleId);

    for (const rule of ruleSet.rules) {
      const isMatch = rule.statements.some((stmt) => {
        let inputValue: ContactValue = undefined;

        switch (stmt.field) {
          case 'contactCountry':
            inputValue = contact.contactCountry;
            break;
          case 'companySize':
            inputValue = contact.companySize;
            break;
          case 'companyHQCountry':
            inputValue = contact.companyHQCountry;
            break;
          case 'companyIndustry':
            inputValue = contact.companyIndustry;
            break;
          case 'companyName':
            inputValue = contact.companyName;
            break;
          case 'contactDevice':
            inputValue = contact.contactDevice;
            break;
          case 'firstPage':
            inputValue = contact.firstPage;
            break;
          case 'firstSeen':
            inputValue = contact.firstSeen
              ? new Date(contact.firstSeen)
              : undefined;
            break;
          case 'lastSeen':
            inputValue = contact.lastSeen
              ? new Date(contact.lastSeen)
              : undefined;
            break;
          default:
            return false;
        }

        const statementOperator = mapStatementOperatorToOperator[stmt.operator];
        return this.compare(inputValue, statementOperator, stmt.value);
      });

      if (isMatch) {
        return rule.memberId;
      }
    }

    return ruleSet.defaultMemberId;
  }
}

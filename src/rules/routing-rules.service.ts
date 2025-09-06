import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoutingRuleDto } from './dto/create-routing-rule.dto';
import { PrismaService } from 'prisma/prisma.service';

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
}

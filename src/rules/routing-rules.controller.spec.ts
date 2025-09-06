import { Test, TestingModule } from '@nestjs/testing';
import { RoutingRulesController } from './routing-rules.controller';

describe('RoutingRulesController', () => {
  let controller: RoutingRulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoutingRulesController],
    }).compile();

    controller = module.get<RoutingRulesController>(RoutingRulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

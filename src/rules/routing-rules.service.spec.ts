import { Test, TestingModule } from '@nestjs/testing';
import { RoutingRulesService } from './routing-rules.service';

describe('RoutingRulesService', () => {
  let service: RoutingRulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoutingRulesService],
    }).compile();

    service = module.get<RoutingRulesService>(RoutingRulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

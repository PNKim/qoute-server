import { Test, TestingModule } from '@nestjs/testing';
import { QouteService } from './qoute.service';

describe('QouteService', () => {
  let service: QouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QouteService],
    }).compile();

    service = module.get<QouteService>(QouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

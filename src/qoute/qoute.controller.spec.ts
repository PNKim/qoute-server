import { Test, TestingModule } from '@nestjs/testing';
import { QouteController } from './qoute.controller';

describe('QouteController', () => {
  let controller: QouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QouteController],
    }).compile();

    controller = module.get<QouteController>(QouteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

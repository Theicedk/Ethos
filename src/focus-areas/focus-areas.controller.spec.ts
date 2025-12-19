import { Test, TestingModule } from '@nestjs/testing';
import { FocusAreasController } from './focus-areas.controller';

describe('FocusAreasController', () => {
  let controller: FocusAreasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FocusAreasController],
    }).compile();

    controller = module.get<FocusAreasController>(FocusAreasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { FocusAreasService } from './focus-areas.service';

describe('FocusAreasService', () => {
  let service: FocusAreasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FocusAreasService],
    }).compile();

    service = module.get<FocusAreasService>(FocusAreasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

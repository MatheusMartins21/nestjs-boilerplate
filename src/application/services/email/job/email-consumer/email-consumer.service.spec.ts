import { Test, TestingModule } from '@nestjs/testing';
import { EmailConsumerService } from './email-consumer.service';

describe('EmailConsumerService', () => {
  let service: EmailConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailConsumerService],
    }).compile();

    service = module.get<EmailConsumerService>(EmailConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

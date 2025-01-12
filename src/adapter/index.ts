import { buildExampleGateway, ExampleGateway } from './gateway/example';
import { buildUserRepository, UserRepository } from './repository/user';
import { AdapterParams } from './types';
import {buildFeedbackRepository, FeedbackRepository} from '@/adapter/repository/feedback';

export type Adapter = {
  userRepository: UserRepository;
  exampleGateway: ExampleGateway;
  feedBackRepository: FeedbackRepository
}

export const buildAdapter = (params: AdapterParams): Adapter => {
  const userRepository = buildUserRepository(params);
  const exampleGateway = buildExampleGateway(params);
  const feedBackRepository = buildFeedbackRepository(params);

  return {
    feedBackRepository,
    userRepository,
    exampleGateway
  }
}

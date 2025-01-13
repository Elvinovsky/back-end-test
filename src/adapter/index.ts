import { buildExampleGateway, ExampleGateway } from './gateway/example';
import { buildUserRepository, UserRepository } from './repository/user';
import { AdapterParams } from './types';
import {buildFeedbackRepository, FeedbackRepository} from '@/adapter/repository/feedback';
import {buildUpvoteRepository, UpvoteRepository} from '@/adapter/repository/upvote';
import {buildCategoryRepository, CategoryRepository} from '@/adapter/repository/feedback/category/list';
import {buildStatusRepository, StatusRepository} from '@/adapter/repository/feedback/status/list';

export type Adapter = {
  userRepository: UserRepository;
  exampleGateway: ExampleGateway;
  feedBackRepository: FeedbackRepository
  upvoteRepository: UpvoteRepository
  categoryRepository: CategoryRepository;
  statusRepository: StatusRepository;
}

export const buildAdapter = (params: AdapterParams): Adapter => {
  const userRepository = buildUserRepository(params);
  const exampleGateway = buildExampleGateway(params);
  const feedBackRepository = buildFeedbackRepository(params);
  const upvoteRepository = buildUpvoteRepository(params);
  const categoryRepository = buildCategoryRepository(params);
  const statusRepository = buildStatusRepository(params);
  return {
    statusRepository,
    categoryRepository,
    feedBackRepository,
    upvoteRepository,
    userRepository,
    exampleGateway
  }
}

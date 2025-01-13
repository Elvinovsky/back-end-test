import { AuthUseCase, buildAuthUseCase } from './auth';
import { buildExampleUseCase, ExampleUseCase } from './example'
import { UseCaseParams } from './types';
import {buildAFeedBackUseCase, FeedBackUseCase} from '@/domain/usecase/feedback';
import {buildUpvoteUseCase, UpvoteUseCase} from '@/domain/usecase/upvote';

export type UseCase = {
  auth: AuthUseCase;
  feedbacks: FeedBackUseCase;
  upvote: UpvoteUseCase;
  example: ExampleUseCase;
}

export const buildUseCase = (params: UseCaseParams): UseCase => {
  const auth = buildAuthUseCase(params);
  const feedbacks = buildAFeedBackUseCase(params);
  const upvote = buildUpvoteUseCase(params);
  const example = buildExampleUseCase(params);

  return {
    auth,
    feedbacks,
    upvote,
    example
  }
}

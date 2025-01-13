import {UseCaseParams} from '@/domain/usecase/types';
import {IStatus} from '@/domain/entity/status';
import {ICategory} from '@/domain/entity/category';

export type ListStatusesCategories = () =>
    Promise<{statuses: IStatus[], categories: ICategory[]}>

export const buildListStatusesCategories = ({adapter}: UseCaseParams): ListStatusesCategories=>{
  return async ()=>{
    const statuses = await adapter.statusRepository.list({
      select: {
        id: true,
        name: true,
      }
    })

    const categories = await adapter.categoryRepository.list({
      select: {
        id: true,
        name: true,
      }
    })

    return {statuses, categories};
  }
}

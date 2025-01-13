import {AdapterParams} from '@/adapter/types';
import {Prisma} from '@prisma/client'
import {ICategory} from '@/domain/entity/category';

type Params = Pick<AdapterParams, 'db'>

type List = (params:Prisma.CategoryFindManyArgs)=>Promise<Array<ICategory> | never>
const buildList = ({db}: Params): List=>{
  return async (getParams )=>{
    return await db.client.category.findMany(getParams) as Array<ICategory>
  }
}

export type CategoryRepository = {
  list: List,
}
export const buildCategoryRepository = (params: Params): CategoryRepository=>{
  const list = buildList(params)

  return {
    list,
  }
}


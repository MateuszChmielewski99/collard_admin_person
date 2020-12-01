import { CollectionAggregationOptions, FilterQuery} from 'mongodb';

export interface IBaseRepository<T> {
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  getOne(id: string): Promise<T | undefined>;
  deleteOne(id: string): Promise<void>;
  getByQuery(query: FilterQuery<T>): Promise<T[] | undefined>;
  insertMany(data: T[]): Promise<void>;
  agregate(
    pipeline?: object[] | undefined,
    options?: CollectionAggregationOptions | undefined
  ): Promise<T[] | undefined>;
}

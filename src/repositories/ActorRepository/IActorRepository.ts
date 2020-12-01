import { Person } from 'collard_admin_models';
import { IBaseRepository } from '../BaseRepository/IBaseRepository';

export interface IActorRepository extends IBaseRepository<Person> {
  search(query: string): Promise<Person[] | undefined>;
}

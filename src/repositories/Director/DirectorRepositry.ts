import { Person } from 'collard_admin_models';
import { injectable } from 'tsyringe';
import { BaseRepository } from '../BaseRepository/BaseRepository';
import { IDirectorRepository } from './IDirectorRepository';

@injectable()
export class DirectorRepositry extends BaseRepository<Person>
  implements IDirectorRepository {
  private type: string = 'Director';
  constructor() {
    super('persons');
  }

  public async search(queryString: string): Promise<Person[] | undefined> {
    const pipeline = [
      {
        $search: {
          compound: {
            should: [
              {
                autocomplete: {
                  path: 'Name',
                  query: queryString,
                },
              },
              {
                autocomplete: {
                  path: 'LastName',
                  query: queryString,
                },
              },
            ],
          },
        },
      },
      {
        $match: { type: this.type },
      },
      {
        $sort: {
          Name: -1,
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: 1,
          Name: 2,
          LastName: 3,
        },
      },
    ];

    return this.agregate(pipeline);
  }
}

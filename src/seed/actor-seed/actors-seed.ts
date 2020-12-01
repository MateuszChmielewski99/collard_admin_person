import { Person } from 'collard_admin_models';
import { BaseRepository } from '../../repositories/BaseRepository/BaseRepository';
import { readFromFile } from '../read-from-file';

type Director = Omit<Person, '_id'> & {
  type: string;
  _id?: string;
};

const repo = new BaseRepository<Director>('persons');

const mapToEntity = (source: string) => {
  const splitedName = source.split(' ');
  const name = splitedName[0];
  const lastName = splitedName.slice(1).join(' ');

  return {
    LastName: lastName,
    Name: name,
    _ts: Date.now(),
    type: 'Actor',
  };
};

const seedActors = async () => {
  readFromFile<string[]>(
    'src/seed/actor-seed/actors.json',
    async (data: string[]) => {
      const mapped = data.map(mapToEntity);
      repo.insertMany(mapped);
    }
  );
};

(async () => await seedActors())();

import { inject, injectable } from 'tsyringe';
import { createEntityReference } from '../factories/EntityReference.factory';
import { IDirectorRepository } from '../repositories/Director/IDirectorRepository';

@injectable()
export class DirectorService {
  constructor(
    @inject('IDirectorRepository')
    private directorRepository: IDirectorRepository
  ) {}

  public async search(query: string) {
    const result = await this.directorRepository.search(query);

    return result ? result.map(createEntityReference) : undefined;
  }
}

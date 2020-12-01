import { inject, injectable } from 'tsyringe';
import { createEntityReference } from '../factories/EntityReference.factory';
import { IActorRepository } from '../repositories/ActorRepository/IActorRepository';

@injectable()
export class ActorService {
  constructor(
    @inject('IActorRepository')
    private actorRepository: IActorRepository
  ) {}

  public async search(query: string) {
    const result = await this.actorRepository.search(query);

    return result ? result.map(createEntityReference) : undefined;
  }
}

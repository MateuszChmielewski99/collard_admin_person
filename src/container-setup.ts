import { container } from 'tsyringe';
import { ActorRepositry } from './repositories/ActorRepository/ActorRepository';
import { DirectorRepositry } from './repositories/Director/DirectorRepositry';

export const bootstrap = () => {
  container.register('IDirectorRepository', {
    useClass: DirectorRepositry,
  });
  container.register('IActorRepository', {
    useClass: ActorRepositry,
  });
};

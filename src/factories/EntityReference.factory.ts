import { EntityReference, Person } from 'collard_admin_models';

export const createEntityReference = (data: Person): EntityReference => {
  return {
    Id: data._id,
    Name: `${data.Name} ${data.LastName}`,
  };
};

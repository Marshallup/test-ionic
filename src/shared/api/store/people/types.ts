export interface People {
  id: string;
  name: string;
  createdAt: string;
}

export type PeopleCreate = Pick<People, "name">;

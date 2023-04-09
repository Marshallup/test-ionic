import { store } from "@/shared/api";
import { People, PeopleCreate } from "./types";
import { v4 as uuidv4 } from "uuid";

export const PEOPLE_STORAGE_KEY = "people";

export const getAllPeopleStore = async () =>
  (store.get(PEOPLE_STORAGE_KEY) as Promise<People[]>).then(
    (data) => data || []
  );

export const setPeoplesStore = async (peoples: People[]) =>
  store.set(PEOPLE_STORAGE_KEY, peoples) as Promise<People[]>;

export const addPeopleStore = async (people: PeopleCreate) => {
  const peoples = await getAllPeopleStore();

  const newPeople: People = {
    id: uuidv4(),
    name: people.name,
    createdAt: new Date().toString(),
  };

  const newPeoples = await setPeoplesStore([...peoples, newPeople]);

  return {
    people: newPeople,
    peoples: newPeoples,
  };
};

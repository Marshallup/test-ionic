import { People } from "../api/store/people";

export function getPeopleName(peopleId: string, peoples: People[]) {
  return peoples.find((people) => people.id === peopleId);
}

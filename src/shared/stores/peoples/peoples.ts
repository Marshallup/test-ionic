import { ref, unref } from "vue";
import { People, PeopleCreate } from "@/shared/api/store/people";
import { defineStore } from "pinia";
import { peopleModel } from "@/shared/api/store/people";

export const PEOPLES_STORE_KEY = "peoples";

export const usePeoplesStore = defineStore(PEOPLES_STORE_KEY, () => {
  const peoples = ref<People[]>([]);
  const peoplesLoad = ref(false);

  async function getPeoplesAsync(forceLoad = false) {
    if (!unref(peoplesLoad) || forceLoad) {
      peoplesLoad.value = true;
      peoples.value = await peopleModel.getAllPeopleStore();
    }
  }

  async function addPeopleStoreAsync(people: PeopleCreate) {
    const data = await peopleModel.addPeopleStore(people);

    peoples.value = data.peoples;

    return data.people;
  }

  return {
    peoples,
    getPeoplesAsync,
    addPeopleStoreAsync,
  };
});

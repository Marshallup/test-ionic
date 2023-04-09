<template>
  <div class="select-people">
    <IonItem
      ref="ionItemRef"
      button
      :default="false"
      lines="none"
      id="select-people"
      class="select-people__item"
      @click="showModal = true"
    >
      <IonLabel v-if="label" position="stacked">{{ label }}</IonLabel>
      <div class="select-people__person">{{ people?.name || "" }}</div>

      <IonNote slot="error" class="select-people__error">
        <Transition mode="out-in">
          <span v-if="error">{{ error }}</span>
        </Transition>
      </IonNote>
    </IonItem>

    <IonModal ref="modalRef" :is-open="showModal" class="select-people__modal">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton @click="closeModal">Закрыть</IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton :strong="true" @click="onConfirm">Подтвердить</IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <FormItem class="select-people__search-item">
            <IonSearchbar
              v-model="searchStr"
              :name="name"
              animated
              placeholder="Введите имя"
            />
          </FormItem>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonList>
          <IonItem
            v-if="!peoplesIncluded.length"
            lines="none"
            class="select-people__not-found"
          >
            <div class="select-people__not-found-body">Людей не найдено</div>
          </IonItem>
          <template v-else>
            <IonItem
              v-for="people in peoplesIncluded"
              :key="people.id"
              button
              lines="none"
              @click="peopleChoise = people"
            >
              <IonAvatar slot="start">
                <IonIcon :icon="personCircle" class="select-people__icon" />
                <!-- <IonImg src="https://i.pravatar.cc/300?u=b" /> -->
              </IonAvatar>
              <IonLabel>
                <h2>{{ people.name }}</h2>
                <!-- <p>Sales Rep</p> -->
              </IonLabel>
            </IonItem>
          </template>
          <IonItem lines="none" v-if="needCreatePeople">
            <IonButton
              size="default"
              expand="block"
              class="select-people__create-btn"
              :disabled="peopleCreateLoading"
              @click="onCreatePeople"
            >
              Создать
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  </div>
</template>

<script setup lang="ts">
import { unref, ref, toRefs, watch, onMounted, computed } from "vue";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  // IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonSearchbar,
  IonToolbar,
} from "@ionic/vue";
import { useField } from "vee-validate";
import { personCircle } from "ionicons/icons";
import { FormItem } from "@/shared/ui/formItem";
import { usePeoplesStore } from "@/shared/stores/peoples";
import { storeToRefs } from "pinia";
import { People, PeopleCreate } from "@/shared/api/store/people";

interface SelectPeopleProps {
  modelValue: People | PeopleCreate | null;
  name: string;
  label?: string;
  error?: string;
}
interface SelectPeopleEmits {
  (e: "update:modelValue", val: SelectPeopleProps["modelValue"]): void;
}

const props = defineProps<SelectPeopleProps>();
const emit = defineEmits<SelectPeopleEmits>();

const { error, name } = toRefs(props);

const modalRef = ref<InstanceType<typeof IonModal> | null>(null);

const ionItemRef = ref<InstanceType<typeof IonItem> | null>(null);

const peopleStore = usePeoplesStore();

const { peoples } = storeToRefs(peopleStore);

const { value: inputValue } = useField<SelectPeopleProps["modelValue"]>(
  name,
  undefined,
  {
    initialValue: props.modelValue,
  }
);

const searchStr = ref("");

const showModal = ref(false);

const peopleCreateLoading = ref(false);

const peopleChoise = ref<SelectPeopleProps["modelValue"]>(null);

const peoplesIncluded = computed(() =>
  unref(peoples).filter(
    (peopleItem) =>
      peopleItem.name
        .toLocaleLowerCase()
        .indexOf(unref(searchStr).toLocaleLowerCase()) > -1
  )
);

const people = computed({
  get: () => unref(inputValue),
  set: (val) => emit("update:modelValue", val),
});

const needCreatePeople = computed(
  () =>
    unref(searchStr) &&
    !unref(peoples).some(
      (item) =>
        item.name.toLocaleLowerCase() === unref(searchStr).toLocaleLowerCase()
    )
);

function setPeople(peopleSet: SelectPeopleProps["modelValue"]) {
  people.value = peopleSet;
}

function initShowError() {
  const errorVal = unref(error);
  const ionItemRefVal = unref(ionItemRef);

  if (ionItemRefVal) {
    if (errorVal) {
      ionItemRefVal.$el.classList.add("ion-invalid");
    } else {
      ionItemRefVal.$el.classList.remove("ion-invalid");
    }
  }
}

function closeModal() {
  showModal.value = false;

  if (!unref(people)) {
    searchStr.value = "";
  }
}

async function onCreatePeople() {
  peopleCreateLoading.value = true;

  const newPeople = await peopleStore.addPeopleStoreAsync({
    name: unref(searchStr),
  });

  setPeople(newPeople);

  peopleCreateLoading.value = false;
}

function onConfirm() {
  setPeople(unref(peopleChoise));
  closeModal();
}

function clearSearchStr() {
  searchStr.value = "";
}

watch([error], () => {
  initShowError();
});

watch(peopleChoise, (peopleVal) => {
  if (peopleVal) {
    searchStr.value = peopleVal.name;
  }
});

watch(people, (peopleVal) => {
  peopleChoise.value = peopleVal;
});

watch(searchStr, (searchVal) => {
  if (!searchVal) {
    peopleChoise.value = null;
  }
});

onMounted(() => {
  initShowError();
  peopleStore.getPeoplesAsync();
});

defineExpose({
  clearSearchStr,
});
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(-50%);
}
.select-people {
  &__item {
    &::part(detail-icon) {
      margin-top: 5px;
    }
  }
  &__search-item {
    &.ios {
      &::part(native) {
        padding-top: 16px;
      }
    }
  }
  &__person {
    padding: var(--ion-space-2) 0;
  }
  &__icon {
    width: 100%;
    height: 100%;
  }
  &__not-found {
    text-align: center;
  }
  &__not-found-body {
    width: 100%;
  }
  &__error {
    display: block;
    height: 19.5px;

    span {
      display: block;
    }
  }
  &__create-btn {
    width: 100%;
  }
}
</style>

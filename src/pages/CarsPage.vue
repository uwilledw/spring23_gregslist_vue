<template>
  <div class="container-fluid">
    <div v-if="account.id" class="row my-3">
      <div class="col-12  g-5">
        <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-outline-danger fs-1">Add Car
          🏎️</button>
      </div>
    </div>
    <div class="row mt-3">
      <div v-for="carFromVFor in cars" :key="carFromVFor.id" class="col-12 col-md-4 mb-3">
        <CarCard :car="carFromVFor" />
      </div>
    </div>
  </div>
  <ModalComponent>
    <!-- NOTE slots this CarForm inside the ModalComponent where I have my <slot> tag -->
    <CarForm />
  </ModalComponent>
</template>


<script>
import { onMounted, computed } from 'vue';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { carsService } from '../services/CarsService.js'
import CarCard from '../components/CarCard.vue';
import ModalComponent from '../components/ModalComponent.vue';
import CarForm from '../components/CarForm.vue';

export default {
  setup() {
    async function getCars() {
      try {
        await carsService.getCars();
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getCars();
    });
    return {
      cars: computed(() => AppState.cars),
      account: computed(() => AppState.account)
    };
  },
  components: { CarCard, ModalComponent, CarForm }
}
</script>


<style lang="scss" scoped></style>
<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div v-if="car" class="col-10 m-auto">
        <!-- NOTE reuseable components! -->
        <CarCard :car="car" />
      </div>
    </div>
  </div>
  <ModalComponent v-if="car">
    <CarForm :car="car" />
  </ModalComponent>
</template>


<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import CarCard from '../components/CarCard.vue';
import CarForm from '../components/CarForm.vue';
import ModalComponent from '../components/ModalComponent.vue';
import { carsService } from '../services/CarsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
export default {
  setup() {
    // NOTE gain access to the route so we can grab our stored car id from there
    const route = useRoute();
    async function getCarById() {
      try {
        await carsService.getCarById(route.params.carId);
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getCarById();
    });
    return {
      car: computed(() => AppState.car)
    };
  },
  components: { CarCard, ModalComponent, CarForm }
}
</script>


<style lang="scss" scoped></style>
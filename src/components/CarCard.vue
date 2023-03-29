<template>
  <router-link :to="{ name: 'CarDetails', params: { carId: car.id } }">
    <div class="elevation-3 rounded bg-light border border-1 border-dark">
      <img :src="car.imgUrl" :alt="car.make" class="img-fluid rounded-top">
      <div class="text-center p-3">
        <h1 class="fs-2">{{ car.make + ' ' + '|' + ' ' + car.model }}</h1>
      </div>
      <!-- NOTE only show these details if you're on the CarDetails Page -->
      <div v-if="route.name == 'CarDetails'" class="p-4">
        <div class="d-flex justify-content-around">
          <h2>{{ car.year }}</h2>
          <h2>{{ car.price }}</h2>
        </div>
        <p class="fw-bold fs-3">{{ car.description }}</p>
        <div v-if="car.creatorId == account.id" class="d-flex justify-content-around">
          <button class="btn btn-danger" @click.stop="deleteCar()">Delete Car!</button>
          <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-info">🖊️ Edit Car</button>
        </div>
      </div>
    </div>
  </router-link>
</template>


<script>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
import { Car } from '../models/Car.js';
import { carsService } from '../services/CarsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  props: {
    car: {
      type: Car,
      required: true
    }
  },
  // NOTE if we want to use the data stored withing props in our setup, we have to pass it down as an argument
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    return {
      route,
      account: computed(() => AppState.account),
      async deleteCar() {
        try {
          if (await Pop.confirm()) {
            const carId = props.car.id;
            await carsService.deleteCar(carId);
            router.push({ name: "Cars" });
          }
        }
        catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      }
    };
  },
}
</script>


<style lang="scss" scoped>
img {
  width: 100%;
  height: 40vh;
  object-fit: cover;
  object-position: center;
}
</style>
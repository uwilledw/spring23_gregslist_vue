<template>
  <div class="container-fluid">
    <section class="row my-3">
      <div class="col-12">
        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Add House</button>
      </div>
    </section>
    <section class="row mt-3">
      <div v-for="houseFromVFor in houses" class="col-12 col-md-4 mb-3">
        <HouseCard :house="houseFromVFor" />
      </div>
    </section>
  </div>
  <ModalComponent>
    <HouseForm />
  </ModalComponent>
</template>


<script>
import { logger } from '../utils/Logger.js';
import { housesService } from '../services/HousesService.js';
import { onMounted, computed } from 'vue';
import { AppState } from '../AppState.js';
import HouseCard from '../components/HouseCard.vue';
import ModalComponent from '../components/ModalComponent.vue';
import HouseForm from "../components/HouseForm.vue"


export default {

  setup() {
    async function getHouses() {
      try {
        await housesService.getHouses()
      } catch (error) {
        logger.error(error.message)
      }
    }



    onMounted(() => {
      getHouses();
    })

    return {
      houses: computed(() => AppState.houses)

    }
  },
  components: { HouseCard, ModalComponent, HouseForm }
}
</script>


<style lang="scss" scoped></style>
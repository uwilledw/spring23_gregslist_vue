<template>
    <div class="container-fluid">
        <section class="row mt-3 justify-content-center">
            <div v-if="house" class="col-6">
                <HouseCard :house="house" />
            </div>
        </section>
    </div>
    <ModalComponent v-if="house">
        <HouseForm :house="house" />
    </ModalComponent>
</template>


<script>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import HouseCard from '../components/HouseCard.vue';
import { housesService } from '../services/HousesService.js';
import { logger } from '../utils/Logger.js';
import { AppState } from '../AppState.js';
import ModalComponent from '../components/ModalComponent.vue';
import HouseForm from '../components/HouseForm.vue';


export default {
    setup() {
        const route = useRoute();
        async function getHouseById() {
            try {
                await housesService.getHouseById(route.params.houseId)
            } catch (error) {
                logger.error(error.message)
            }
        }
        onMounted(() => getHouseById())

        return {
            house: computed(() => AppState.house)
        };
    },
    components: { HouseCard, ModalComponent, HouseForm }
}
</script>


<style lang="scss" scoped></style>
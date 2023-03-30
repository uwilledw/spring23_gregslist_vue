<template>
    <router-link :to="{ name: 'HouseDetails', params: { houseId: house.id } }">
        <div class="elevation-3 rounded bg-light border border-1 border-dark">
            <img :src="house.imgUrl" alt="Picture of house" class="img-fluid rounded-top">
            <div class="text-center p-3 d-flex justify-content-between">
                <h1 class="fs-2">{{ house.year }}</h1>
                <h2>${{ house.price }}</h2>
            </div>
            <div v-if="route.name == 'HouseDetails'" class="p-2">
                <div>
                    <h4>Bedrooms: {{ house.bedrooms }}</h4>
                    <h4>Bathrooms: {{ house.bathrooms }}</h4>
                    <h4>Levels: {{ house.levels }}</h4>
                    <p>{{ house.description }}</p>
                </div>
                <div v-if="house.seller.id == account.id" class="d-flex justify-content-around">
                    <button class="btn btn-danger" @click="deleteHouse()">Delete
                        House!</button>
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-info">🖊️ Edit
                        House</button>
                </div>
            </div>
        </div>
    </router-link>
</template>


<script>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState.js';
import { Account } from '../models/Account.js';
import { House } from '../models/House.js';
import { housesService } from '../services/HousesService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';


export default {
    props: {
        house: {
            type: House,
            required: true
        }
    },

    setup(props) {
        const route = useRoute()
        const router = useRouter()


        return {
            route,
            account: computed(() => AppState.account),

            async deleteHouse() {
                try {
                    if (await Pop.confirm()) {
                        const houseId = await props.house.id;
                        await housesService.deleteHouse(houseId)
                        router.push({ name: "Houses" })
                    }
                } catch (error) {
                    logger.error(error.message)
                }
            }

        }
    }
}
</script>


<style lang="scss" scoped>
img {
    height: 40vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}
</style>
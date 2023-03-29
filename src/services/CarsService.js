import { AppState } from "../AppState.js"
import { Car } from "../models/Car.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CarsService {
  async getCars() {
    const res = await api.get('auth/api/cars')
    logger.log('getting cars', res.data)
    AppState.cars = res.data.map(c => new Car(c))
  }

  async getCarById(carId) {
    AppState.car = null
    const res = await api.get('auth/api/cars/' + carId)
    logger.log('getting car', res.data)
    AppState.car = new Car(res.data)
  }

  async createCar(carData) {
    const res = await api.post('auth/api/cars', carData)
    logger.log('create car', res.data)
    const newCar = new Car(res.data)
    AppState.cars.push(newCar)
    return newCar
  }

  async deleteCar(carId) {
    const res = await api.delete('auth/api/cars/' + carId)
    logger.log('delete car', res.data)
  }

  async editCar(carData) {
    const res = await api.put('auth/api/cars/' + carData.id, carData)
    logger.log('edit car', res.data)
    AppState.car = new Car(res.data)
  }
}

export const carsService = new CarsService()
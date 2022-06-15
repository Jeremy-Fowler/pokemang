import { AppState } from "../AppState"
import { Pokemang } from "../models/Pokemang"
import { logger } from "../utils/Logger"
import { api, pokeApi } from "./AxiosService"

class PokemansService {
  async getPokemans() {
    const res = await pokeApi.get()
    logger.log(res.data)
    AppState.pokemans = res.data.results
    AppState.nextPage = res.data.next
    AppState.previousPage = res.data.previous
  }

  async changePage(url) {
    const res = await api.get(url)
    logger.log(res.data)
    AppState.pokemans = res.data.results
    AppState.nextPage = res.data.next
    AppState.previousPage = res.data.previous
  }
  async setActivePokeman(url) {
    const res = await api.get(url)
    logger.log(res.data)
    AppState.activePokemang = new Pokemang(res.data)
  }
}

export const pokemansService = new PokemansService()
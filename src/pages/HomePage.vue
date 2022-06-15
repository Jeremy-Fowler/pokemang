<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-8">
        <div v-if="activePokemang" class="row">
          <div class="col-12">
            {{ activePokemang.name }}
          </div>
          <div class="col-12">
            <img :src="activePokemang.img" alt="" class="img-fluid" />
          </div>
          <div class="col-12">
            <div>Weight: {{ activePokemang.weight }}</div>
            <div>Height: {{ activePokemang.height }}</div>
            <div>
              Types:
              <span
                class="me-3"
                v-for="t in activePokemang.types"
                :key="t.slot"
                >{{ t.type.name }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 mt-3">
        <ul>
          <li
            @click="setActivePokeman(p.url)"
            class="mb-1 selectable"
            v-for="p in pokemans"
            :key="p.name"
          >
            {{ p.name }}
          </li>
        </ul>
        <div class="d-flex justify-content-between">
          <button
            :class="`btn btn-${previousPage ? 'danger' : 'info'}`"
            @click="changePage(previousPage)"
            :disabled="!previousPage"
          >
            Previous</button
          ><button
            :disabled="!nextPage"
            class="btn btn-danger"
            @click="changePage(nextPage)"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { pokemansService } from '../services/PokemansService'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        await pokemansService.getPokemans()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      pokemans: computed(() => AppState.pokemans),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),
      activePokemang: computed(() => AppState.activePokemang),
      async changePage(url) {
        try {
          await pokemansService.changePage(url)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async setActivePokeman(url) {
        try {
          await pokemansService.setActivePokeman(url)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../Icon/Icon.vue'
import type { AlertProps, AlertEmits, AlertInstance } from './types'

defineOptions({
  name: 'DsAlert'
})

withDefaults(defineProps<AlertProps>(), {
  type: 'primary',
  effect: 'light',
  closable: true
})

const emit = defineEmits<AlertEmits>()

const isShow = ref<boolean>(true)

function alertHide() {
  isShow.value = false
  emit('close')
  console.log('alert hide')
}

defineExpose<AlertInstance>({
  hide: () => alertHide()
})

</script>

<template>
  <Transition name="fade">
    <div class="ds-alert" :class="{ [`ds-alert--${type}-${effect}`]: type, center }" v-if="isShow">

      <Icon v-if="icon" :icon="icon" class="ds-alert__icon" />
      <div class="ds-alert__content" v-if="content" >
        {{ content }}
        <span>
          <slot />
        </span>
      </div>
      <div class="ds-alert__close" @click="isShow = false" v-if="closable">
        <Icon icon="xmark" v-if="!closeText"/>
        <span v-else>{{ closeText }}</span>
      </div>
    </div>
  </Transition>
</template>


<style scoped>
@import './style.css';
</style>


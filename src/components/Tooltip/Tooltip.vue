<script setup lang="ts">
import { ref,watch } from 'vue';
import type { TooltipProps, TooltipEmits } from './types';
import { createPopper, type Instance } from '@popperjs/core';

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom'
})

const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false)

const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()

let popperInstance: Instance

const togglePopper = ()=>{
  isOpen.value = !isOpen.value
  emits('visible-change',isOpen.value)
}

watch(isOpen, (newValue) => {
  if(newValue) {
    if (triggerNode.value && popperNode.value) {
      console.log('newValue',newValue)
      popperInstance = createPopper(triggerNode.value, popperNode.value, {
        placement: props.placement
      })
    } else {
      popperInstance?.destroy()
    }
  }
}, {
  flush: 'post'
})
</script>

<template>
  <div class="ds-tooltip" style="margin-bottom: 100px;">
    <div class="ds-tooltip_trigger" ref="triggerNode" @click="togglePopper">
      <slot />
    </div>

    <div v-if="isOpen" class="ds-tooltip_popper" ref="popperNode">
      <slot name="content">
        {{ content }}
      </slot>
    </div>
  </div>
</template>

<style scpoed>
.ds-tooltip_trigger {
  display: inline-block;
}
</style>

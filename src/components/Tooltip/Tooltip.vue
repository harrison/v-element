<script setup lang="ts">
import { onMounted, reactive, ref,watch } from 'vue';
import type { TooltipProps, TooltipEmits } from './types';
import { createPopper, type Instance } from '@popperjs/core';

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'click'
})

const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false)

const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
const events: Record<string, any> = reactive({})
const outEvent: Record<string, any> = reactive({})

let popperInstance: Instance

onMounted(() => {
  attachEvent()
})

const open = () => {
  isOpen.value = true
  emits('visible-change',isOpen.value)
}

const close = () => {
  isOpen.value = false
  emits('visible-change',isOpen.value)
}

const attachEvent = () => {
  if(props.trigger == 'click') {
    events['click'] = togglePopper
  } else if (props.trigger == 'hover') {
    events['mouseenter'] = open
    outEvent['mouseleave'] = close
  }
}

const togglePopper = ()=>{
  isOpen.value = !isOpen.value
  emits('visible-change',isOpen.value)
}

watch(() => props.trigger, (newValue, oldValue) => {
  if(newValue != oldValue) {
    events.value = {}
    outEvent.value = {}
    attachEvent()
  }
})

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
  <div class="ds-tooltip" style="margin-bottom: 100px;" v-on="outEvent">
    <div class="ds-tooltip_trigger" ref="triggerNode" v-on="events">
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
  border: 0.01rem solid #f00;
}

.ds-tooltip_popper {
  border: 0.01rem solid #ff0;
}
</style>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref,watch } from 'vue';
import type { TooltipProps, TooltipEmits } from './types';
import { createPopper, type Instance } from '@popperjs/core';
import { debounce } from 'lodash-es'

import type { TooltipInstance } from './types';

// 引入全局点击钩子函数
import useClickOutside from '@/hooks/useClickOutside';

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'click',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0
})

const emits = defineEmits<TooltipEmits>()
// 是否展示tooltip
const isOpen = ref(false)
// 事件触发节点
const triggerNode = ref<HTMLElement>()
// 弹出节点
const popperNode = ref<HTMLElement>()
// popper包裹节点
const popperContainerNode = ref<HTMLElement>()
const events: Record<string, any> = reactive({})
const outEvent: Record<string, any> = reactive({})

// 打开关闭次数
let openTimes = 0, closeTimes = 0

const popper_options = computed(() => {
  return {
    placement: props.placement,
    ...props.popperOptions
  }
})

let popperInstance: Instance

onMounted(() => {
  // 如果启用手动模式则不绑定事件
  if(!props.manual) {
    attachEvent()
  }
})

useClickOutside(popperContainerNode, () => {
  if(props.trigger === 'click' && isOpen.value && !props.manual) {
    closeDebounce()
  }
})

const open = () => {
  console.log('打开次数：', ++openTimes)
  isOpen.value = true
  emits('visible-change',isOpen.value)
}

const close = () => {
  console.log('关闭次数：', ++closeTimes)
  isOpen.value = false
  emits('visible-change',isOpen.value)
}

const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)

const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}

const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}

const togglePopper = ()=>{
  if(isOpen.value) closeFinal()
  else openFinal()
  emits('visible-change',isOpen.value)
}


const attachEvent = () => {
  if(props.trigger == 'click') {
    events['click'] = togglePopper
  } else if (props.trigger == 'hover') {
    events['mouseenter'] = openFinal
    outEvent['mouseleave'] = closeFinal
  }
}

// 监听是否开启手动模式，如开启则清空事件
// 未开启则绑定事件
watch(() => props.manual, (isManual) => {
  if(isManual) {
    events.value = {}
    outEvent.value = {}
  } else {
    attachEvent()
  }
})

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
      popperInstance = createPopper(triggerNode.value, popperNode.value, popper_options.value)
    } else {
      popperInstance?.destroy()
    }
  }
}, {
  flush: 'post'
})

onUnmounted(() => {
  popperInstance?.destroy()
})

// 导出实例
defineExpose<TooltipInstance>({
  'show': openFinal,
  'hide': closeFinal
})
</script>

<template>
  <div class="ds-tooltip" style="margin-bottom: 100px;" v-on="outEvent" ref="popperContainerNode">
    <div class="ds-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot />
    </div>

    <Transition :name="transition">
      <div v-if="isOpen" class="ds-tooltip__popper" ref="popperNode">
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>


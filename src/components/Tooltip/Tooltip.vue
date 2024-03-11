<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref,watch } from 'vue';
import type { TooltipProps, TooltipEmits } from './types';
import { createPopper, type Instance } from '@popperjs/core';

import { TooltipInstance } from './types';

// 引入全局点击钩子函数
import useClickOutside from '@/hooks/useClickOutside';

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'click'
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

let popperInstance: Instance

onMounted(() => {
  // 如果启用手动模式则不绑定事件
  if(!props.manual) {
    attachEvent()
  }
})

useClickOutside(popperContainerNode, () => {
  if(props.trigger === 'click' && isOpen.value && !props.manual) {
    close()
  }
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

onUnmounted(() => {
  popperInstance?.destroy()
})

// 导出实例
defineExpose<TooltipInstance>({
  'show': open,
  'hide': close
})
</script>

<template>
  <div class="ds-tooltip" style="margin-bottom: 100px;" v-on="outEvent" ref="popperContainerNode">
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
.ds-tooltip {
  display: inline-block;
}
.ds-tooltip_trigger {
  display: inline-block;
  border: 0.01rem solid #f00;
}

.ds-tooltip_popper {
  display: inline-block;
  border: 0.01rem solid #ff0;
}
</style>

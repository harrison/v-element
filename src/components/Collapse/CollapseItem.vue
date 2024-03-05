<template>
  <div class="ds-collapse-item"
    :class="{
      'is-disabled': disabled
    }"
  >
    <div class="ds-collapse-item__header" :id="`item-header-${name}`" :class="{ 'is-active': isActive, 'is-disabled': disabled }" @click="handleClick">
      <slot name="title">{{ title }}</slot>
      <Icon icon="chevron-right" class="header-angle"/>
    </div>
    <Transition name="fade" v-on="TransitionEvent">
      <div class="ds-collapse-item__content__wrapper" v-show="isActive">
        <div class="ds-collapse-item__content" :id="`item-content-${name}`">
          <slot />
        </div>
      </div>
      
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'
import Icon from '../Icon/Icon.vue'
import type { CollapseItemProps } from './types'
import { collapseContextKey } from './types'

defineOptions({
  name: 'DsCollapseItem'
})

const props = defineProps<CollapseItemProps>()

// 注入父组件暴露的上下文
const collapseContext = inject(collapseContextKey)
// 计算内容是否展示
const isActive = computed(() => {
  return collapseContext?.activeNames.value.includes(props.name)
})

const handleClick = () => {
  // 如果是disable状态则不响应点击事件
  if (props.disabled) {
    return false
  }

  // 否则触发item点击
  collapseContext?.handleItemClick(props.name)
}

const TransitionEvent: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
  },

  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },

  afterEnter(el) {
    el.style.height = ''
  },

  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
  },

  leave(el) {
    el.style.height = '0px'
  },

  afterLeave(el) {
    el.style.height = ''
  }
}

</script>

<style scoped>
@import './style.css';
</style>
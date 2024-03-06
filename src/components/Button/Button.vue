<template>
  <button
    class="ds-button"
    :class="{
      [`ds-button--${type}`]: type,
      [`ds-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    ref="_ref"
    :disabled="disabled || loading"
  >
    <Icon icon="spinner" spin disabled v-if="loading" />
    <Icon :icon="icon" v-if="icon" />
    <span><slot/></span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../Icon/Icon.vue'
import type { ButtonProps } from './types.ts'

defineOptions({
  name: 'DsButton'
})

// 通过纯类型参数方式来声明组件所接收的props
defineProps<ButtonProps>()

const _ref = ref<HTMLButtonElement | null>(null)
// 组件向外暴露属性（父组件调用子组件中的方法或属性）
// 导出_ref属性，名称为ref
defineExpose({
  ref: _ref
})
</script>

<style scoped>
@import './style.css';
</style>
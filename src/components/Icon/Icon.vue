<template>
  <i class="ds-icon" :style="colorStyle" :class="{ [`ds-icon--${type}`]: type }" v-bind="$attrs">
    <font-awesome-icon v-bind="filteredProps" />
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { omit } from 'lodash-es'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { IconProps } from './types.ts'

defineOptions({
  name: 'DsIcon',
  inheritAttrs: false
})

const props = defineProps<IconProps>()
const filteredProps = computed(() => omit(props, ['type', 'color']))
const colorStyle = computed(() => {
  return props.color ? { color: props.color } : {}
})

</script>
<style scope>
@import './style.css'
</style>
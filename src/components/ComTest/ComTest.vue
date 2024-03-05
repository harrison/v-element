<template>
  <div>{{ text }}</div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import type { ComTestProps, } from './types';
defineOptions({
  name: 'ComTest'
})
const props = defineProps<ComTestProps>()
// const emits = defineEmits<ComTestEmits>()

let text = ref<number[]>(props.modelValue)

setTimeout(()=>{
  text.value[0] = 5
  // emits('update:modelValue', text.value)
  setTimeout(async () => {
    await nextTick()
    console.log(props.modelValue)
  },10)
  
}, 2000)
</script>
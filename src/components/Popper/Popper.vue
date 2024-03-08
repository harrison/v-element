<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { createPopper, type Instance } from '@popperjs/core'

const overlayNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()

let popperInstance: Instance | null = null

onMounted(()=>{
  if(overlayNode.value && triggerNode.value) {
    console.log('createPopper create')
    popperInstance = createPopper(triggerNode.value, overlayNode.value, { placement: 'right' })
  }

  setTimeout(()=>{
    popperInstance?.setOptions({placement: 'bottom'})
  }, 2000)
})

</script>

<template>
  <div class="popper-wrapper">
    <img alt="Vue logo" ref="triggerNode" class="logo" src="../../assets/logo.svg" width="125" height="125" />
    <span class="trigger" ref="overlayNode">trigger</span>
  </div>
</template>

<style scoped>
.popper-wrapper {
  padding: 100px;
}
.trigger {
  background: #999;
  border: 0.01rem solid #777;
  border-radius: 10px;
  padding: 10px 20px;
}
</style>

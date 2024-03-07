<template>
  <div class="ds-collapse">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
// NameType对应item name类型,字符串或数字
import type { NameType, CollapseProps, CollapseEmits } from './types'
// collapseContextKey是父组件向外暴露属性和方法时provide对应的key
import { collapseContextKey } from './types'

defineOptions({
  name: 'DsCollapse'
})

const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()

// 已经激活的子组件列表,内容为子组件name
const activeNames = ref<NameType[]>(props.modelValue)

if (props.accordion && props.modelValue.length > 1) {
  console.warn('手风琴模式开启下最大默认开启子项不得大于1')
}

// 子组件标题点击事件
const handleItemClick = (name: NameType) => {
  let _activeNames = [ ...activeNames.value ]
  if (props.accordion) {
    _activeNames = [activeNames.value[0] === name ? '' : name]
    activeNames.value = _activeNames
  } else {
    const index = activeNames.value.indexOf(name)
    // 如果name存在于数组中, 则删除, 否则添加
    if (index != -1) {
      _activeNames.splice(index, 1)
    } else {
      _activeNames.push(name)
    }
    activeNames.value = _activeNames
  }

  emits('update:modelValue', _activeNames)
  emits('change', _activeNames)
}

// 向外暴露上下文
provide(collapseContextKey, {
  activeNames,
  handleItemClick
})

</script>

<style scoped>
@import './style.css';
</style>
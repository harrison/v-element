<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import CollapseItem from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import Alert from './components/Alert/Alert.vue'
import Popper from './components/Popper/Popper.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import type { ButtonInterface } from './components/Button/types'
import type { AlertInstance } from './components/Alert/types'

const buttonRef = ref<ButtonInterface | null>(null)

const activeItem = ref(['a'])

const iconSize = ref<any>('3x')

const alert = ref<AlertInstance | null>(null)

setTimeout(() => {
  activeItem.value.push('b')
  iconSize.value = '2xl'
  alert.value?.hide()
}, 2000)

function alertClose() {
  console.log('alert closed')
}

onMounted(() => {
  if (buttonRef.value) {
    console.log(buttonRef.value.ref)
  }
})
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header>
  <hr>
  <h1>Button组件</h1>
  <Button>Default Button</Button>
  <Button plain>Plain Button</Button>
  <Button round>Round Button</Button>
  <Button circle>C</Button>
  <Button disabled>Disabled Button</Button><br/><br/>

  <Button type="primary">Primary</Button>
  <Button type="success">Success</Button>
  <Button type="info">Info</Button>
  <Button type="warning">Warning</Button>
  <Button type="danger">Danger</Button><br/><br/>

  <Button type="primary" plain>Primary</Button>
  <Button type="success" plain>Success</Button>
  <Button type="info" plain>Info</Button>
  <Button type="warning" plain>Warning</Button>
  <Button type="danger" plain>Danger</Button><br/><br/>
  <Button size="large">Large</Button>
  <Button size="small">Small</Button><br/><br/>
  <Button size="large" loading>Loading</Button>
  <Button size="large" icon="arrow-up">Icon</Button>

  <hr>
  <h1>Collapse组件</h1>
  <Collapse v-model="activeItem">

    <CollapseItem name="a" title="我是标题">
      <p>段落</p>
    </CollapseItem>
    
    <CollapseItem name="b">
      <template #title>
        <p>这是具名插槽标题</p>
      </template>
      <p>段落</p>
    </CollapseItem>

    <CollapseItem name="c" disabled>
      <template #title>
        <p>这是具名插槽标题</p>
      </template>
      <p>段落</p>
    </CollapseItem>
    
  </Collapse>

  {{ activeItem }}

  <hr>
  <h1>Icon组件</h1>
  <icon :icon="['fas', 'arrow-up']" :size="iconSize" spin type="success" color="#f00" />

  <hr>
  <h1>Alert组件</h1>
  <Alert content="Primary" type="primary" @close="alertClose" ref="alert"/>
  <Alert content="Success" type="success" icon="circle-check" close-text="close"/>
  <Alert content="Warning" type="warning" icon="circle-exclamation" center/>
  <Alert content="Danger" type="danger" effect="dark" />
  <Alert content="Info" :closable="false" type="info" effect="dark" />

  <hr>
  <h1>Popper组件</h1>
  <Popper></Popper>

  <hr>
  <h1>Tooltip组件</h1>
  <Tooltip content="Hello Tooltip" placement="right">
    <img alt="Vue logo" src="./assets/logo.svg" width="125" height="125" />
    <template #content>
      <h1>content插槽</h1>
    </template>
  </Tooltip>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Icon from '../Icon/Icon.vue'

describe('Button.vue', () => {
  test('basic button', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'button'
      }
    })
    // console.log(wrapper.html())
    // 断言包含class
    expect(wrapper.classes()).toContain('ds-button--primary')
    // 断言节点text等于button
    expect(wrapper.getComponent('.ds-button').text()).toBe('button')

    // event
    wrapper.get('button').trigger('click')

    // console.log(wrapper.emitted())

    // toHaveProperty 断言对象中是否包含某属性
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  test('disabled button', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: 'button'
      }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').element.disabled).toBeDefined()

  })

  test('button icon', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'arrow-up'
      },
      slots: {
        default: 'button'
      },
      global: {
        stubs: ['FontAwesomeIcon']
      }
    })
    // console.log(wrapper.html())
    const fontElement = wrapper.findComponent(FontAwesomeIcon)
    expect(fontElement.exists()).toBeTruthy()
    expect(fontElement.attributes('icon')).toBe('arrow-up')
  })

  test('loading button', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'loading'
      },
      global: {
        stubs: ['Icon']
      }
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    expect(iconElement.attributes('disabled')).toBeDefined()
  })
})
import { vi, describe, test, expect, beforeEach } from 'vitest'
import { DOMWrapper, VueWrapper, mount } from '@vue/test-utils'

import Tooltip from './Tooltip.vue'

const onVisibleChange = vi.fn()

vi.mock('@popperjs/core')

describe('Tooltip 基础测试', () => {
  beforeEach(() => {
    // 在每个测试用例前启用模拟定时器
    vi.useFakeTimers()
  })



  test('结构测试', async () => {
    const wrapper = await mount(() =>
      <div>
        <div class="outside"></div>
        <Tooltip content="Hello Tooltip" trigger="click" onVisible-change={onVisibleChange}>
          <button id='trigger'>Trigger</button>
        </Tooltip>
      </div>
      , {
        attachTo: document.body
      }
    )
    const triggerArea = wrapper.find('#trigger')

    // 触发事件插槽
    expect(triggerArea.exists()).toBeTruthy()

    // 弹出层
    expect(wrapper.find('.ds-tooltip__popper').exists()).toBeFalsy()

    // 点击事件
    triggerArea.trigger('click')
    // 立即完成所有定时器
    await vi.runAllTimers()
    expect(wrapper.find('.ds-tooltip__popper').exists()).toBeTruthy()
    expect(wrapper.find('.ds-tooltip__popper').text()).toBe('Hello Tooltip')

    // 点击外部关闭popper
    wrapper.get('.outside').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.ds-tooltip__popper').exists()).toBeFalsy()

  })

  test('hover测试', async () => {

    const wrapper = await mount(() =>
      <Tooltip content="Hello Tooltip" trigger="hover" onVisible-change={onVisibleChange}>
        <button id='trigger'>Trigger</button>
      </Tooltip>
      , {
        attachTo: document.body
      }
    )

    const triggerArea = wrapper.find('#trigger')

    onVisibleChange.mockClear()

    triggerArea.trigger('mouseenter')
    await vi.runAllTimers()

    console.log(wrapper.html())

    // 测试失败，onVisibleChange没有被调用
    expect(onVisibleChange).toHaveBeenCalled()
    // expect(wrapper.find('.ds-tooltip__popper').exists()).toBeTruthy()
  })



})
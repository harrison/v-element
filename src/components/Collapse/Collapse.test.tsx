import { mount, type DOMWrapper, type VueWrapper } from '@vue/test-utils'
import { beforeAll, describe, expect, test, vi } from 'vitest'

import Collapse from './Collapse.vue'
import Item from './CollapseItem.vue'

const onChange = vi.fn()

let wrapper: VueWrapper
let headers: DOMWrapper<Element>[], contents: DOMWrapper<Element>[]
let firstHeader: DOMWrapper<Element>, secondHeader: DOMWrapper<Element>, thirdHeader: DOMWrapper<Element>
let firstContent: DOMWrapper<Element>, secondContent: DOMWrapper<Element>, thirdContent: DOMWrapper<Element>

describe('Collapse.vue', () => {
  beforeAll(() => {
    wrapper = mount(() => (
      <Collapse modelValue={['a']} onChange={onChange}>
        <Item name="a" title="Title A">
          content a
        </Item>

        <Item name="b" title='Title B'>
          content b
        </Item>

        <Item name="c" disabled title='Title C'>
          content c
        </Item>
      </Collapse>
    ), {
      global: {
        stubs: ['Icon']
      },
      attachTo: document.body
    })

    headers = wrapper.findAll('.ds-collapse-item__header')
    contents = wrapper.findAll('.ds-collapse-item__content__wrapper')

    firstHeader = headers[0]
    secondHeader = headers[1]
    thirdHeader = headers[2]

    firstContent = contents[0]
    secondContent = contents[1]
    thirdContent = contents[2]
  })
  test('基础结构测试', () => {
    // 子组件长度
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    // 子组件标题
    expect(firstHeader.text()).toBe('Title A')

    // 子组件内容
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')
  })

  test('点击标题展开/关闭内容', async () => {
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(secondContent.isVisible()).toBeTruthy()
  })

  test('发送对应事件', () => {
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith([])
    expect(onChange).toHaveBeenCalledWith(['b'])
  })

  test('disabled项', () => {
    onChange.mockClear()
    expect(thirdHeader.classes()).toContain('is-disabled')
    thirdHeader.trigger('click')
    expect(thirdContent.isVisible()).toBeFalsy()
    expect(onChange).not.toHaveBeenCalled()
  })

  test('手风琴功能', () => {
    wrapper = mount(() => (
      <Collapse modelValue={['a']} onChange={onChange} accordion>
        <Item name="a" title="Title A">
          content a
        </Item>

        <Item name="b" title='Title B'>
          content b
        </Item>

        <Item name="c" disabled title='Title C'>
          content c
        </Item>
      </Collapse>
    ), {
      global: {
        stubs: ['Icon']
      },
      attachTo: document.body
    })

    headers = wrapper.findAll('.ds-collapse-item__header')
    contents = wrapper.findAll('.ds-collapse-item__content__wrapper')

    firstHeader = headers[0]
    secondHeader = headers[1]
    thirdHeader = headers[2]

    firstContent = contents[0]
    secondContent = contents[1]
    thirdContent = contents[2]

    secondHeader.trigger('click')
    expect(onChange).toHaveBeenCalledWith(['b'])

    firstHeader.trigger('click')
    expect(onChange).toHaveBeenCalledWith(['a'])
    onChange.mockClear()
    thirdHeader.trigger('click')
    expect(onChange).not.toHaveBeenCalled()
  })
})
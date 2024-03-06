import { expect, describe, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Collapse from './Collapse.vue'
import Item from './CollapseItem.vue'
import { h } from 'vue'

describe('collapse.vue', () => {
  test('basic collapse', () => {
    const wrapper = mount(() => (
      <Collapse modelValue={['a']}>
        <Item name="a" title="Title A">
          content a
        </Item>

        <Item name="b" title='Title B'>
          content b
        </Item>

        <Item name="c" disabled title='Title c '>
          content c
        </Item>
      </Collapse>
    ))

    const headers = wrapper.findAll('.ds-collapse-item__header')
    const contents = wrapper.findAll('.ds-collapse-item__content__wrapper')

    // 数量
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    // 标题
    const firstHeader = headers[0]
    expect(firstHeader.text()).toBe('Title A')

    // 内容
    const firstContent = contents[0]
    expect(firstContent.text()).toBe('content a')
    expect(firstContent.isVisible()).toBeTruthy()
  })
})
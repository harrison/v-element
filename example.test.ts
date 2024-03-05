import { expect, test, describe, vi, Mocked } from 'vitest'

import { testFn, request } from './util'

import axios from 'axios'

const mockedAxios = axios as Mocked<typeof axios>
vi.mock('axios')

/** 基础测试 */
test('test common matcher', () => {
  const name = 'dos'
  expect(name).toBe('dos')
  expect(2 + 2).not.toBe(5)
})

test('test to be true or false', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

test('test number', () => {
  expect(2).toBeGreaterThan(1)
  expect(3).toBeLessThan(4)
})

test('test Object', () => {
  expect({ name: 'vanalso' }).toEqual({ name: 'vanalso' })
})

/** 函数测试 */
describe('functions', () => {
  test('create a mock function', () => {
    const callback = vi.fn()
    testFn(12, callback)
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith(12)
  })

  test('spy on method', () => {
    const obj = {
      getName: () => 1
    }
    const spy = vi.spyOn(obj, 'getName')
    obj.getName()
    expect(spy).toHaveBeenCalled()
    obj.getName()
    expect(spy).toHaveBeenCalledTimes(2)
  })

  test('mock third party module', async () => {
    mockedAxios.get.mockImplementation(() => Promise.resolve({ data: '123' }))
    mockedAxios.get.mockResolvedValue({ data: '123' })
    const result = await request()
    expect(result).toBe('123')
  })
})
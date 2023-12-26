import { deepEqual } from 'node:assert/strict'

async function check (snap) {
  {
    const obj = { foo: 'bar' }
    const _obj = await snap(obj)

    deepEqual(obj, _obj)
  }

  {
    const obj = 'hello world'
    const _obj = await snap(obj)

    deepEqual(obj, _obj)
  }
}

export { check }

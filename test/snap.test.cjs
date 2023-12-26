'use strict'

const { test } = require('node:test')
const { deepEqual } = require('node:assert/strict')
const { rm, mkdtemp } = require('node:fs/promises')
const { glob } = require('glob')
const { dirname, join } = require('node:path')
const Snap = require('../snap.cjs')
const helper = require('./helper.cjs')

test('update and read', async (t) => {
  const { check } = await helper()
  const cwd = await mkdtemp('snap-test-')

  await t.test('update', async () => {
    const snap = await Snap(__filename, { update: true, cwd })
    await check(snap)
  })

  await t.test('read', async () => {
    const snap = await Snap(__filename, { cwd })
    await check(snap)
  })

  await rm(cwd, { recursive: true })
})

test('update and read in top folder', async (t) => {
  const { check } = await helper()
  await t.test('update', async () => {
    const snap = await Snap(__filename, { update: true })
    await check(snap)
  })

  await t.test('read', async () => {
    const snap = await Snap(__filename)
    await check(snap)
  })

  const dir = join(dirname(__filename), '..', '.snapshots')
  const files = await glob(dir + '/**/*', { nodir: true })

  deepEqual(files.length, 2)

  await rm(dir, { recursive: true })
})

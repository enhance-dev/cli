/* eslint no-unused-vars: ["error", { "caughtErrors": "none" }]*/
let test = require('tape')
let { constants: fsConstants, existsSync } = require('fs')
let { access, readFile } = require('fs/promises')
let { join } = require('path')
let cwd = process.cwd()
let lib = join(cwd, 'test', 'lib')
let mock = join(cwd, 'test', 'mock')
let { enhance: _enhance, newTmpFolder, run, start, shutdown } = require(lib)
let filePath = folder => join(folder, 'hi.txt')

test('Run update tests', async t => {
  await run(runTests, t)
  t.end()
})

async function runTests (runType, t) {
  let mode = `[Update / ${runType}]`
  let enhance = _enhance[runType].bind({}, t)

  let upgraded = 'Successfully upgraded Enhance!'
  let x64Release = /file-x64.zip/
  let arm64Release = /file-arm64.zip/
  let upgradeVer = /10000\.0\.0/
  let didNotUpgrade = 'Enhance already running the latest version, nice!'
  let contents = 'henlo!\n'
  let failed = /Failed to check latest version/
  let port

  t.test(`${mode} Start dev server`, async t => {
    port = await start[runType](t, mock)
  })

  if (process.arch === 'x64') {
    t.test(`${mode} Normal (x64)`, async t => {
      t.plan(9)
      let file, folder, path, r

      folder = newTmpFolder(t, 'install')
      path = filePath(folder)
      process.env.enhance_INSTALL = folder
      process.env.__enhance_TEST_URL__ = `http://localhost:${port}/versions-upgrade`
      r = await enhance('update')
      if (!existsSync(path)) t.fail(`Did not find unzipped / installed file at ${path}`)
      file = await readFile(path)
      await isExecutable(t, path)
      t.equal(file.toString(), contents, 'File unzipped into correct location')
      t.equal(r.stdout, upgraded, 'Got upgrade confirmation')
      t.match(r.stderr, x64Release, 'Printed x64 release to stderr')
      t.match(r.stderr, upgradeVer, 'Printed upgrade version to stderr')
      t.ok(r.stderr.includes(path), 'Printed destination filepath to stderr')
      t.equal(r.code, 0, 'Exited 0')

      folder = newTmpFolder(t, 'install')
      path = filePath(folder)
      process.env.enhance_INSTALL = folder
      process.env.__enhance_TEST_URL__ = `http://localhost:${port}/versions-ok`
      r = await enhance('update')
      if (existsSync(path)) t.fail(`Found unzipped / installed file at ${path}`)
      t.equal(r.stdout, didNotUpgrade, `Got confirmation that upgrade wasn't necessary`)
      t.ok(r.stderr, 'Printed update info stderr')
      t.equal(r.code, 0, 'Exited 0')
    })
  }
  // arm64-enabled tests (which effectively means macOS only for now)
  else if (process.arch === 'arm64') {
    t.test(`${mode} Normal (arm64)`, async t => {
      t.plan(9)
      let file, folder, path, r

      folder = newTmpFolder(t, 'install')
      path = filePath(folder)
      process.env.enhance_INSTALL = folder
      process.env.__enhance_TEST_URL__ = `http://localhost:${port}/versions-upgrade`
      r = await enhance('update')
      if (!existsSync(path)) t.fail(`Did not find unzipped / installed file at ${path}`)
      file = await readFile(path)
      await isExecutable(t, path)
      t.equal(file.toString(), contents, 'File unzipped into correct location')
      t.equal(r.stdout, upgraded, 'Got upgrade confirmation')
      t.match(r.stderr, arm64Release, 'Printed arm64 release to stderr')
      t.match(r.stderr, upgradeVer, 'Printed upgrade version to stderr')
      t.ok(r.stderr.includes(path), 'Printed destination filepath to stderr')
      t.equal(r.code, 0, 'Exited 0')

      folder = newTmpFolder(t, 'install')
      path = filePath(folder)
      process.env.enhance_INSTALL = folder
      process.env.__enhance_TEST_URL__ = `http://localhost:${port}/versions-ok`
      r = await enhance('update')
      if (existsSync(path)) t.fail(`Found unzipped / installed file at ${path}`)
      t.equal(r.stdout, didNotUpgrade, `Got confirmation that upgrade wasn't necessary`)
      t.ok(r.stderr, 'Printed update info stderr')
      t.equal(r.code, 0, 'Exited 0')
    })
  }

  t.test(`${mode} Errors`, async t => {
    t.plan(3)
    let folder, path, r

    folder = newTmpFolder(t, 'install')
    path = filePath(folder)
    process.env.enhance_INSTALL = folder
    process.env.__enhance_TEST_URL__ = `http://localhost:${port}/lolidk`
    r = await enhance('update')
    if (existsSync(path)) t.fail(`Found unzipped / installed file at ${path}`)
    t.notOk(r.stdout, 'Did not print to stdout')
    t.ok(r.stderr, 'Printed error to stderr')
    t.equal(r.code, 1, 'Exited 1')
  })

  t.test(`${mode} JSON`, async t => {
    t.plan(10)
    let file, folder, json, path, r

    folder = newTmpFolder(t, 'install')
    path = filePath(folder)
    process.env.enhance_INSTALL = folder
    process.env.__enhance_TEST_URL__ = `http://localhost:${port}/versions-upgrade`
    r = await enhance('update --json')
    if (!existsSync(path)) t.fail(`Did not find unzipped / installed file at ${path}`)
    file = await readFile(path)
    json = JSON.parse(r.stdout)
    await isExecutable(t, path)
    t.equal(file.toString(), contents, 'File unzipped into correct location')
    t.equal(json.ok, true, 'Got ok: true for upgrade confirmation')
    t.ok(json.message, 'Got message for upgrade confirmation')
    t.match(r.stderr, upgradeVer, 'Printed upgrade version to stderr')
    t.ok(r.stderr.includes(path), 'Printed destination filepath to stderr')
    t.equal(r.code, 0, 'Exited 0')

    folder = newTmpFolder(t, 'install')
    path = filePath(folder)
    process.env.enhance_INSTALL = folder
    process.env.__enhance_TEST_URL__ = `http://localhost:${port}/versions-ok`
    r = await enhance('update --json')
    if (existsSync(path)) t.fail(`Found unzipped / installed file at ${path}`)
    json = JSON.parse(r.stdout)
    t.equal(json.ok, true, 'Got ok: true for upgrade confirmation')
    t.ok(json.message, 'Got message for upgrade confirmation')
    t.ok(r.stderr, 'Printed update info stderr')
    t.equal(r.code, 0, 'Exited 0')

    // TODO test --use flag
  })

  t.test(`${mode} Errors (JSON)`, async t => {
    t.plan(4)
    let json, r

    process.env.__enhance_TEST_URL__ = `http://localhost:${port}/lolidk`
    r = await enhance('update --json')
    json = JSON.parse(r.stdout)
    t.equal(json.ok, false, 'Got ok: false')
    t.match(json.error, failed, 'Errored on upgrade')
    t.ok(r.stderr, 'Printed update info stderr')
    t.equal(r.code, 1, 'Exited 1')
  })

  t.test(`${mode} Shut down dev server`, t => {
    shutdown(t)
    process.exitCode = 0
    delete process.env.enhance_INSTALL
    delete process.env.__enhance_TEST_URL__
  })
}

// Confirm the file written to the filesystem is chmod +x
async function isExecutable (t, filePath) {
  if (!process.platform.startsWith('win')) {
    try {
      await access(filePath, fsConstants.X_OK)
    }
    catch (err) {
      t.fail(`File is not executable: ${filePath}`)
    }
  }
}

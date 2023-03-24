let test = require('tape')
let { join } = require('path')
let lib = join(process.cwd(), 'test', 'lib')
let { enhance: _enhance, run } = require(lib)

test('Run version tests', async t => {
  await run(runTests, t)
  t.end()
})

async function runTests (runType, t) {
  let mode = `[Version / ${runType}]`
  let enhance = _enhance[runType].bind({}, t)
  let fullVer = /^Enhance \d+\.\d+\.\d+$/
  let ver = /^\d+\.\d+\.\d+$/

  t.test(`${mode} Normal`, async t => {
    t.plan(9)
    let r

    r = await enhance('version')
    t.match(r.stdout, fullVer, 'Got version')
    t.notOk(r.stderr, 'Did not print to stderr')
    t.equal(r.code, 0, 'Exited 0')

    r = await enhance('ver')
    t.match(r.stdout, fullVer, 'Got version')
    t.notOk(r.stderr, 'Did not print to stderr')
    t.equal(r.code, 0, 'Exited 0')

    r = await enhance('v')
    t.match(r.stdout, fullVer, 'Got version')
    t.notOk(r.stderr, 'Did not print to stderr')
    t.equal(r.code, 0, 'Exited 0')
  })

  t.test(`${mode} JSON`, async t => {
    t.plan(15)
    let r, json

    r = await enhance('version --json')
    json = JSON.parse(r.stdout)
    t.ok(json.enhance, `Got a value for Enhance exe path: ${json.enhance}`)
    t.match(json.version, ver, 'Got version')
    t.match(json.message, fullVer, 'Got version message')
    t.notOk(r.stderr, 'Did not print to stderr')
    t.equal(r.code, 0, 'Exited 0')

    r = await enhance('ver --json')
    json = JSON.parse(r.stdout)
    t.ok(json.enhance, `Got a value for Enhance exe path: ${json.enhance}`)
    t.match(json.version, ver, 'Got version')
    t.match(json.message, fullVer, 'Got version message')
    t.notOk(r.stderr, 'Did not print to stderr')
    t.equal(r.code, 0, 'Exited 0')

    r = await enhance('v --json')
    json = JSON.parse(r.stdout)
    t.ok(json.enhance, `Got a value for Enhance exe path: ${json.enhance}`)
    t.match(json.version, ver, 'Got version')
    t.match(json.message, fullVer, 'Got version message')
    t.notOk(r.stderr, 'Did not print to stderr')
    t.equal(r.code, 0, 'Exited 0')
  })
}

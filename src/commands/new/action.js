module.exports = async function (params) {
  let { existsSync, writeFileSync } = require('fs')
  let { isAbsolute, join, normalize } = require('path')
  let { createProject } = await import('@enhance/create/create-project.js')

  let { args } = params
  let utils = require('../../lib')
  let { npmCommands: { initialInstall } } = utils
  let error = require('./errors')(params, utils)
  let _inventory = require('@architect/inventory')
  let c = require('picocolors')
  let looseName = /^[a-z][a-zA-Z0-9-_]+$/

  // Project path
  let path = args.path || args.p || args._[1] || '.'
  if (path === true) {
    return error('no_path')
  }

  let dest = isAbsolute(path) ? path : normalize(join(process.cwd(), path))

  // Error out if folder already exists and it has an arc project already
  if (existsSync(dest)) {
    let inventory = await _inventory({ cwd: dest })
    let invalid = inventory.inv._project.manifest
    if (invalid) return error('project_found')
  }

  // App name (optional)
  let appName = args.name || args.n ? args.name || args.n  : 'enhance-app'
  if (!looseName.test(appName)) {
    return error('invalid_appname')
  }

  try {
    createProject({ path, dest, name: appName })
  }
  catch (err) {
    return error('project_found')
  }

  const pkgFile = require(join(dest, 'package.json'))
  pkgFile.scripts.start = 'enhance dev'
  delete pkgFile.devDependencies['@architect/sandbox']
  pkgFile.devDependencies['simon-enhance-cli'] = 'latest'

  writeFileSync(
    join(dest, 'package.json'),
    JSON.stringify(pkgFile, null, 2),
  )

  // Need to install enhance/arc-plugin-enhance or 💥
  await initialInstall(params, dest)

  // Success message
  let cdPath = path === '.' ? '' : `cd ${path} && `
  console.error(`Project ${appName} successfully created! To get started run: ${c.bold(c.green(`${cdPath}enhance dev`))}`)
}

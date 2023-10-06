module.exports = async function (params) {
  let { existsSync, writeFileSync } = require('fs')
  let { join, resolve } = require('path')

  let utils = require('../../lib')
  let { npmCommands: { initialInstall } } = utils
  let error = require('./errors')(params, utils)
  let _inventory = require('@architect/inventory')
  let c = require('@colors/colors/safe')

  let dest = resolve('.')

  // Error out if folder already exists and it has an arc project already
  if (existsSync(dest)) {
    let inventory = await _inventory({ cwd: dest })
    let invalid = inventory.inv._project.manifest
    if (invalid) return error('project_found')
  }

  // write arc file
  writeFileSync(join(dest, '.arc'),
    `@app
enhance-app

@static
prune true

@plugins
enhance/arc-plugin-enhance
`
  )

  const pkgFilePath = join(dest, 'package.json')
  if (existsSync(pkgFilePath)) {
    const pkgFile = require(join(dest, 'package.json'))
    pkgFile.scripts.enhance = 'enhance'
    pkgFile.scripts.start = 'npx enhance dev'
    pkgFile.devDependencies['@enhance/cli'] = 'latest'
    pkgFile.devDependencies['@enhance/types'] = 'latest'
    pkgFile.dependencies['@enhance/arc-plugin-enhance'] = 'latest'

    writeFileSync(
      pkgFilePath,
      JSON.stringify(pkgFile, null, 2),
    )
  }
  else {
    writeFileSync(
      pkgFilePath,
      `{
  "name": "enhance-app",
  "version": "0.0.1",
  "scripts": {
    "start": "npx enhance dev",
    "enhance": "enhance"
  },
  "devDependencies": {
    "@enhance/cli": "latest",
    "@enhance/types": "latest"
  },
  "dependencies": {
    "@enhance/arc-plugin-enhance": "latest"
  }
}
`
    )
  }

  // Need to install enhance/arc-plugin-enhance or 💥
  await initialInstall(params, dest)

  // Success message
  console.error(`Project successfully initialized! To get started run: ${c.bold(c.green(`npx enhance dev`))}`)
}

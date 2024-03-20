module.exports = async function (params) {
  let { closeSync, existsSync, mkdirSync, openSync, writeFileSync } = require('fs')
  let { join, resolve } = require('path')

  let utils = require('../../lib')
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

@plugins
enhance/arc-plugin-enhance
enhance/arc-plugin-styles
enhance/styles-cribsheet
`
  )

  const pkgFilePath = join(dest, 'package.json')
  if (!existsSync(pkgFilePath)) {
    writeFileSync(
      pkgFilePath,
      `{
    "name": "enhance-app",
    "version": "0.0.1",
    "scripts": {
      "start": "npx enhance dev"
    },
    "devDependencies": {
      "@enhance/cli": "latest",
      "@enhance/types": "latest"
    },
    "dependencies": {
      "@enhance/arc-plugin-enhance": "latest",
      "@enhance/arc-plugin-styles": "latest",
      "@enhance/styles-cribsheet": "latest"
    }
  }
  `
    )
  }
  else {
    return error('package_json_found')
  }

  // Create an empty index.html page
  const dir = join(dest, 'app', 'pages')
  if (!existsSync(dir)){
    mkdirSync(dir, { recursive: true })
  }
  const index = join(dir, 'index.html')
  if (!existsSync(index)){
    closeSync(openSync(index, 'w'))
  }

  // Success message
  console.error(`Project successfully initialized!\nTo get started, install the dependencies: ${c.bold(c.green(`npm install`))}\nThen start the local development server: ${c.bold(c.green(`npx enhance dev`))}`)
}

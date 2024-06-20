function addRouteSource ({ manifest, replacements = {}, writeFile, command }) {
  let { mkdirSync } = require('fs')
  let { dirname } = require('path')
  let { routeName = '' } = replacements
  let { sourceFiles } = manifest
  sourceFiles.forEach(file => {
    let dir = dirname(file.target).replace('<ROUTE_NAME>', routeName)
    mkdirSync(dir, { recursive: true })
    // eslint-disable-next-line
    let source = require(`../${command}/${file.src}`)
    writeFile(file.target.replace('<ROUTE_NAME>', routeName), source(replacements))
  })
}

function addElements (elements, writeFile) {
  let { mkdirSync } = require('fs')
  let { dirname } = require('path')
  elements.forEach(element => {
    let dir = dirname('app/elements')
    mkdirSync(dir, { recursive: true })
    writeFile(`app/elements/${element.tagName}.mjs`, `import { ${element.name} } from "${element.package}"
export default ${element.name}
`)
  })
}

function addElementsFile (dependencies, writeFile, printer) {
  const { existsSync } = require('fs')
  let { join } = require('path')
  let elementsFile = join(process.cwd(), 'app', 'elements.mjs')
  console.log(elementsFile)
  if (!existsSync(elementsFile) && dependencies.find(dep => dep.startsWith('@enhance/form-elements'))) {
    writeFile(`app/elements.mjs`, `import elements from "@enhance/form-elements";
export default elements;
`)
  }
  else {
    printer(`Add the following line to your app/elements.mjs file:

import elements from "@enhance/form-elements";
export default elements;
`)
  }
}

module.exports = {
  addElements,
  addElementsFile,
  addRouteSource
}

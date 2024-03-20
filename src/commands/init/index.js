let names = { en: [ 'init' ] }
let action = require('./action')

module.exports = {
  names,
  action,
  help: () => {
    return {
      en: {
        usage: [ 'init' ],
        description: 'Initialize a new empty Enhance project',
        examples: [
          {
            name: 'Create a new project in the current folder',
            example: 'npx @enhance/cli init',
          },
        ]
      },
    }
  }
}

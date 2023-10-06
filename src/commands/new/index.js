let names = { en: [ 'new' ] }
let action = require('./action')

module.exports = {
  names,
  action,
  help: () => {
    return {
      en: {
        usage: [ 'new', '[folder] [options]' ],
        description: 'Initialize a new Enhance project',
        contents: {
          header: 'New project parameters',
          items: [
            {
              name: '-n, --name',
              description: 'Project name, must be: [a-z0-9-_]',
              optional: true,
            },
          ],
        },
        examples: [
          {
            name: 'Create a new project in the ./my-proj folder',
            example: 'npx @enhance/cli new my-proj',
          },
          {
            name: 'Create a new project in the ./my-proj folder with the name my-app',
            example: 'npx @enhance/cli new my-proj -n my-app',
          },
        ]
      },
    }
  }
}

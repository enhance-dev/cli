let names = { en: [ 'new', 'init' ] }
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
            name: 'Create a new project in the current folder',
            example: 'enhance new',
          },
          {
            name: 'Create a new project in the ./my-proj folder',
            example: 'enhance new my-proj',
          },
          {
            name: 'Create a new project with the name my-app',
            example: 'enhance new project -n my-app',
          },
        ]
      },
    }
  }
}

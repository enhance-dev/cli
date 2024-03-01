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
            {
              name: '-t, --template',
              description: 'Repository to use as an application template',
              optional: true,
            },
          ],
        },
        examples: [
          {
            name: 'Create a new project in the ./my-proj folder',
            example: 'npx enhance new my-proj',
          },
          {
            name: 'Create a new project with the name my-app',
            example: 'npx enhance new project -n my-app',
          },
          {
            name: 'Create a new project with the name my-app from template repo',
            example: 'npx enhance new project -n my-app -t https://github.com/enhance-dev/enhance-starter-project',
          },
        ]
      },
    }
  }
}

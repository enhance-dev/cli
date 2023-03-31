let names = { en: [ 'help' ] }
let help = {
  en: {
    usage: [ 'help', '[command]' ],
    contents: [
      {
        header: 'Local development',
        items: [
          {
            name: 'dev',
            description: 'Start the local development server',
          },
          {
            name: 'generate',
            description: 'Locally generate new code and project resources',
          },
          {
            name: 'new',
            description: 'Locally create a new project',
          },
        ],
      },
      {
        header: 'Other',
        items: [
          {
            name: 'help',
            description: 'Display help',
          },
          {
            name: 'update',
            description: 'Update Enhance to the latest version',
          },
          {
            name: 'version',
            description: 'Output app version',
          },
        ],
      },
    ],
    examples: [
      {
        name: 'Get general Enhance help',
        example: 'enhance help',
      },
      {
        name: 'Get help for a Enhance command (`generate`)',
        example: 'enhance help generate',
      },
    ],
  }
}

module.exports = {
  names,
  help,
}

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
        header: 'Manage Enhance apps &\nenvironments',
        items: [
          {
            name: 'builds',
            description: 'View build logs from app deployments',
          },
          {
            name: 'create',
            description: 'Create a Enhance app or environment',
          },
          {
            name: 'deploy',
            description: 'Deploy an app to Enhance',
          },
          {
            name: 'destroy',
            description: 'Destroy a Enhance app or environment',
          },
          {
            name: 'env',
            description: `List your Enhance app's environment variables`,
          },
          {
            name: 'list',
            description: 'List your Enhance apps and environments',
          },
          {
            name: 'login',
            description: 'Log into Enhance',
          },
          {
            name: 'logout',
            description: 'Log out of Enhance',
          },
          {
            name: 'logs',
            description: 'Retrieve logs from Enhance',
          },
          {
            name: 'tail',
            description: 'Tail logs from Enhance',
          },
        ],
      },
      {
        header: 'Manage your Enhance account domains',
        items: [
          {
            name: 'domains',
            description: 'List your Enhance account domain names',
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
            name: 'telemetry',
            description: 'Enable or disable basic CLI telemetry',
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
        example: 'begin help',
      },
      {
        name: 'Get help for a Enhance command (`generate`)',
        example: 'begin help generate',
      },
    ],
  }
}

module.exports = {
  names,
  help,
}

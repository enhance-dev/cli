module.exports = {
  en: {
    usage: [ 'dev', '[options]' ],
    description: 'Start the Enhance local development server',
    contents: {
      header: 'Dev server options',
      items: [
        {
          name: '--host',
          description: `Configure the host the dev server will listen on`,
          optional: true,
        },
        {
          name: '-p, --port',
          description: `Configure the dev server's HTTP port`,
          optional: true,
        },
        {
          name: '-v, --verbose',
          description: 'Enable verbose output',
          optional: true,
        },
        {
          name: '--disable-symlinks',
          description: '[Advanced] Disable shared code symlinking',
          optional: true,
        },
      ],
    },
    examples: [
      {
        name: 'Start the Enhance dev server',
        example: 'npx enhance dev',
      },
      {
        name: 'Start the dev server on port 6666',
        example: 'npx enhance dev --port 6666',
      },
    ],
  },
}

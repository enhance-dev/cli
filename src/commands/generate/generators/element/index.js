let action = require('./action')

module.exports = {
  name: 'element',
  description: 'Create a new element',
  action,
  help: () => {
    return {
      en: {
        contents: {
          header: 'Element parameters',
          items: [
            {
              name: '-n, --name',
              description: 'Element name, must follow: https://html.spec.whatwg.org/multipage/scripting.html#valid-custom-element-name',
            },
          ],
        },
        examples: [
          {
            name: 'Create an element',
            example: 'npx enhance gen element --name my-element',
          },
        ],
      },
    }
  },
}

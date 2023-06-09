module.exports = function ({ plural, singular, schema }) {
  let { schemaToForm } = require('../schema-to-form')
  return `// View documentation at: https://enhance.dev/docs/learn/starter-project/pages
/**
  * @type {import('@enhance/types').EnhanceElemFn}
  */
export default function Html ({ html, state }) {
  const { store } = state
  const ${singular} = store.${singular} || {}
  const problems = store.problems || {}

  return html\`<enhance-page-container>
  ${schemaToForm({ action: plural, schema, update: true, data: singular })}
</enhance-page-container>\`
}
`
}

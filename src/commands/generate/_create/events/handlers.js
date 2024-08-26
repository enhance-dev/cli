let copy = {
  en: {
    view_docs_js: 'View documentation at: https://arc.codes/docs/en/reference/runtime-helpers/node.js#arc.events',
    view_docs_python: 'View documentation at: https://arc.codes/docs/en/reference/runtime-helpers/python#arc.events',
  },
}

let deno = lang => `// ${copy[lang].view_docs_js}
export async function handler (event: object) {
  console.log(JSON.stringify(event, null, 2))
  return
}
`

let node = lang => `// ${copy[lang].view_docs_js}
export async function handler (event) {
  console.log(JSON.stringify(event, null, 2))
  return
}
`

let ruby = () => `def handler(event)
  puts event
  true
end
`

let python = lang => `# ${copy[lang].view_docs_python}
def handler(event, context):
  print(event)
  return True
`

module.exports = { node, deno, ruby, python }

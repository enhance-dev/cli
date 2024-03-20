module.exports = function error (params) {
  return function (err) {
    let { lang } = params
    let errors = {
      en: {
        project_found: 'Existing Enhance app already found in this directory',
        package_json_found: 'Existing package.json already found in this directory'
      }
    }
    return Error(errors[lang][err])
  }
}

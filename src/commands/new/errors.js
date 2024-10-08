module.exports = function error (params, utils) {
  return function (err) {
    let { lang } = params
    let { backtickify, runtimes } = utils
    let errors = {
      en: {
        no_path: 'Project path not found, please run with -p or --path',
        path_exists: 'Destination path already exists',
        project_found: 'Existing Enhance app already found in this directory',
        invalid_appname: `Invalid app name`,
        invalid_runtime: `Function runtime must be one of: ${backtickify(runtimes)}`,
      },
    }
    return Error(errors[lang][err])
  }
}

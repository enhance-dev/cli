module.exports = {
  names: { en: [ 'version', 'ver', 'v' ] },
  action: ({ appVersion }) => {
    let message = `Enhance ${appVersion}`
    return {
      string: message,
      json: {
        enhance: process.argv[0],
        version: appVersion,
        message,
      }
    }
  }
}

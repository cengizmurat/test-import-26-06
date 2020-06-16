const fs = require('fs')

const configFile = 'config.json'

let config = {}
const variables = ['REDIS_HOST']
// Optional variables and their default values
const optionalVariables = {
  'PORT': '3000',
  'REDIS_PORT': '6379',
  'REDIS_PASSWORD': undefined,
  'LOG': 'INFO'
}

if (fs.existsSync(configFile)) {
  console.log(`[INFO] Loading "${configFile}" file...`)
  config = require('./' + configFile)
} else {
  console.log(`[INFO] "${configFile}" file not found, checking for environment variables...`)
  for (const variable of variables.concat(Object.keys(optionalVariables))) {
    const value = process.env[variable]
    if (value !== undefined) {
      config[variable] = value
    }
  }
}

for (const [optionalVariable, defaultValue] of Object.entries(optionalVariables)) {
  const definedValue = config[optionalVariable]
  if (definedValue === undefined) {
    console.log(`[INFO] Optional configuration variable ${optionalVariable} not defined, using default value "${defaultValue}"`)
    config[optionalVariable] = defaultValue
  }
}

let allVariables = true
for (const variable of variables) {
  const value = config[variable]
  if (value === undefined) {
    console.error(`[FATAL] Configuration variable ${variable} is missing.`)
    allVariables = false
  }
}

if (!allVariables) {
  console.error(`[FATAL] Cannot run the server due to missing configuration variable(s).`)
  process.exit()
}

module.exports = config

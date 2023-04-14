# Enhance CLI

[![GitHub CI status](https://github.com/enhance-dev/cli/workflows/Node%20CI/badge.svg)](https://github.com/enhance-dev/cli/actions?query=workflow%3A%22Node+CI%22)

## Getting started

Create a new Enhance project by running the command:

`npx "@enhance/cli@latest" new ./myproject -y`

This will create a new Enhance project which includes the Enhance CLI as a dev dependency.

## Installing

Install the Enhance CLI in an existing Enhance project by opening your terminal and entering the following command:

`npm i -g @enhance/cli --save-dev`

Alternatively, you can globally install Enhance with npm: `npm i -g @enhance/cli`.

## Usage

- Run `npx enhance` to see your list of available commands
- Get help:
  - Providing no argument (or unknown arguments) will print help; help should never be hard to get!
  - Additionally, providing the argument `help` *anywhere* in your command will *always* display relevant help (like `-h` or `--help` flags); for example:
    - `npx enhance dev help` is equivalent to `npx enhance help dev` or `npx enhance dev -h`
- Disable colorized output with the `--no-color` flag, or with the following env vars: `ENHANCE_NO_COLOR`, `NO_COLOR`, or by setting `TERM` to `dumb`
  - Output is automatically de-colorized in JSON mode (`--json`)


## JSON output

Setting the `--json` flag sets the output mode to JSON, intended for use with modern JSON-based workflows using tools like `jq`.

As such, **final JSON output is always sent to `stdout`**, even in the event of an error. Additionally, all ANSI colorization is automatically stripped from JSON output.


### JSON schema

Successful execution:

- `ok` (boolean): always `true`
- `message` (string): always be present, but may be empty (`""`)
- Other properties: individual commands may provide their own properties; for example: `begin version` will output `begin` (executable path) and `version` (semver string) properties)

Unsuccessful execution

- `ok` (boolean): always `false`
- `error` (string): message of the error
- `stack` (string): stack trace of the error; only present if `--debug` flag is set


## Tidbits

Wherever possible, the Enhance CLI adheres to the [Command Line Interface Guidelines](https://clig.dev/).

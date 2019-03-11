# Hapi.js Boilerplate

This repository is heavily influenced by [Hapi Starter Kit](https://github.com/Codigami/hapi-starter-kit)

### Prereqs

1. MongoDB
    ```bash
        brew update

        brew install mongodb

        # start mongodb daemon
        mongod
    ```

### Directory Structure

```txt
.
|-- README.md
|-- config # environment and configuration variables get put here
|   `-- default.json
|-- index.js
|-- package.json
|-- plugins.js
|-- public # frontend public assets get put in this directory
|-- routes.js
|-- server
|   `-- utils
|       `-- logger.js
|-- server.js

```


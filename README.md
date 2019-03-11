# ZacharyHughes.com

A personal website powered by [Hapi.js](https://hapijs.com/)

### Prereqs

1. [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
2. [nodemon](https://nodemon.io/)
3. [Bootstrap](https://getbootstrap.com/docs/4.3/getting-started/download/)

### Running the app
- Development
    - `npm run dev`
- Production
    - `npm run prod`

### Directory Structure

```txt
.
|-- README.md
|-- config # environment variables
|   `-- default.json
|-- database.js
|-- index.js
|-- models
|   |-- Blurb.js
|   `-- Post.js
|-- package.json
|-- plugins.js
|-- public # public assets
|   |-- admin.html
|   |-- blurbs-list.htm
|   |-- images # uploaded images get saved here
|   |-- posts-list.html
|   |-- script.js
|   `-- style.css
|-- routes.js
|-- server
|   |-- posts
|   |   |-- postHandler.js
|   |   `-- postRoutes.js
|   `-- utils
|       |-- logger.js
|       `-- utils.js
|-- server.js
|-- templates # handlebar templates
|   `-- post.html
`-- yarn.lock
```



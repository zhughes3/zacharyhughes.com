# ZacharyHughes.com

A personal website powered by [Hapi.js](https://hapijs.com/)

### Prereqs

1. [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
2. [nodemon](https://nodemon.io/)
3. [Bootstrap](https://getbootstrap.com/docs/4.3/getting-started/download/)

### Running the app
- Development (uses nodemon)
    - `npm run dev`
- Production
    - `npm run prod`
- Format Code, Identify Errors
    - `npm run lint`

### Directory Structure

```txt
.
|-- README.md
|-- config # environment variables
|   `-- default.json
|-- database.js
|-- index.js
|-- package.json
|-- plugins.js
|-- public #public assets
|   |-- 404.html
|   |-- about.css
|   |-- about.html
|   |-- admin.css
|   |-- admin.html
|   |-- blurbs-list.html
|   |-- dev-list.html
|   |-- index.css
|   |-- index.html
|   |-- list.css
|   |-- music-list.html
|   |-- post.css
|   |-- posts
|   |   |-- deploy-jobs.md
|   |   `-- posts.meta
|   `-- utils.js
|-- routes.js
|-- server # all subdirectories are REST models
|   |-- dev
|   |   |-- Dev.js
|   |   |-- devHandler.js
|   |   `-- devRoutes.js
|   |-- etc
|   |   |-- Etc.js
|   |   |-- etcHandler.js
|   |   `-- etcRoutes.js
|   |-- film
|   |   |-- Film.js
|   |   |-- filmHandler.js
|   |   `-- filmRoutes.js
|   |-- music
|   |   |-- Music.js
|   |   |-- musicHandler.js
|   |   `-- musicRoutes.js
|   |-- users
|   |   |-- User.js
|   |   |-- userHandler.js
|   |   `-- userRoutes.js
|   `-- utils # functionality shared by models
|       |-- logger.js
|       `-- utils.js
|-- server.js
|-- templates # server-side templates
|   |-- film.html
|   |-- list.html
|   |-- music.html
|   `-- post.html
`-- yarn.lock
```

### What does the configuration file look like?

With some of the configuration driving the functionality and look of the site, it is important to have the configuration 
set up correctly. To do so, create a file in the root `config` directory called `default.json`. This is the filenaming 
structure adopted by the configuration management package we use: [config](https://www.npmjs.com/package/config). This 
file should resemble the following json:

```json
{
    "app": {
        "port": 3000,
        "host": "localhost",
        "name": "Your website name here",
        "logLevel": "info"
    },
    "database": {
        "url": "mongodb://localhost/your-collection-name-here"
    }
}
```

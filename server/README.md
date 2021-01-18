### NB

This application rely on production code of client part, which copied after build (of client part) into
[public](./public) folder of current project.

### `Database configuration`

For store data, application used NoSQL database - MongoDB, configuration (address of the database and credentionals)
for which you can predefine in environment variables.
In root folder of project, copy file [.env.example](/.env.example), fill and rename into **.env**

<pre>
DB_USER=
DB_PASSWORD=
DB_NAME='kill-blocks-game'
MONGODB_ENV='mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.utuct.mongodb.net/${DB_NAME}?retryWrites=true&w=majority'
PORT=9090
</pre>

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:9090](http://localhost:9090) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

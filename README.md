I started this news website project with basic [Create React App](https://github.com/facebook/create-react-app).
Starting a reactjs project with create react app, and building a new project from scratch really helped me to study and understand reactjs.<br>
Website url: https://elnewspaper.com


## Available Scripts

In this project, you can use 'npm' and 'yarn'. I really like to use yarn instead of npm.

### `yarn run start`

Runs the app in the development mode.<br>
Open [http://localhost:8080] to view it in the browser.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It divides a build file into chunks of files, lighter than 1MB.


## Dependencies

### `yarn install`

You can also use `npm install` or `npx install` in this project. I tested it, and there was no version conflicts with npm install.


## Structure

It is basically built in Redux-Thunk pattern. Structure of directory is really depends on what you prefer and type of project you build.
 I found organizing directories in `components`, `containers`, and `utils` is kinda readable to me, and makes me easier to locate javascript logic and to add css style.


## Webpack

I used webpack for dev-server. In `webpack.config.js` file, `mode` should be set `production` even if you want to run in development mode.
Instead, you can change `devtool:` options to source-map or etc.

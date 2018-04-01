Created using react, mobx and flexbox.

Used mobx-react boilerplate https://github.com/mobxjs/mobx-react-boilerplate

Deployed https://resonate-frontend.herokuapp.com/

To run locally clone this repo, run `npm install` then `npm run dev` for a dev server with hot module replacement (updates when you change stuff).

To get this to deploy on heroku I hacked together I made:
- a build script `npm run build` which bundles the frontend app inside `src/` to `dist/bundle.js`.
- an express server with get `/` serving `./index.html`.
- `./index.html` point to `./dist/bundle.js` so it serves the react frontend.
- a start script which starts the express server.

When deving just use `npm run dev` can test localhost and stuff on it, when deploying run `npm run build` then deploy with remembering to add in `./dist`.

Side note: I've stuffed up hot module replacement loading the browser somehow, fix later.
## Setting up npm

To setup, install the following npm packages:
```
$ npm i react react-dom babel-loader babel-preset-es2015 babel-preset-react webpack react-bootstrap -S
npm install webpack-dev-server -g
npm install --save-dev react-hot-loader
```

If you use Syntastic, here's a workaround to suppress the errors wherever XML nodes show up.

npm install -g eslint bable-eslint eslint-plugin-react

---

To bundle the jsx files, run

` ./node_modules/.bin/webpack -d `

Or evern better, make it watch for changes in the background:

` ./node_modules/.bin/webpack -d --watch`

Or BETTER yet, use `npm run` with the configuration I've written.

* To watch it, run `npm run dev`
* To run it in production mode, run `npm run build`

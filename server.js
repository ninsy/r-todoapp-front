/* eslint no-console:0 */
require('babel-register');

const express = require('express');
const React = require('react');
const fs = require('fs');
const compression = require('compression');
const ReactDOMServer = require('react-dom/server');
const ReactRouter = require('react-router-dom');
const template = require('lodash.template');
const App = require('./js/App').default;

const StaticRouter = ReactRouter.StaticRouter;
const port = process.env.PORT || 8080;
const baseTemplate = fs.readFileSync('./index.html');
const parsedTemplate = template(baseTemplate);

const server = express();

server.use(compression());
server.use('/public', express.static('./public'));
server.use((req, res) => {
  const context = {};
  const body = ReactDOMServer.renderToString(
    React.createElement(StaticRouter, { location: req.url, context },
      React.createElement(App)
    )
  );
  if(context.url) {
    res.redirect(context.url);
  }
  res.end(parsedTemplate({body}))
});

console.log(`Magic happens on port ${port}`);
server.listen(port);

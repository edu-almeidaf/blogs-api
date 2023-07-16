const express = require('express');
const { loginRoutes, userRoutes, categoryRoutes, postRoutes } = require('./routes');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use(loginRoutes);
app.use(userRoutes);
app.use(categoryRoutes);
app.use(postRoutes);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

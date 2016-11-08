// import the controllers, including index.js
const controllers = require('./controllers');

// function to attach routes
const router = (app) => {
  // pass the express app in

  // when someone goes to the /djroom or djhost page, call controllers.djroom
  app.get('/guest', controllers.guest);
  app.get('/host', controllers.host);

  // no extension brings users to the homepage
  app.get('/', controllers.index);

  // When I eventually create a 404 page, I will use this to have to utilized
  // app.get('/*', controllers.notFound);
};

// export the router function
module.exports = router;

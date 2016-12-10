// import the controllers, including index.js
const controllers = require('./controllers');

// function to attach routes
const router = (app) => {
  // pass the express app in

  // when someone goes to the
  app.get('/guest', controllers.guest);
  app.get('/host', controllers.host);

  // no extension brings users to the homepage
  app.get('/', controllers.index);
};

// export the router function
module.exports = router;

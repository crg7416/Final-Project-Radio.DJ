
// function to handle requests to the main page
const hostIndex = (req, res) => {
  res.render('index', {
    currentName: 'This is the homepage',
    title: 'Home',
    pageName: 'Home Page',
  });
};

// Renders the dj room if you choose to join, not create
const guestFunc = (req, res) => {
  var name = req.query.room;
  res.render('djroom', {
    pageName: name,
  });
};

// renders the dj room with the features of a host
const hostFunc = (req, res) => {
  var name = req.query.room;
  res.render('djroom', {
    pageName: name,
    hosting: true,
  });
};

// 404 function, not currently implemented
// const notFound = (req, res) => {
//  res.status(404).render('notFound', {
//    page: req.url,
//  });
// };

// export the relevant public controller functions
module.exports = {
  index: hostIndex,
  guest: guestFunc,
  host: hostFunc,
  //notFound: notFound,
};

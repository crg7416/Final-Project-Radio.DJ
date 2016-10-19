
// function to handle requests to the main page
const hostIndex = (req, res) => {
  res.render('index', {
    currentName: 'This is the homepage',
    title: 'Home',
    pageName: 'Home Page',
  });
};

// Renders the dj room if you choose to join, not create
const djRoom = (req, res) => {
  res.render('djroom');
};

// renders the dj room with the features of a host
const djHost = (req, res) => {
  res.render('djroom', {
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
  djroom: djRoom,
  djhost: djHost,
  //notFound: notFound,
};

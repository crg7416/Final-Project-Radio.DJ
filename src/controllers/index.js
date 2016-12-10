
// function to handle requests to the main page
const hostIndex = (req, res) => {
  res.render('index', {
    currentName: 'This is the homepage',
    title: 'Radio.DJ',
    pageName: 'Home Page',
  });
};

// Renders the dj room if you choose to join, not create
const guestFunc = (req, res) => {
  const name = req.query.room;
  res.render('djroom', {
    roomName: name,
    hosting: false,
  });
};

// renders the dj room with the features of a host
const hostFunc = (req, res) => {
  const name = req.query.room;
  res.render('djroom', {
    roomName: name,
    hosting: true,
  });
};

// export the relevant public controller functions
module.exports = {
  index: hostIndex,
  guest: guestFunc,
  host: hostFunc,
};

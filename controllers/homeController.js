
exports.getHome = (req, res) => {
    res.render('home', {
      title: 'Home',
      stylesheet: 'home', 
      script: 'home'
    });
  };

  
exports.getAbout = (req, res) => {
    res.render('about', {
      title: 'About',
      stylesheet: 'about', 
      script: 'about'
    });
  };

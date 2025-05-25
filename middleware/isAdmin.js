module.exports = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
    return  res.render('home', {
      title: 'Home',
      stylesheet: 'home', 
      script: 'home'
    });
};

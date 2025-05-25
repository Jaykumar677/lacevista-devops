const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

const http = require('http').createServer(app); // Create HTTP server manually

// Route imports
const pagesRoutes = require('./routes/pagesRoutes');
const authRoutes = require('./routes/authRoutes');
const shopRoutes = require('./routes/shopRoutes');
const cartRoutes = require('./routes/cartRoutes');
const session = require('express-session'); // session
const cartController = require('./controllers/cartController');
const orderRoutes = require('./routes/orderRoutes');
const router = express.Router();
const checkoutRoutes = require('./routes/checkout'); // ✅ NEW checkout routeconst checkoutRoutes = require('./routes/checkout'); // ✅ NEW checkout routeconst http = require('http');

app.use(session({
  secret: 'LaceVista@2025',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set(express.static('public'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/LaceVista', {
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Dummy user (replace in real auth)
// app.use((req, res, next) => {
//   req.user = { _id: '663df0ea3b42cdcdf204f8a4' }; // your test user ID
//   next();
// });

router.get('/', cartController.getHomePage); // Home page route
// module.exports = router;

// Middleware to inject cart count globally
app.use(async (req, res, next) => {
  if (!req.user) {
    res.locals.cartCount = 0;
    return next();
  }

  try {
    const cart = await Cart.findOne({ userId: req.session.userId });
    res.locals.cartCount = cart
      ? cart.items.reduce((total, item) => total + item.qty, 0)
      : 0;
  } catch (err) {
    console.error('Cart count middleware error:', err);
    res.locals.cartCount = 0;
  }
  next();
});


// === Mount Routes ===
app.use('/', authRoutes);
app.use('/', shopRoutes);
app.use('/', cartRoutes);
app.use('/', pagesRoutes);
app.use('/', orderRoutes);
app.use('/', checkoutRoutes); // ✅ Mount the new checkout route

// === Start Server ===
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// At bottom of app.js
module.exports = app;


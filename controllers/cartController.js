const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getHomePage = async (req, res) => {
  try {
    // Assuming the user is logged in and we have access to their user ID
    const cart = await Cart.findOne({ userId: req.session.userId });
    const cartCount = cart
      ? cart.items.reduce((total, item) => total + item.qty, 0)
      : 0;

    // Render the homepage and pass the cartCount to the view
    res.render('home', { cartCount: cartCount });
  } catch (err) {
    console.error('Error fetching cart count:', err);
    res.render('home', { cartCount: 0 }); // Default to 0 if error occurs
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.session.userId; // assumes user is authenticated and available

    // Populate product info inside cart
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.render('cart', { cartItems: [], totalCost: 0 });
    }

    const cartItems = cart.items.map(item => {
      const product = item.productId;
      return {
        id: product._id,
        name: product.name,
        image: product.image,
        color: product.color,
        price: product.price,
        quantity: item.qty,
        stock: product.stock  // <-- add stock here
      };
    });

    const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    res.render('cart', { cartItems, totalCost });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};


exports.addToCart = async (req, res) => {
  try {
    // console.log('Reach to AddToCart');
    const userId = req.session.userId; // Assume user ID stored in session
    // console.log('Logging User ID:', req.session.userId)
    const { productId } = req.body;
    // console.log('Product Body:', req.body);
    let cart = await Cart.findOne({ userId });
    // console.log('Found Existing Data:', cart);
    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId,
        items: [{ productId, qty: 1 }]
      });
      // console.log('Add New Card Data:', cart);
    } else {
      // Check if product already exists in cart
      const existingItem = cart.items.find(item => item.productId.toString() === productId);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        cart.items.push({ productId, qty: 1 });
      }
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart' });
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { id: productId, quantity } = req.body;
    const qty = parseInt(quantity);

    if (qty < 1) return res.status(400).json({ error: 'Invalid quantity' });

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) return res.status(404).json({ error: 'Cart item not found' });

    // Update item quantity
    item.qty = qty;

    // Save cart
    await cart.save();

    // Fetch product price from DB to ensure accuracy
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Recalculate total cart value
    const total = cart.items.reduce(async (accPromise, item) => {
      const acc = await accPromise;
      const prod = await Product.findById(item.productId);
      return acc + (prod.price * item.qty);
    }, Promise.resolve(0));

    return res.json({
      success: true,
      updatedQty: qty,
      productId,
      price: product.price,
      total: (await total).toFixed(2),
    });
  } catch (err) {
    console.error('Error updating cart item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


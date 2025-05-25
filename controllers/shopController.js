const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
  try {
    const { color, maxPrice } = req.query;

    const filter = {};
    console.log('color', color);
    // Case-insensitive color filter
    if (color) {
      filter.color = { $regex: new RegExp(`^${color}$`, 'i') };  // 'i' makes it case-insensitive
    }

    if (maxPrice) {
      filter.price = { $lte: parseFloat(maxPrice) };
    }

    const products = await Product.find(filter);

    res.render('shop', {
      title: 'Shop',
      stylesheet: 'shop',
      script: 'shop',
      productList: products,
      selectedColor: color || '',
      maxPrice: maxPrice || 999,
    });
    
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Error fetching products');
  }
};

exports.getAll = async (req, res) => {
  const products = await Product.find();
  res.render('admin/products', { products });
};

exports.newForm = (req, res) => {
  res.render('admin/newProduct');
};

exports.create = async (req, res) => {
  const { name, description, color, price, stock, image } = req.body;
  await Product.create({ name, description, color, price, stock, image });
  res.redirect('/admin/products');
};

exports.editForm = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('admin/editProduct', { product });
};

exports.update = async (req, res) => {
  try {
    const { name, description, color, price, stock, image } = req.body;

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, color, price, stock, image },
      { new: true } // return updated doc
    );

    if (!updatedProduct) {
      return res.status(404).send('Product not found');
    }

    // Emit stock update event to all connected clients
    const io = req.app.get('io');
    io.emit('stockUpdate', { productId: updatedProduct._id.toString(), newStock: updatedProduct.stock });

    res.redirect('/admin/products');
  } catch (err) {
    console.error('Product Update Error:', err);
    res.status(500).send('Failed to update product');
  }
};


exports.delete = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/admin/products');
};

exports.bulkUpdatePrice = async (req, res) => {
  const priceChange = parseFloat(req.body.priceChange);

  if (isNaN(priceChange)) {
    return res.status(400).send('Invalid price change value');
  }

  try {
    await Product.updateMany({}, { $inc: { price: priceChange } });
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to update prices');
  }
};

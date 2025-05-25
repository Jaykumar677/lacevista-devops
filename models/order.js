const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  shoe_length:{ type: Number},
  shoe_width:{ type: Number},
  shoe_arch:{ type: Number},
  user_address:{ type: String},
  user_city:{type: String},
  user_zipcode:{ type: Number},
  user_country:{type: String},
  cc_no:{ type: Number},
  cc_expiry:{type: String},
  cc_cvv:{ type: Number},
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      qty: { type: Number, default: 1 }
    }
  ],
   deleted: { type: Boolean, default: false }  // Soft delete flag
});

module.exports = mongoose.model('Order', orderSchema);
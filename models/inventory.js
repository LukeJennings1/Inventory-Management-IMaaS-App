const mongoose = require('mongoose');
const Schema = mongoose.Schema

const inventoryItemSchema = new Schema({ // this is the documnet schema IE the documnet data structure.
    name: String,
    description: String, 
    category: String, 
    price: Number, 
    numInStock: Number, 
    url: String,
})

const InventoryItems = mongoose.model('InventoryItems', inventoryItemSchema);

module.exports = InventoryItems;
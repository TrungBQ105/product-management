const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: String,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    position: Number,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;

import mongoose from "mongoose";
import Product from "./../Model/Product.js";

export default class ProductController {

  static async getAllProducts(request,response) {
    try {
      const products = await Product.find();
      response.status(200).json(products);
      console.log("from prods")
      console.log(products);
    } catch (e) {
      console.error(e);
    }
  }

}

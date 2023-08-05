import productModel from "./ProductModel.js"

const products = [
  {
    name: 'Slim Shirt',
    category: 'Shirts',
    image: '/images/d1.jpg',
    image1: '/images/x4.jpg',
    image2: '/images/x2.jpg',
    image3: '/images/x3.jpg',
    price: 60,
    brand: ' Nike',
    rating: 4.5,
    numReviews: 10,
    alias: "slim Shirt",
    countInstock:10
  },
  {
    name: 'Fit Shirt',
    category: 'Shirts',
    image: '/images/d2.jpg',
    image1: '/images/y4.jpg',
    image2: '/images/y2.jpg',
    image3: '/images/y3.jpg',
    price: 50,
    brand: ' Nike',
    rating: 3.2,
    alias: "Fit Shirtt",
    numReviews: 5,
    countInstock:10

  },
  {
    name: 'Best Pants',
    category: 'Pants',
    image: '/images/d3.jpg',
    image1: '/images/z4.jpg',
    image2: '/images/z2.jpg',
    image3: '/images/z3.jpg',
    price: 70,
    brand: ' Nike',
    rating: 2.5,
    alias: "Best Pantst",
    numReviews: 8,
    countInstock:10

  }, {
    name: 'Best Pants',
    category: 'Pants',
    image: '/images/p1.jpg',
    image1: '/images/zz1.jpg',
    image2: '/images/zz2.jpg',
    image3: '/images/zz3.jpg',
    price: 70,
    brand: ' Nike',
    alias: "west Pantst",
    rating: 4.5,
    numReviews: 8,
    countInstock:10
  },
]

class ProductController {

  async getProduct(req, res) {
    try {
      const result = await productModel.find()
      if (result) return res.status(200).send({ message: "success", products: result })
      return res.status(500).send({ message: "somthing went wrong" })
    } catch (error) {
      return res.status(500).send({ message: "Internal Server Error" })
    }
  }

  async getProductById(req, res) {

    try {
      const { id } = req.params
      const result = await productModel.findById({ _id: id })

      if (result) return res.status(200).send({ message: "success", product: result || {} })
      return res.status(500).send({ message: "somthing went wrong" })
    } catch (error) {
      return res.status(500).send({ message: "Internal Server Error" })
    }
  }


  async insertMany(req, res) {
    try {
      const result = await productModel.insertMany(products)
      if (result) return res.status(200).send({ message: "success", products: result })
      return res.status(500).send({ message: "somthing went wrong" })
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" })
    }
  }

  async Getcart(req,res){
    try {
      const {products} = req.body
      if(!products){
        return res.status(400).send({message:"Missing dependancy Products"})
      }
      const result = await productModel.find({_id:products}).select(["name","price","_id","category","brand","countInstock", "image"])
      if(!result){
        return res.status(400).send({message:"Somthing want wrong"})
      }
      return res.status(200).send({message:"Successs" ,products:result})
    } catch (error) {
      return res.status(500).send({message:"Inmternal server error"})
    }
  }
}
const productController = new ProductController()
export default productController 
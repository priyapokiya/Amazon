import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import Loader from "../Components/Loader";
import apiHelper from "../Components/ApiHelper";
import Messagebox from "../Components/Messagebox";

const Home = () => {

  const [products, setProducts] = useState([])
  const[isLoading,setisLoading] = useState(false)
  const[error,setError] = useState("")

  const fetchProducts = async () => {
    try {
         setisLoading(true)
      const result = await apiHelper.fetchProducts()
        setProducts(result.data.products)
        setisLoading(false)
    } catch (error) {
      setisLoading(false)
      if(error.response && error.response.data.message){
        setError(error.response.data.message)
      }
      setError(error.message)
    }
  } 

  useEffect(() => {
    fetchProducts()
  }, [])

  console.log(products);

  return (

    <>
      <div className="container"style={{position:"relative"}}>
        <Messagebox error={error} seterror={setError} />
        <Loader isLoading={isLoading} />
        <h5 className="mb-4">Feture Products</h5>
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {
            products && products.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })
          }
        </div>
      </div>

    </>

  )
}

export default Home;
import React,{useEffect,useState} from 'react'
import './Cart.css'
import axios from 'axios'
export default function Cart() {
  const userId=localStorage.getItem("userId")
  const [loading,setLoading]=useState(true)
  const [userProducts,setUserProducts]=useState()
  useEffect(()=>{
    getCartProducts()
  },[])
  async function getCartProducts(){
    const response=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cart?userId=${userId}`,)
    console.log(response.data.items)
    setUserProducts(response.data.items)
    setLoading(false)
  }
  return (
    <div className='cart-container'>
      {
        loading?(
          <p>Loading...</p>
        ):(
          <div className='cart-items'>
            {
              userProducts.map((productItems)=>(
                <div className='cart-item' key={productItems._id}>
                  <h3>Name{productItems.product.name}</h3>
                  <p>{productItems.product.price}</p>
                  <p>{productItems.product.description}</p>
                  <p>{productItems.product.category}</p>
                  <p>{productItems.product.stock}</p>
                  <p>{productItems.product.quantity}</p>
                </div>
              ))
            }
          </div>
        )
      }
      
    </div>
  )
}
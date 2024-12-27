import { useRouter } from "next/router";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/cartSlice";
import DotLoader from "../../../loaders";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { signIn } from "next-auth/react";

import axios from "axios";
export default function CardProduct({ product,selected}) {

  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch();
  const [id,setID]=useState("");
  const router = useRouter();
 const session=useSession();



const handleAdd = async (product) => {
  const session = await getSession();
  if (!session) {
    signIn();
    return;
  }

  setLoading(true); // Start loading animation

  try {
    


      const { data } = await axios.post("/api/auth/addCart", {
      user: session.user.email,
      id: product._id, // Product ID
      title: product.title,
      author: product.author,
      price: product.price,
      discount: product.discount,
      category_name: product.category_name,
      image: product.image,
      quantity: 1,
    });


    
    setTimeout(() => {
      
      setLoading(false); // Stop loading animation

    }, 200); // Adjust delay to match loading animation timing
  } catch (error) {
    console.error("Error adding product to cart:", error);
    setLoading(false); // Stop loading if there's an error
  }
};
 
  const handleImage=(e)=>
  {
    setLoading(true);
  router.push(`/product/${product._id}`).then(() => {
    setLoading(false); 
  }
  );
 
  }


  const handleAddToCart=()=>
  {
setLoading(true);
    dispatch(addToCart(product))
    setTimeout(()=>
    
    setLoading(false),1000)
  }
 
   
     if(product.category_name===selected)

      
 {return (<>
{  loading && <DotLoader loading={loading}/> }
    <div className={styles.cardCategory}>
      <div className={styles.container}>
        <div onClick={handleImage}>
        <img src={product.image}></img> 
        <div className={styles.title}>{product.title}</div>
    
     
       <div className={styles.author}>{product.author}</div> 
       </div>
       <div>{(product.price-(product.price/100 *product.discount)).toFixed(2)}€</div>
        <button className={styles.btn_universal}
        onClick={()=>handleAdd(product)}>Buy </button>
      </div>
    </div>
    </>
  );}
}

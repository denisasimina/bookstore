import Footer from "../../components/footer";
import Header from "../../components/header";
import Product from "../../models/Product";
import Category from "../../models/Category";
import db from "../../utils/db";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import DotLoader from "../../loaders";
import { addToCart } from "../../store/cartSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Signin from "../signin";
import axios from "axios";
import Axios from 'axios';
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Cart from "../../models/Cart";
import SwiperComp from "../../components/Home/Main/swiper";
export default function ProductPage({ products,carts }) {
  const url = window.location.href;
  const parts = url.split("/");
  const id = parts[parts.length - 1];
  const [loading,setLoading]=useState(false);
  const dispatch = useDispatch();
  
  const router=useRouter();

  const handleAddToCart = () => {

  setLoading(true)
 
    {dispatch(addToCart(product));

    setTimeout(()=>
    setLoading(false),200)}
   
  };
 
  const product = products.find((obj) => obj._id === id);

  const handleAdd = async (product) => {

    const session = await getSession();
    setLoading(true)
    if (session) {
      try {
        const { data } = await axios.post("/api/auth/addCart", {
          user:session.user.email,
          id: product._id, // ID-ul produsului
          title: product.title,
          author: product.author,
          price: product.price,
          discount:product.discount,
          category_name:product.category_name,
          image:product.image,
          quantity:1
        });
       
        setTimeout(()=>
          setLoading(false),200)
  
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }


      
    } else {
      signIn(); // Redirecționează utilizatorul la pagina de autentificare
    }
  };
  
  



  return (
    <>
    {loading && <DotLoader loading={loading}/>}
    <div>
      <Header carts={carts} />
      <div className={styles.productPage}>
        <div className={styles.container}>
          <div className={styles.image}>
            <img src={product.image}></img>
          </div>
          <div className={styles.summary}>
            <h2>{product.title}</h2>
            <h2>{product.author}</h2>
            {product.summary?(<p>
            { product.summary}
            </p>):(<p>summary</p>)}
          </div>

          <div className={styles.details}>

            <div className={styles.container}>

              <div className={styles.price}>
              <span>{(product.price-product.price/100*product.discount).toFixed(2)}</span>
                
                <span>EUR</span>
              </div>

              <div className={styles.priceDiscount}>
              <span>{product.price}</span>
                <span>EUR</span>
              </div>

           
              <div className={styles.button}>
                <button className={styles.btn_universal}
       
                onClick={() => handleAdd(product)}>Buy</button>
              </div>



              <div className={styles.details}>

<h3>Product Details</h3>

                <div>
                  <span>Category:</span>
                  <span>{product.category_name}</span>
                </div>

                <div>
                  <span>Author:</span>
                  <span>{product.author}</span>
                </div>

                <div>
                  <span>Publisher:</span>
                  {product.publisher?
                  (<span>{product.publisher}</span>):
                  (<span>Publisher</span>)}
                </div>
                <div>
                  <span>Edition:</span>
                  {product.edition?
                  (<span>{product.edition}</span>)
                  :(<span>Edition</span>)}
                </div>
                <div>
                <span>Dimensions:</span>
                  {product.dimensions?
                  (    <span>{product.dimensions}</span>     ):
              
                  (<span> dim</span>)

}
                </div>

                <div>
                  <span>Pages:</span>

                  {product.pages?
                   (<span>{product.pages}</span> ):
                
                  (<span>pages</span>)

}
                </div>
            

                <div>
                  <span>Language:</span>
                  <span> English</span>
                </div>


                <div>
                  <span>Publication Year:</span>

                  {
                    product.year?
                    (<span>{product.year}</span>):
                  (<span>2003</span>)}
                </div>


                
              </div>



            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
    </>
  );
}



export async function getServerSideProps() {
  db.connect_Db();

  let products = await Product.find().sort({ createdAt: -1 }).lean();
  let categories = await Category.find().sort({ createdAt: -1 }).lean();
  let carts=await Cart.find().sort({ createdAt: -1 }).lean();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
      carts:JSON.parse(JSON.stringify(carts)),
    },
  };
}

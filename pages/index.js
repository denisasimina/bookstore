
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/header'
import Footer from '../components/footer'
import Cart   from '../models/Cart';
import { useSession, signIn, signOut } from "next-auth/react";
import Main from '../components/Home/Main';
import Product from '../models/Product';
import Category from '../models/Category';
import db from '../utils/db';
//  import Cart from "../models/Cart";
import FlashDeals from '../components/Home/FlashDeals';





export default function Home({ products ,categories}) {

 const { data: session } = useSession()
 console.log(session)

  return (
    <>
<Header/>



<div className={styles.home}>

<Main products={products} 
 categories={categories}/>

<FlashDeals/>
</div>

<Footer/>

</>
  )
}


export async function getServerSideProps(){
db.connect_Db();

let products= await Product.find().sort({createdAt:-1}).lean();
let categories= await Category.find().sort({createdAt:-1}).lean();
let carts= await Cart.find().sort({createdAt:-1}).lean();

//let carts = await Cart.findOne({ email: session.user.email }).lean();
return{
  props:{
    products:JSON.parse(JSON.stringify(products)),
    categories:JSON.parse(JSON.stringify(categories)),
     carts:JSON.parse(JSON.stringify(carts))
  }
}
 }
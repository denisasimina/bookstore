import Image from 'next/image'

import Header from '../../components/header'
import Footer from '../../components/footer'

import { useSession, signIn, signOut } from "next-auth/react";
import Main from '../../components/Home/Main';
import Product from '../../models/Product';
import Category from '../../models/Category';
import db from '../../utils/db';
import FlashDeals from '../../components/Home/FlashDeals';
import Menu from '../../components/category/menu';
import Cart from '../../models/Cart';
;

export default function Categories({categories, selected,products,carts}) {
  const url = window.location.href;
  const parts=url.split("/");
  const lastpart=parts[parts.length-1];
  const selected_category=lastpart.replace(/%20/g, ' ');

  return (
<>
<Header carts={carts}/>

<Menu categories={categories}
 selected={selected_category}
 products={products}/>

<Footer/>

</>
  );
}
export async function getServerSideProps(){
    db.connect_Db();
    
    let products= await Product.find().sort({createdAt:-1}).lean();
    let categories= await Category.find().sort({createdAt:-1}).lean();
    let carts=await Cart.find().sort({ createdAt: -1 }).lean();
    return{
      props:{
        products:JSON.parse(JSON.stringify(products)),
        categories:JSON.parse(JSON.stringify(categories)),
        carts:JSON.parse(JSON.stringify(carts)),
      }
    }
     }
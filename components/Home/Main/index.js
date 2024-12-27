import styles from "./styles.module.scss";

import SwiperComp from "./swiper";
import Offers from "./offers";

import { useState } from "react";
import Category from "../Category";
import Menu from "../../category/menu";
export default function Main({products,categories}) {

//  const [selectedCategory,setSelectedCategory]=useState("");
  

//   const handleCategoryChange=(category)=>{
//   setSelectedCategory(category);
// console.log(category)}
 
  return (


  <>
<div className={styles.main}>
          <div className={styles.container_}>
        <div className={styles.header}></div>
      <Menu categories={categories} className={styles.menu}/>
      {/* <div className={styles.menu}></div> */}
      <SwiperComp className={styles.swiper} />
      <Offers className={styles.offers} />
      {/* <div className={styles.swiper}></div> */}
      {/* <div className={styles.offers}></div> */}

    
        </div>
        </div>

       
        
     
    </>
  );
}

   {/* {selectedCategory?
        (<><div className={styles.category}>
          
          <div className={styles.container}>
          <div className={styles.header2}>header</div>
          <Menu onCategoryChange ={handleCategoryChange} categories={categories}className={styles.menu} />
          <Category
           category={selectedCategory} 
           products={products} 
           selected={selectedCategory}
           
           className={styles.category}/>
          </div>
          </div>
          </>
        ):
        ( <>

          <div className={styles.main}>
          <div className={styles.container_}>
        <div className={styles.header}>header</div>
        <Menu onCategoryChange ={handleCategoryChange} categories={categories} className={styles.menu} />
        <SwiperComp className={styles.swiper} />
        <Offers className={styles.offers} />

        <div className={styles.user}>user</div>
        </div>
        </div>

        </> )
} */}
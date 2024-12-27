import styles from "./styles.module.scss";
import { menuArray } from "../../../data/home";
import { useState } from "react";


export default function Menu({ onCategoryChange,categories,}) {
const [category,setCategory]=useState("");
console.log(categories)


const OnCategory=(e)=>{
  
  setCategory(e.target.textContent);
  onCategoryChange(e.target.textContent); 

}



  return (
    <div className={styles.menu}>
      <h4 className={styles.menu_title}>Menu</h4>

      <ul>
        {categories.map((item) => (
          <li onClick={OnCategory} 
         
          className={styles.item}
          >{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

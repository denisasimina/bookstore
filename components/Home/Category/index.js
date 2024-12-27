import CardProduct from "./cardProduct";
import styles from "./styles.module.scss";
import db from "../../../utils/db";
// import Product from "../../../models/Product";

export default function Category({ category,products,selected }) {
  console.log(products)
  
    return (
        <div className={styles.category}>
            <h1>{category}</h1>
            <div >
                <ul className={styles.container}>
                 
                  {
                  products.map((product)=>
                  (
                  <CardProduct 
                  key={product._id} 
                  product={product}
                  selected={selected} />  )
                )}
                    
                   
                   
                  </ul>
                  
            </div>
        </div>
    );
}


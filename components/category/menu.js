import { useRouter } from "next/router";
import styles from "./styles.module.scss";
import { useState } from "react";
import CardProduct from "../Home/Category/cardProduct";

export default function Menu({ categories, selected, products }) {
 const [category,setCategory]=useState("");
  const router = useRouter();
  
  // onQuantityChange(7);
  const HandleChange = (e) => {

 setCategory( e.target.textContent);

    router.push(`/category/${e.target.textContent}`);
  };

  return (
    <>
      {selected ? (
        <div className={styles.category}>
          <div className={styles.container}>
            <div className={styles.menu}>
              <div className={styles.menu_container}>
                <h4 className={styles.menu_title}>Menu</h4>

                <ul>
                  {categories.map((item) => (
                    <li
                      key={item.name} // Important să adaugi key pentru fiecare item din listă
                      className={styles.item}
                      onClick={HandleChange}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.header2}>{selected}</div>
            <div className={styles.category}>
            {products.map((product) => (
              <CardProduct
              key={product.id}
                product={product}
                selected={selected}
                // onQuantityChange={onQuantityChange}
              />
            ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.menu}>
          <div className={styles.menu_container}>
            <h4 className={styles.menu_title}>Menu</h4>

            <ul>
              {categories.map((item) => (
                <li
                key={item.id || item.name}
                  // key={item.name} 
                  className={styles.item}
                  onClick={HandleChange}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

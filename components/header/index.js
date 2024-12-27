import styles from "./styles.module.scss";
import Top from "./Top";
import Ad from "./ad";
import MenuSearch from "./MenuSearch";
import { useEffect } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
export default function Header({carts,quantity}) {



//  console.log(quantity)
//  const [cartQuantity, setCartQuantity] = useState(quantity || 0); // Initialize with the passed quantity

//  // Function to update quantity dynamically
//  const updateCartQuantity = () => {
//    if (session && session.user && session.user.email) {
//      const userCart = carts.find((cart) => cart.user === session.user.email);
//      setCartQuantity(userCart ? userCart.totalQuantity : 0); // Update quantity based on cart
//    }
//  };

//  useEffect(() => {
//    updateCartQuantity();
//  }, [carts, session]); // Run whenever carts or session changes







    return (
  
 <header className={styles.header}>
    <Ad/>
 <Top carts={carts} quantity={quantity}/>
 {/* <MenuSearch/> */}
 </header>
     
    );
  }
  
import { useState } from "react";
import styles from "./styles.module.scss";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function Order({index,cart}) {
  const [arrow, setArrow] = useState(false); 

  console.log(cart,"from order")
console.log(index,"hhhhhhhhhhhhhhhhhhhhh")
  const handleArrow = () => {
    setArrow(true); 
  };

  const handleNonArrow = () => {
    setArrow(false);
  };
  index=index+1;

  const dateObject = new Date(cart.createdAt);
  const dateOnly = dateObject.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD
  console.log(dateOnly,"kkkkkkkkkkkkkkkkkkhgf");
  return (
    <>
    <div className={styles.order}>
      {arrow ? (
        <div className={styles.container}>
        
          <div className={styles.row}>
            <div>
            
              <span>{index}.</span>
            </div>
            <span>{dateOnly}</span>
            <div>
              <span>{cart.totalProducts}</span>
              <span>products</span>
            </div>
            <div>
              <span>Total</span>
              <span>{cart.totalPrice}€</span>
            </div>
            <IoIosArrowUp onClick={handleNonArrow} /> {/* Arrow up when details are shown */}
          </div>
          <div className={styles.details}>

  
            <p>Payment: Cash</p>
            <p>Order Status: {cart.status}</p>
            <div className={styles.products}>
             <ul>


            
              {
                cart.products.map((item,index)=>
                (<li  key={item.id || itemIndex}> 
                  

                    <div>
                    <span>{index+1}.</span>
                        <span>{item.title}</span>
                        <span>{item.author}</span>
                        <span>{item.quantity}</span>
                        <span>{(item.price-(item.price/100 * item.discount)).toFixed(2)}€</span>
                        <div className={styles.imageWrapper}><img src={item.imageUrl}></img></div>
                    </div>
                </li>))

              
}

              



             </ul>

            </div>
          </div>
        </div>
      ) : (
       
        <div className={styles.container}>
          <div className={styles.row}>
  

            <div>
              <span></span>
              <span>{index}.</span>
            </div>
            <span>{dateOnly}</span>
            <div>
            
              <span>{cart.totalProducts}</span>
              <span>Products</span>
            </div>
            <div>
              <span>Total</span>
              <span>{cart.totalPrice}€</span>
              
            </div>

            <IoIosArrowDown onClick={handleArrow} /> {/* Arrow down when details are hidden */}
          
           
          </div>
        </div>
      )}
      </div>
    </>
  );
}

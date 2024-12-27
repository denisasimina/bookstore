import Footer from "../../components/footer";
import Header from "../../components/header";
import styles from "./styles.module.scss";
import db from "../../utils/db";
import Cart from "../../models/Cart";
import Product from "../../models/Product";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DotLoader from "../../loaders";
import axios from "axios";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import calculateTotal from "./cartSum"; // Importă funcția de calcul
import { useRouter } from "next/router";

import Image from "next/image";

export default function Cart_Comp({ carts, products}) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [cartUser, setCartUser] = useState([]);
  const [total, setTotal] = useState({ quantity: 0, sum: 0, saved: 0 });
  const [quantity, setQuantity] = useState(0);

console.log(total,"junnnnnne");
   const router=useRouter();

   const redirect=()=>{

    router.push("/order/order")
   }

  useEffect(() => {
    if (session) {
      const userCart = carts.find((cart) => cart.user === session.user.email);
      if (userCart) {
        setCartUser(userCart.items);
        setQuantity(userCart.totalQuantity);
      } else {
        setCartUser([]);
        setQuantity(0);
        
      }
    }
  }, [session, carts]);

  useEffect(() => {
    if (cartUser.length) {
      const updatedTotalQuantity = cartUser.reduce((acc, item) => acc + item.quantity, 0);
      setQuantity(updatedTotalQuantity);
    } else {
      setQuantity(0);
    }
  }, [cartUser]);

  useEffect(() => {
    const { quantity, sum, saved } = calculateTotal(cartUser);
    setTotal({ quantity, sum, saved });
  }, [cartUser]);

  const handleRemoveFromCart = async (id) => {
    setLoading(true);
    if (session) {
      try {
        const { data } = await axios.delete('/api/auth/delete', {
          data: {
            user: session.user.email,
            productId: id,
          },
        });
        if (data.updatedCart) {
          setCartUser(data.updatedCart.items);
        }
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    }
    setLoading(false);
  };

  const handleIncrement = async (productId) => {
    setLoading(true);

    const updatedCart = cartUser.map((item) => {
      if (item.productId === productId) {
        item.quantity += 1;
      }
      return item;
    });

    setCartUser(updatedCart);

    const updatedTotalQuantity = updatedCart.reduce((acc, item) => acc + item.quantity, 0);

    if (session) {
      try {
        const { data } = await axios.put('/api/auth/increment', {
          user: session.user.email,
          productId,
          action: "increment",
          totalQuantity: updatedTotalQuantity,
        });

        if (data.updatedCart) {
          setCartUser(data.updatedCart.items);
          setQuantity(updatedTotalQuantity);
        }
      } catch (error) {
        console.error("Error incrementing item in cart:", error);
      }
    }

    setLoading(false);
  };

  const handleDecrement = async (productId) => {
    setLoading(true);

    const updatedCart = cartUser.map((item) => {
      if (item.productId === productId && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });

    setCartUser(updatedCart);

    const updatedTotalQuantity = updatedCart.reduce((acc, item) => acc + item.quantity, 0);

    if (session) {
      try {
        const { data } = await axios.put('/api/auth/increment', {
          user: session.user.email,
          productId,
          action: "decrement",
          totalQuantity: updatedTotalQuantity,
        });

        if (data.updatedCart) {
          setCartUser(data.updatedCart.items);
          setQuantity(updatedTotalQuantity);
        }
      } catch (error) {
        console.error("Error decrementing item in cart:", error);
      }
    }

    setLoading(false);
  };

  return (
    <>
      {loading && <DotLoader loading={loading} />}
      <Header carts={carts} quantity={quantity} />
      {session ? (
        total.quantity ? (
          <div className={styles.container}>
            <h1>Shopping Cart</h1>
            <div className={styles.row}>
              <div className={styles.list}>
                <ul>
                  {cartUser.map((item, index) => (
                    <li key={index}>
                      <div className={styles.items}>
                        <img src={item.image} alt={item.title} />
                        <div>{item.title}</div>
                        <div>{item.author}</div>
                        <div>{(item.price - (item.price * item.discount) / 100).toFixed(2)}</div>
                        <div className={styles.changeBtn}>
                          <span className={styles.number}>{item.quantity}</span>
                          <div className={styles.arrows}>
                            <IoMdArrowDropup onClick={() => handleIncrement(item.productId)} />
                            <IoMdArrowDropdown onClick={() => handleDecrement(item.productId)} />
                          </div>
                        </div>
                        <button
                          className={styles.btn_universal}
                          onClick={() => handleRemoveFromCart(item._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.summary}>
                <div>Order Summary</div>
                <ul>
                  <li>
                    <span>Products</span>
                    <span>{quantity}</span>
                  </li>
                  <li>
                    <span>Delivery:</span>
                    <span>6$</span>
                  </li>
                  <li>
                    <span>You saved</span>
                    <span>{total.saved.toFixed(2)}$</span>
                  </li>
                  <li>
                    <span>Total</span>
                    <span>{total.sum.toFixed(2)}$</span>
                  </li>
                </ul>
                <button className={styles.btn_universal} onClick={()=>redirect()}>Next step</button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.EmptyCart}>
            <h1>Your cart is empty. Let’s fill it with some great books!</h1>
            <img src="/cart0.png" className={styles.image} alt="Empty Cart" />
          </div>
        )
      ) : (
        <h1>You are not logged in</h1>
      )}
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  await db.connect_Db();

  let carts = await Cart.find().sort({ createdAt: -1 }).lean();
  let products = await Product.find().sort({ createdAt: -1 }).lean();

  return {
    props: {
      carts: JSON.parse(JSON.stringify(carts)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

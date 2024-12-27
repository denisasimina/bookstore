import Header from "../../components/header";
import Footer from "../../components/footer";
import MyOrder from "../../models/MyOrder";
import styles from "./styles.module.scss";
import Order from "../../components/order/order";
import db from "../../utils/db";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";

export default function MyOrders({ myorder }) {
    const { data: session } = useSession();
    console.log(myorder.carts, "ppppppppppppp");

    return (
        <>

        
            <Header />
            {myorder.carts?(<>
            
                <div>
            <div className={styles.myorder}>
                <div className={styles.container}>
                    <h1>My Orders</h1>
                    <ul>
                        {myorder.carts.map((cart,index) => (
                            <Order index={index} cart={cart} />
                        ))}
                    </ul>
                </div>
            </div>
            </div></>):
        
        (<>
        <div className={styles.empty}>
        <h1>
            My Order
        </h1>
        <h2>No orders available.</h2>
        <div className={styles.image}><img src="/pack.png"></img></div>
        </div>
        </>)}
        
            <Footer />
        </>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        };
    }

    await db.connect_Db();
    let myorder = await MyOrder.findOne({ email: session.user.email }).lean();
  
    return {
        props: {
            myorder: JSON.parse(JSON.stringify(myorder)),
        },
    };
}

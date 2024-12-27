import Link from 'next/link';
import styles from "./styles.module.scss";

export default function Ad() {
    return (
        <div className={styles.adContainer}>
            <Link href="/">
                <div className={styles.ad}>
                    <h1>BookHouse</h1>
                    <img src="/logo.png" alt="Logo" className={styles.logo} />
                </div>
            </Link>
        </div>
    );
}
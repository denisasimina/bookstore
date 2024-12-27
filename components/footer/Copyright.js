import styles from "./styles.module.scss";
import Link from "next/link";

export default function Copyright() {
    return (
        <div className={styles.copyright}>
            <div className={styles.copyright_container}>
                <ul>
                    {data.map((link, index) => (
                        <li key={index}>
                            <Link href={link.link}>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

const data = [
    { name: "Privacy Policy", link: "" },
    { name: "Privacy & Cookies", link: "" },
    { name: "Manage Cookies", link: "" },
    { name: "Terms of Service", link: "" },
    { name: "Accessibility Statement", link: "" },
];

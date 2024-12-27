import styles from "./styles.module.scss";

import { ClipLoader } from "react-spinners";
export default function DotLoader(loading){
    return <div className={styles.loader}>
        <ClipLoader color="blue" loading={loading}></ClipLoader>
    </div>
}

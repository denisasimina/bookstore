import styles from "./styles.module.scss";
export default function Menu2({categories})
{

return(
<>
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
</>


    );
}
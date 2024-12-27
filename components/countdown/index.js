import { useState } from "react";
import styles from "./styles.module.scss";
import diferenceTime from "./diferenceTime";
import dayjs from "dayjs";
import { useEffect } from "react";

const initialTime={
days:"00",
hours:"00",
minutes:"00",
seconds:"00",


}

export default function Countdown({date}) {
const [time,setTime]=useState(initialTime)
const dateCurrent=dayjs();
const dateNext=dayjs(date);
const duration= diferenceTime(dateNext,dateCurrent)
// console.log(duration)

const calculateTime=()=>{
  const duration = diferenceTime(dateNext, dateCurrent);
  setTime({
    days: String(duration.days).padStart(2, "0"),   // Adaugă 0 înaintea numerelor mai mici de 10
    hours: String(duration.hours).padStart(2, "0"),
    minutes: String(duration.minutes).padStart(2, "0"),
    seconds: String(duration.seconds).padStart(2, "0"),
  });

}

useEffect(() => {
  const interval = setInterval(() => {
    calculateTime();
  }, 1000);

  // Curăță intervalul când componenta este dezasociată
  return () => clearInterval(interval);
}, [dateNext]); 

  //  console.log(duration);


   const data=
   {


   }



  return (
    <div className={styles.countdown}>


    
      <span>{~~(duration.hours/10)}</span>
      <span>{duration.hours%10}</span>
      <b>:</b>
      <span>{~~(duration.minutes/10)}</span>
      <span>{duration.minutes%10}</span>
  
      <b>:</b>
      <span>{~~(duration.secondsRemaining/10)}</span>
      <span>{duration.secondsRemaining%10}</span>
   
    </div>
  );
}

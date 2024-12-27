import "swiper/css";
import "swiper/css/navigation";
import styles from "./swiper2.module.scss"; // Asigură-te că fișierul SCSS este importat după

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { flashDealsArray } from "../../../data/home";
import { useRouter } from "next/router";
import { images } from "../../../data/home";
import { DotLoader } from "react-spinners";
export default function Offers() {
  const swiperRef = useRef(null);
  const router=useRouter();

const[loading,setLoading]=useState(false)
  
 const handleImage = (id)=>
 {
  
   router.push(`/product/${id}`)
  // setLoading(true);
  // router.push(`/product/${id}`).then(() => {
  //   setLoading(false); 
  // }
  // )
 }
  return (
    <>
    {loading && <DotLoader loading={loading}/>}
    <div className={styles.offers_container}>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={4}
        loop={true}
        navigation={{
          nextEl: ".custom_next", // Legăm butonul "Next"
          prevEl: ".custom_prev", // Legăm butonul "Prev"
        }}
        modules={[Navigation]}
        grabCursor={true}
        className={styles.swiper1}
      >
        {images.map((book) => (
          <SwiperSlide key={book._id}>
            <img src={book.image} onClick={()=>handleImage(book._id)}/>
          </SwiperSlide>
        ))}
       
      </Swiper>
      <div className={
        styles.custom_prev}
        onClick={() => {
          swiperRef.current?.slidePrev();
        }
      }>
        <IoIosArrowBack />
      </div>

      <div
        className={styles.custom_next}
        onClick={() => {
          swiperRef.current?.slideNext();
        }}
      >
        <IoIosArrowForward />
      </div>
    </div>
    </>
  );
}



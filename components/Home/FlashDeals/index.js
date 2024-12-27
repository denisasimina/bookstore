import Countdown from "../../countdown";
import styles from "./styles.module.scss";
import  { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';

import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import FlashCards from "./cards";
import { flashDealsArray } from "../../../data/home";

export default function FlashDeals() {

   
  return (
    <div className={styles.container}>
      <div className={styles.flashDeals}>
        <div className={styles.flashDeals_header}></div>
        <h1>Flash sale</h1>
        <Countdown className={styles.countdown}  date={new Date(2025,5,20)}

         />
      </div>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        loop={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation]} 
        className="mySwiper"
      >

<div className={styles.flashDeals_list}>

    {
        flashDealsArray.map((product=>
        ( 
            <SwiperSlide key={product._id}>
                <FlashCards 
                product={product} />
                {/* <FlashCards product={product} key={i}/> */}
            </SwiperSlide>
           
        )
        ))
    }

</div>


      </Swiper>
  
      
    </div>
  );
}

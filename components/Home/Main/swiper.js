import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';


export default function SwiperComp() {
  return (
    <div className={styles.myswiper}>
      <Swiper navigation={true}
       modules={[Navigation]}
       loop={true} 
       className={styles.mySwiper}>

                <SwiperSlide><img src="./b1.png"/></SwiperSlide>
                <SwiperSlide><img src="./b5.png"/></SwiperSlide>

        <SwiperSlide><img src="./booksCover.jpg"/></SwiperSlide>

        <SwiperSlide><img src="./fairBook.png"/></SwiperSlide>
        
       
      </Swiper>
    </div>
  );
}

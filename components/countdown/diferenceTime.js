import dayjs from "dayjs";

import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export default function diferenceTime(dateNext,dateCurrent)
{



   
    const diference = dateNext.diff(dateCurrent, 'seconds');

    
    const durationObj = dayjs.duration(diference, 'seconds');


    const years = durationObj.years();
    const months = durationObj.months();
    const days = durationObj.days();
    const hours = durationObj.hours();
    const minutes = durationObj.minutes();
    const secondsRemaining = durationObj.seconds();

   
    const monthsInDays = months * 30;  
    const totalDays = days + monthsInDays;

    return {
        years,
        totalDays,
        hours,
        minutes,
        secondsRemaining,
    };

}




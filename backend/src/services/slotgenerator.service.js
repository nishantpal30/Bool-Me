import Availability from "../db/models/avalability.js";
import Booking from "../db/models/booking.js";
import { timeOverlap } from "../utils/overlap.js";
import { getDayofWeek ,minutesTotime,timeTOminutes} from "../utils/time.js";

export const generateSlots = async ({userId,service,date})=>{
    const dayofWeek = getDayofWeek(date);
    const availability = await Availability.findOne({userId,dayofWeek});
    if(!availability || availability.slots.length===0){
        return [];
    };
    const bookings = await Booking.find({
        userId,
        date,
        $or:[
            {status:"confirmed"},
            {
                status:"pending_payment",
                createdAt:{$gte:new Date(Date.now()-30*60*1000)},
            },
        ],

    });
    const slots = [];
    availability.slots.forEach((window)=> { 
        let cursor = timeTOminutes(window.startTime);
        const end = timeTOminutes(window.endTime);
        while(cursor+service.duration <= end){
            const startTime = minutesTotime(cursor);
            const endTime = minutesTotime(cursor + service.duration);
            const hasconflict = bookings.some((booking)=>{
               return timeOverlap(startTime,endTime,booking.startTime,booking.endTime)
            });
            if(!hasconflict){
                slots.push({startTime,endTime});
            }
            cursor +=service.duration;
        }
    }) ;
    return slots;

   
}
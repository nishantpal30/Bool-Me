import { timeTOminutes } from "./time.js";
export const timeOverlap = (firstStart , firstEnd, secondStart,secondEnd)=>{
    return timeTOminutes(firstStart)<timeTOminutes(secondEnd) && timeTOminutes(firstEnd)>timeTOminutes(secondStart);
};
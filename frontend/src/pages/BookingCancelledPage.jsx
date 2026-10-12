import { useEffect } from "react";
import { Link,useSearchParams } from "react-router-dom";
import { cancelPublicBookingPayments } from "../api/public";
import { XCircle,ArrowLeft } from "lucide-react";
import { bookingCancelledPageStyles as s } from "../utils/dummystyle";



const BookingCancelledPage = () => {
    const [searchParams] = useSearchParams();
    useEffect(()=>{
        const bookingId = searchParams.get("booking_id");
        if(bookingId){
            cancelPublicBookingPayments(bookingId).catch(()=>{})
        }
    })
  return (
    <div className={s.container}>
        <main className={s.card}>
            <div className={s.iconCircle}>
                <XCircle className={s.icon} />
            </div>
            <p className={s.statusLabel}>Payment cancelled</p>
            <p className={s.heading}>Your booking was not confirmed</p>
            <p className={s.description}>
                No payment was complete.You can return to the booking page and choode a slot again.
            </p>
            <Link to={searchParams.get("slug") ?`/book/${searchParams.get("slug")}`:"/"} className={s.homeLink}><ArrowLeft  className={s.homeLinkIcon}/></Link>
        </main> 

      
    </div>
  )
}

export default BookingCancelledPage

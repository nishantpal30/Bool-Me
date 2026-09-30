

const toGoogleDateTime = (date,time) =>{
    return `${date.replaceAll("-"," ")}T${time.replace(":"," ")}`;
};

export const buildCustomerCalendar = ({business,service,booking}) =>{
    const params = new URLSearchParams({
        action:"TEMPLATE",
        text:`${service.name} with ${business.businessName || business.name}`,
        dates:`${toGoogleDateTime(booking.date,booking.startTime)}/${toGoogleDateTime(booking.date,booking.endTime)}`

    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
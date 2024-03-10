import {differenceInDays, format} from "date-fns";

export default function BookingDates({booking}) {
  return (
    <div className={""}>
      
      <div className=" font-bold border-gray-400  ">
                  {format(new Date(booking.cin), 'yyyy-MM-dd')} &rarr; {format(new Date(booking.cout), 'yyyy-MM-dd')}
                </div>
                <div>
                  <span className=" font-bold">No. of nights: {differenceInDays(new Date(booking.cout), new Date(booking.cin)) }</span>
                </div>
    </div>
  );
}
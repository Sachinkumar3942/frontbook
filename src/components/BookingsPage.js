import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AccountNav from "./AccountNav";
import axios from "axios";
import { differenceInDays, format } from "date-fns";
import PlaceImg from "./PlaceImg";
const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  // const { id } = useParams();
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link to={`/account/bookings/${booking._id}`} className=" flex my-2 overflow-hidden gap-4 bg-gray-200 rounded-xl">
              <div className=" w-48">
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-2 grow pr-2">
                <h2 className=" text-xl truncate">{booking.place.title}</h2>
                <div className=" border-t font-bold border-gray-400 pt-3 ">
                  {format(new Date(booking.cin), 'yyyy-MM-dd')} &rarr; {format(new Date(booking.cout), 'yyyy-MM-dd')}
                </div>
                <div>
                  <span className=" font-bold">No. of nights: {differenceInDays(new Date(booking.cout), new Date(booking.cin)) }</span>
                </div>
                <div className=" flex">
                <span className="text-l font-bold">Total Price</span> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
{booking.price}
              </div>
              </div>
              
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;

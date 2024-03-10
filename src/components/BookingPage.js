import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceGallery from "./PlaceGallery";
import AddressLink from "./AddressLink";
import BookingDates from "./BookingDates";
const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);
  if (!booking) {
    return "";
  }
  return (
    <div className=" mt-4 ">
      <h1 className="mb-4 text-xl font-bold">{booking.place.title}</h1>
      <AddressLink>{booking.place.address}</AddressLink>
      <div className=" bg-gray-200 p-4 mb-4 rounded-2xl">
        <div className=" flex  items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Your Booking Information</h2>
            Dates: <BookingDates booking={booking} />
          </div>
          <div className=" bg-orange-600 p-2 rounded-2xl text-white">
            <div className=" font-bold pr-4">Total Price</div>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              {booking.price}
            </div>
          </div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
};

export default BookingPage;

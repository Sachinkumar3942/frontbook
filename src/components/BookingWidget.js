import React, { useState } from "react";
import { differenceInDays, parseISO } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookingWidget = ({ place }) => {
  const [cin, setCin] = useState("");
  const [cout, setCout] = useState("");
  const [guests, setGuests] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [redirect,setRedirect]=useState('');
  const Navigate=useNavigate();
  const handleBooking=async ()=>{
    const data={cin,cout,guests,name,number,email,place:place._id,price:place.price*differenceInDays(new Date(cout), new Date(cin)) }
    const val =await axios.post('/bookings',data);
    const bookingId = val.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }
  if(redirect){
    Navigate(redirect)
  }
  return (
    <div>
      <div className=" bg-white shadow-xl p-4 rounded-2xl">
        <h2 className=" pb-4 text-md item-center justify-center flex font-bold">
          Price:
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5A.75.75 0 0 0 9 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 0 0 9 12h3.622a2.251 2.251 0 0 1-2.122 1.5H9a.75.75 0 0 0-.53 1.28l3 3a.75.75 0 1 0 1.06-1.06L10.8 14.988A3.752 3.752 0 0 0 14.175 12H15a.75.75 0 0 0 0-1.5h-.825A3.733 3.733 0 0 0 13.5 9H15a.75.75 0 0 0 0-1.5H9Z"
              clipRule="evenodd"
            />
          </svg>
          {place.price} / per night
        </h2>
        <div className=" flex flex-col mb-4 border rounded-xl">
          <div className=" border-b-2  flex items-center justify-center my-2">
            <div className="    px-4 ">
              <label for="in">Check In: </label>
              <input
                id="in"
                onChange={(e) => setCin(e.target.value)}
                value={cin}
                type="date"
              />
            </div>
            <div className="    px-4 ">
              <label for="out">Check Out: </label>
              <input
                id="out"
                onChange={(e) => setCout(e.target.value)}
                value={cout}
                type="date"
              />
            </div>
          </div>
          <div className=" pl-4 pb-4">
            <label for="guest">Guests: </label>
            <input
              id="guest"
              onChange={(e) => setGuests(e.target.value)}
              value={guests}
              type="number"
              placeholder="2"
            />
          </div>
        </div>
        {differenceInDays(new Date(cout), new Date(cin)) > 0 && (
          <div>
            <div className=" border mb-1 border-gray-300 rounded-xl py-2   px-4 ">
              <label for="name">Name: </label>
              <input
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Enter name ..."
              />
            </div>
            <div className=" border  border-gray-300 mb-1 rounded-xl py-2   px-4 ">
              <label for="email">Email: </label>
              <input
                id="name"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter email ..."
              />
            </div>
            <div className=" border border-gray-300 rounded-xl py-2 mb-3   px-4 ">
              <label for="number">Phone: </label>
              <input
                id="number"
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                type="number"
                placeholder="Enter your phone ..."
              />
            </div>
            
          </div>
        )}

        <button onClick={handleBooking} className=" w-full py-2 rounded-3xl bg-orange-400">
          Book An Order
          {cin &&
            cout &&
            differenceInDays(new Date(cout), new Date(cin)) > 0 && (
              <span className=" flex items-center justify-center">
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
                {differenceInDays(new Date(cout), new Date(cin)) * place.price}
              </span>
            )}
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;

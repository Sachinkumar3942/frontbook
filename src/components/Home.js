import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/allPlaces").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="mt-8  gap-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/"+place._id} className=" ">
            <div className=" mb-3 rounded-2xl flex bg-gray-500">
              {place.photos?.[0] && (
                <img
                  className=" rounded-2xl object-cover aspect-square"
                  src={"http://localhost:5600/uploads/" + place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className=" font-bold">{place.address}</h2>
            <h3 className=" mb-1 text-gray-500 text-sm truncate">
              {place.title}
            </h3>
            <div className=" flex items-center ">
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
             <span className=" font-bold ">{place.price} /</span> <span> night</span> 
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Home;

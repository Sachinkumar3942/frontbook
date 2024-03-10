import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesFormPage from "./PlacesFormPage";
import AccountNav from "./AccountNav";

const PlacesPage = () => {
  const [places,setPlaces]=useState([]);
  useEffect(()=>{
    axios.get('/places').then(({data})=>{
      setPlaces(data);
    })
  },[])
    
  return (
    <div>
      <AccountNav/>
      
        <div className=" flex items-center justify-center flex-col">
       
            
          <Link
            className=" flex items-center justify-center m-auto px-4 bg-orange-600 rounded-full gap-2 text-white py-3 max-w-xl "
            to="/account/places/new"
          >
            
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
        <div>
          {places.length>0 && places.map(place=>(
            <Link to={'/account/places/'+place._id} className=" mt-5 flex gap-2  bg-gray-300 rounded-2xl px-6 py-3">
              <div className=" flex rounded-2xl grow shrink-0 w-32 h-32 bg-gray-400">
                {place.photos.length>0 && 
                  ( <img className=" rounded-2xl object-cover" src={'http://localhost:5600/uploads/'+place.photos[0]} alt="" />)
                }
              </div> 
              <div className="grow-0 shrink ">
                  <h2 className=" text-xl"> {place.title}</h2>
                  <p className="text-sm  mt-2 text-gray-600">{place.description}</p>
              </div>  
               
            </Link>
          ))}
        </div>
    </div>
  );
};

export default PlacesPage;

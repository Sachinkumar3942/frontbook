import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "./BookingWidget";
import PlaceImg from "./PlaceImg";
import PlaceGallery from "./PlaceGallery";
const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((resp) => {
      setPlace(resp.data);
    });
  }, [id]);
  if (!place) return "";

  
  return (
    <div
      className=" mt-3 pt-5 -mx-8 px-5 bg-gray-200"
      style={{ overflow: "hidden", padding: "1em" }}
    >
      <h1 className=" text-3xl ">{place?.title}</h1>
      <a
        className=" my-3 block font-semibold underline"
        target="_blank"
        href={"https://maps.google.com/?q=" + place.address}
      >
        {place.address}
      </a>
      <PlaceGallery place={place}/>

      <div className=" my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 ">
        <div className=" pl-3 pr-5">
          <h2 className=" font-semibold text-xl">Description</h2>
          <div className=" mb-4">{place.description}</div>
          <div>
            <b> Check-in: </b>
            {place.cin}
            <br />
            <b>Check-Out: </b>
            {place.cout}
            <br />
            <b>Max number of guests: </b>
            {place.guests}
          </div>
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className=" mt-6 -mx-8 -mb-8 pb-8 px-8 bg-white text-sm  text-gray-700 leading-4">
        <h2 className=" font-semibold text-black mb-2 text-xl">Extra Info:</h2>
        {place.extra}
      </div>
    </div>
  );
};

export default PlacePage;

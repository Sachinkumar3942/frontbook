import React from "react";

const PlaceImg = ({ place }) => {
  if (!place.photos?.length) return "";
  return (
    <div>
      {place.photos.length > 0 && (
        <img
          className="  object-cover"
          src={"http://localhost:5600/uploads/" + place.photos[0]}
          alt=""
        />
      )}
    </div>
  );
};

export default PlaceImg;

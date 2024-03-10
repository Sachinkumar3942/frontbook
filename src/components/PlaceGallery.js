import React, { useState } from "react";

const PlaceGallery = ({place}) => {
    const [display, setDisplay] = useState(false);
    if (!place) return "";

  if (display) {
    return (
      <div className=" absolute right-0 left-0 top-0 w-[100vh] bg-gradient-to-r from-blue-200 via-red-600 to-teal-500  flex flex-col items-center  min-w-full min-h-screen">
        <div className=" flex min-w-1 w-full font-bold items-center text-4xl justify-between px-8 pt-4  ">
          <div className=" text-5xl pb-4">Photos of {place.title}</div>
          <button
            onClick={() => setDisplay(false)}
            className=" flex items-center justify-center gap-2 text-4xl "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                clipRule="evenodd"
              />
            </svg>
            Close
          </button>
        </div>
        
        <div>
        {place?.photos?.length > 0 &&
          place.photos.map((photo) => (
            <div>
              <img
                className=" max-h-[100dvh] p-2 flex items-center justify-center "
                src={"http://localhost:5600/uploads/" + photo}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className=" relative">
        <div
          style={{
            display: "flex",
            maxHeight: "70dvh",
            minWidth: "90dvw",
            overflow: "hidden",
          }}
        >
          <div style={{ width: "50%", display: "flex", padding: "0.5em" }}>
            {place.photos?.[0] ? (
              <img
                onClick={() => setDisplay(true)}
                className="aspect-square object-cover cursor-pointer"
                src={"http://localhost:5600/uploads/" + place.photos[0]}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  borderTopLeftRadius: "25px",
                  borderBottomLeftRadius: "25px",
                }}
              />
            ) : (
              <img
                className="aspect-square object-cover cursor-pointer"
                src="URL_TO_DEFAULT_IMAGE"
                alt="Default Hostel Image"
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
            }}
          >
            <div
              style={{
                height: "50%",
                width: "100%",
                overflow: "hidden",
                padding: "0.5em",
              }}
            >
              {place?.photos?.[1] && (
                <img
                  onClick={() => setDisplay(true)}
                  src={"http://localhost:5600/uploads/" + place.photos[1]}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    borderTopRightRadius: "25px",
                    cursor: "pointer",
                  }}
                />
              )}
            </div>
            <div
              style={{
                height: "50%",
                width: "100%",
                overflow: "hidden",
                padding: "0.5em",
              }}
            >
              {place.photos?.[2] && (
                <img
                  onClick={() => setDisplay(true)}
                  src={"http://localhost:5600/uploads/" + place.photos[2]}
                  alt=""
                  style={{
                    cursor: "pointer",
                    width: "100%",
                    height: "100%",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: " auto",
                    borderBottomRightRadius: "25px",
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setDisplay(true)}
          className=" absolute bottom-3 flex bg-gray-200 rounded-xl p-1 right-5"
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
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Show more photos
        </button>
      </div>
    </div>
  );
};

export default PlaceGallery;

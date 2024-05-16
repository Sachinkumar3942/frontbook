import axios from "axios";
import React, { useState } from "react";

const PhotosUploader = ({ photos, onChange }) => {
  // const addPhotoByLink = async (e) => {
  //   e.preventDefault();
  // const { data: filename } = await axios.post("/upload-by-link", {
  //   link: plink,
  // });
  //   setPhotos((prev) => {
  //     return [...prev, filename];
  //   });
  //   setPlink("");
  // };

  const [plink, setPlink] = useState("");
  const uploadPhoto = (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filename } = response;
        onChange((prev) => {
          return [...prev, ...filename];
        });
      });
  };

  //   const uploadPhoto = async (e) => {
  //     const files = e.target.files;
  //         try {
  //             const formData = new FormData();
  //             for (let i = 0; i < files.length; i++) {
  //                 formData.append("photos", files[i]);
  //             }

  //             const response = await axios.post("/upload", formData, {
  //                 headers: { "Content-Type": "multipart/form-data" },
  //             });

  //             const { data: filenames } = response;
  //             setPhotos((prev) => [...prev, ...filenames]);
  //         } catch (error) {
  //             console.error("Error uploading photos:", error);
  //             // Handle error, show message to the user, etc.
  //         }

  //         // If photos is a valid URL, download the image from the link
  //         try {
  //             const response = await axios.get("/download-by-link", {
  //                 params: { link: photos },
  //             });
  //             const { data: filename } = response;
  //             setPhotos((prev) => [...prev, filename]);
  //         } catch (error) {
  //             console.error("Error adding photo by link:", error);
  //             // Handle error, show message to the user, etc.
  //         }

  // };
  const setAsMain=(filename)=>{
    let pos=0;
    for(let i=0;i<photos.length;i++){
      if(photos[i]===filename){
        pos=i;
        break;
      }
    }
    let val=photos[0];
    photos[0]=photos[pos];
    photos[pos]=val;
  }

  const removePhoto = (filename) => {
    onChange([...photos.filter((photo) => photo !== filename)]);
  };
  const addPhotoByLink = async (e) => {
    e.preventDefault();
    try {
      var formData = new FormData();
      formData.append("photos", plink);
      var response = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      response = await axios.get("/download-by-link", {
        params: {
          link: plink,
        },
      });

      const { filename } = response.data;
      onChange((prev) => [...prev, filename]);
      setPlink("");
    } catch (error) {
      console.error("Error downloading image:", error);
      // Handle error, show message to the user, etc.
    }
  };

  // const addPhotoByLink = async (e) => {
  //   e.preventDefault();
  //   try {
  //       let response;
  //       if (plink.startsWith("http")) {
  //           // If plink is a valid URL, download the image from the link
  //           response = await axios.get("/download-by-link", {
  //               params: { link: plink },
  //           });
  //       } else {
  //           // If plink is not a valid URL, upload the image file
  //           const formData = new FormData();
  //           formData.append("photos", plink);
  //           response = await axios.post("/upload", formData, {
  //               headers: { "Content-Type": "multipart/form-data" },
  //           });
  //       }

  //       const { data: filename } = response;
  //       setPhotos((prev) => [...prev, filename]);
  //       setPlink("");
  //   } catch (error) {
  //       console.error("Error adding photo by link:", error);
  //       // Handle error, show message to the user, etc.
  //   }
  // };

  return (
    <div>
      <div className="flex  ">
        <input
          type="text"
          value={plink}
          onChange={(e) => setPlink(e.target.value)}
          placeholder="Add using a link..."
          className=" flex-1 rounded-xl py-2 "
        />
        <button
          onClick={addPhotoByLink}
          className=" bg-blue-700 text-white px-4 py-2 rounded-xl"
        >
          Add&nbsp;photo
        </button>
      </div>
      <div className=" mt-2   grid grid-cols-3  md:grid-cols-4 lg:grid-cols-6  ">
        {photos.length > 0 &&
          photos.map((link) => (
            <div className=" h-32 w-40 flex relative object-cover" key={link}>
              <img
                className=" rounded-2xl"
                src={"http://localhost:5600/uploads/" + link}
                w="50"
                h="50"
                rounded-xl
                alt=""
              />
              <button
                onClick={() => {
                  removePhoto(link);
                }}
                className=" cursor-pointer absolute bottom-1 right-1 text-white bg-black rounded-xl p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  setAsMain(link);
                }}
                className=" cursor-pointer absolute bottom-1 left-1 text-white bg-black rounded-xl p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        <label className="border bg-white rounded-xl p-8 flex items-center justify-center gap-2">
          <input
            multiple
            type="file"
            className=" hidden"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          Upload
        </label>
      </div>
    </div>
  );
};

export default PhotosUploader;

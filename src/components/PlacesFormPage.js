import React, { useEffect, useState } from 'react'
import Perks from "./Perks";
import axios from 'axios';
import PhotosUploader from "./PhotosUploader";
import AccountNav from './AccountNav';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
const PlacesFormPage = () => {
  const {id}=useParams();
  const Navigate=useNavigate()
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extra, setExtra] = useState("");
  const [cin, setCin] = useState("");
  const [cout, setCout] = useState("");
  const [guests, setGuests] = useState();
  const [photos, setPhotos] = useState([]);
  const [price,setPrice]=useState(null);
  const [redirect,setRedirect]=useState(false)
  useEffect(()=>{
     if(!id) return;
     axios.get('/places/'+id).then(response=>{
        const {data}=response;
        setTitle(data.title)
        setAddress(data.address)
        setDescription(data.description)
        setExtra(data.extra)
        setCin(data.cin)
        setCout(data.cout)
        setPhotos(data.photos)
        setPerks(data.perks)
        setGuests(data.guests)
        setPrice(data.price);
     })
  },[id])
  
  const addNewPlace=async (e)=>{
    // console.log(extra,cin,cout,guests)
     e.preventDefault();
     const placeData={
      title,address,photos,
      description,perks,extra,
      cin,cout,guests,price,
     }
     if(id){
      await axios.put('/places',{
        id, ...placeData
      })
       setRedirect(true);
      Navigate("/account/places") ; 
     }
     else{
      await axios.post('/places',placeData)
       setRedirect(true);
      Navigate("/account/places") ; 
     }

 }



//  if(redirect){
//    return Navigate to=('/account/places')
//  }
// 
// useEffect(() => {
//   if(redirect) 
//   Navigate("/account/places") ; 
// }, [redirect]) ; 


  return (
    <div>
        <AccountNav/>
        <form onSubmit={addNewPlace} className=" flex flex-col px-2  bg-blue-300 overflow-hidden">
            <h2 className=" text-2xl mt-2">Title</h2>
            <p className=" text-gray-400">
              Title should be precise and catchy.
            </p>
            <input
              className=" py-2 px-6 my-2 min-w-[98%] rounded-xl"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title of the place"
            />
            <h2 className=" text-2xl mt-2">Address</h2>
            <p className=" text-gray-400">Address to this place.</p>
            <input
              className=" py-2 px-6 my-2 min-w-[98%] rounded-xl"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address of the hotel"
            />
            <h2 className=" text-2xl mt-2">Photos</h2>
            <p className=" text-gray-400">More==Better</p>
            <PhotosUploader  photos={photos} onChange={setPhotos}/>

            <h2 className=" text-2xl mt-2">Description</h2>
            <p className=" text-gray-400">Description of this place.</p>
            <textarea
              className="py-2 px-6 my-2 min-w-[98%] rounded-xl"
              name="address"
              rows="4"
              cols="50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide your complete address"
            ></textarea>
            <Perks selected={perks} onChange={setPerks} />
            <h2 className=" text-2xl mt-2">Extra information</h2>
            <p className=" text-gray-400">Any rules or regulations of place.</p>
            <textarea
              className=" py-2 px-6 my-2 min-w-[98%] rounded-xl"
              placeholder="Any extra information"
              value={extra}
              onChange={(e) => setExtra(e.target.value)}
              rows="4"
              cols="50"
            />
            <h2 className=" text-2xl mt-2">CheckIn and out time</h2>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
              <div>
                <input
                  className=" py-2 px-6 my-2 min-w-[98%] rounded-xl"
                  type="text"
                  value={cin}
                  onChange={(e) => setCin(e.target.value)}
                  placeholder="CheckIn time"
                />
              </div>
              <div>
                <input
                  className=" py-2 px-6 my-2 min-w-[98%] rounded-xl"
                  type="text"
                  value={cout}
                  onChange={(e) => setCout(e.target.value)}
                  placeholder="CheckOut time"
                />
              </div>
              <div>
                <input
                  className=" py-2 px-6 my-2 min-w-[98%] rounded-xl"
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  placeholder="Maximum guests allowed per room"
                />
              </div>
              <div>
                <input
                  className=" py-2 px-6 my-2 min-w-[98%] rounded-xl"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price per night"
                />
              </div>
            </div>
            <button
              className=" py-2 px-6 my-2 rounded-full bg-blue-700 text-white"
              type="submit"
            >
              Add place
            </button>
          </form>
    </div>
  )
}

export default PlacesFormPage
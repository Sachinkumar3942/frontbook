import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Layout from "./components/Layout";
import ProfilePage from "./components/ProfilePage"
import PlacesPage from "./components/PlacesPage";
import axios from "axios";
import { UserContextProvider } from "./userContext";
import PlacesFormPage from "./components/PlacesFormPage";
import PlacePage from "./components/PlacePage";
import BookingsPage from "./components/BookingsPage";
import BookingPage from "./components/BookingPage";
axios.defaults.baseURL = "http://localhost:5600";
axios.defaults.withCredentials = true;
function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/account" element={<ProfilePage/>}/>
              <Route path="/account/places" element={<PlacesPage/>}/>
              <Route path="/account/places/new" element={<PlacesFormPage/>}/>
              <Route path="/account/places/:id" element={<PlacesFormPage/>}/>
              <Route path="/place/:id" element={<PlacePage/>} />
              <Route path="/account/bookings" element={<BookingsPage/>}/>
              <Route path="/account/bookings/:id" element={<BookingPage/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;

import {Routes,Route,Outlet,Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import Auth from "./pages/Auth";
import Bookings from "./pages/Bookings";
import Wishlist from "./pages/Wishlist";
import Places from "./pages/Places";
import MapExplorer from "./pages/MapExplorer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import {PaymentSuccess,PaymentCancel} from "./pages/PaymentResult";
import {useAuth} from "./context/AuthContext";
function Layout(){return <><Navbar/><Outlet/><Footer/></>;}
function Protected({children}){const {user,loading}=useAuth();if(loading)return <main className="page-wrap">Loading…</main>;return user?children:<Navigate to="/login" replace/>;}
export default function App(){return <Routes><Route element={<Layout/>}><Route index element={<Home/>}/><Route path="/hotels" element={<Hotels/>}/><Route path="/hotels/:id" element={<HotelDetails/>}/><Route path="/destinations" element={<Destinations/>}/><Route path="/destinations/:id" element={<DestinationDetails/>}/><Route path="/places" element={<Places/>}/><Route path="/map" element={<MapExplorer/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="/login" element={<Auth/>}/><Route path="/register" element={<Auth mode="register"/>}/><Route path="/payment/success" element={<Protected><PaymentSuccess/></Protected>}/><Route path="/payment/cancel" element={<Protected><PaymentCancel/></Protected>}/><Route path="/bookings" element={<Protected><Bookings/></Protected>}/><Route path="/wishlist" element={<Protected><Wishlist/></Protected>}/><Route path="*" element={<main className="page-wrap"><h1>Page not found</h1></main>}/></Route></Routes>;}

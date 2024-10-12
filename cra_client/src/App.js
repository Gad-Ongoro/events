import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import SignUp from "./components/SignUp.jsx";
import SignIn from "./components/SignIn.jsx";
import Home from "./components/Home.jsx";
import Event from "./components/Event.jsx";
import EventDetails from "./components/EventDetails.jsx";
import AdminDashboard from "./components/minad.jsx";
import Dashboard from "./components/AdminDash.jsx";
import Navbar from "./components/NavBar.jsx";
import Booking from "./components/booking.jsx";
import TicketHistory from "./components/TicketHistory";
import EventHistory from "./components/EventHistory";
import NewEvent from "./components/NewEvent.jsx";
import BillingInfo from "./components/billing_info";
import AdvertFeeInvoices from "./components/AdvertFeeInvoices";
import TicketCount from "./components/TicketCount";
import BillingDetails from "./components/billing_details";
import Booked from "./components/booked";
import Reviews from "./components/Reviews.jsx";
import AdminDashBrd from "./components/AdminDash";
import OrganizerDashBoard from "./components/OrganizerDash/OrganizerDashBoard.jsx";
import PassReset from "./components/PasswordReset/PassReset.jsx";
import User from "./components/DashBoards/userDashboard";
import DashHome from "./components/DashBoard/DashHome.jsx";
import "./App.css";
import { jwtDecode } from "jwt-decode";
import AppContext from "./services/utils.jsx";
export const EventsContext = createContext();


function App() {
	return (
		<AppContext>
			<div id="home">
			<Navbar />
				<Routes>
					<Route path="/" element={<Event></Event>}></Route>
					<Route path='/signup' element={<SignUp></SignUp>}></Route>
					<Route path='/signin' element={<SignIn></SignIn>}></Route>
					<Route path="/events/*" element={<Event />} />
					<Route path="/home/*" element={<Home />} />
					<Route path="/events/:eventId/*" element={<EventDetails />} />
					<Route path="/AdminDash/" element={<Dashboard />} />
					<Route path="/booking/:eventId" element={<Booking />} />
					<Route path="/booking/*" element={<Booking />} />
					<Route path="/TicketHistory" element={<TicketHistory />} />
					<Route path="/EventHistory" element={<EventHistory />} />
					<Route path="/new_Event" element={<NewEvent />} />
					<Route path="/billing_info" element={<BillingInfo />} />
					<Route path="/billing_details" element={<BillingDetails />} />
					<Route path="/AdvertFeeInvoices" element={<AdvertFeeInvoices />} />
					<Route path="/TicketCount" element={<TicketCount />} />
					<Route path="/booked" element={<Booked />} />
					<Route path='/password_reset/*' element={<PassReset></PassReset>}></Route>
					<Route path="/booked" element={<Reviews />} />				
					<Route path="/admin_dashboard/*" element={<AdminDashBrd></AdminDashBrd>} exact></Route>
					<Route path="/organizer_dashboard/*" element={<OrganizerDashBoard></OrganizerDashBoard>} exact></Route>
					<Route path="/dashboard/*" element={<DashHome />} />
				</Routes>
			</div>
		</AppContext>
	);
}

export default App;
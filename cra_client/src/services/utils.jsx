import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from 'notistack';
import { jwtDecode } from 'jwt-decode';
import api from "./api";

const appContext = createContext();

export const useAppContext = () => {
  return useContext(appContext);
};

export default function AppContext({ children }) {
  const navigate = useNavigate();
  let [events, setEvents] = useState([]);
  let [eventPics, setEventPics] = useState([]);
  let [cartItems, setCartItems] = useState([]);
  let [cartItemsCount, setCartItemsCount] = useState(0);
  let [cartSubTotal, setCartSubTotal] = useState(0);
  const [user, setUser] = useState({});
  const accessToken = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');
  const userId = accessToken !== null || undefined ? jwtDecode(accessToken).user_id : null;
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(false);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Google Login
  const googleLogin = async (credential) => {
    try {
      const response = await api.post("google/javascriptOAuthCallBack/", { credentials: credential });

      if (response.status === 200) {
        const user_id = jwtDecode(response.data.access).user_id;
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        setAuth(true);
        enqueueSnackbar(`Successfully logged in`, { variant: 'success' });
        navigate(`/`);
      } else {
        throw new Error("Error logging in");
      }
    } catch (error) {
      console.error(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  // logout
  const handleLogout = async () => {
    if (!refreshToken) {
      alert('No refresh token found!');
      return;
    }

    try {
      const res = await api.post('logout/', { 'refresh_token': refreshToken });
      if (res.status === 204) {
        setAuth(false);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/signin');
				enqueueSnackbar(`Successfully Logged Out!`, { variant: 'success' });
      }
    } catch (error) {
			enqueueSnackbar('Error Logging Out!', { variant: 'error' })
      console.error('Logout Error:', error);
    }
  };

  // GET user
  async function fetchUser() {
    try {
      const res = await api.get(`users/${userId}/`);
      if (res.status === 200) {
        setUser(res.data);
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      setAuth(true);
      fetchUser();
    } else {
      setAuth(false);
    }
  }, [accessToken]);

  // GET events
  const getEvents = async () => {
    try {
      const response = await api.get("events/");
      if (response.status === 200) {
        let eventPhotos = await getEventPics();
        let eventsData = response.data.map((event) => {
          return { ...event, photo: eventPhotos.data.find((pic) => pic.event === event.id) };
        })
        setEvents(eventsData);
      } else {
        throw new Error("Error fetching events");
      }
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  // GET event details
  const getEventDetails = async (event_id) => {
    try {
      const response = await api.get(`events/${event_id}/`);
      if (response.status === 200) {
        return response;
      } else {
        throw new Error("Error fetching event details");
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  // GET event photos
  const getEventPics = async () => {
    try {
      const response = await api.get('photos/');
      if (response.status === 200) {
        setEventPics(response.data);
        return response;
      } else {
        throw new Error("Error fetching event photos");
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const contextValues = {
    googleLogin,
    handleLogout,
    events,
    getEventDetails,
    cartItems,
    setCartItems,
    cartItemsCount,
    cartSubTotal,
    user,
    setUser,
    userId,
    auth,
    setAuth,
    fetchUser,
    scrollToTop,
    navigate
  };

  return (
    <appContext.Provider value={contextValues}>
      {children}
    </appContext.Provider>
  );
}
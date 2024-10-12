import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import AnimatedYPage from '../Animations/AnimatedYPage';
import SideNav from './SideNav';
import DashBar from './DashBar';
import DashView from './DashView';
import DashDrawer from './DashDrawer';
import MpesaPayment from './MpesaPayment';
import Ads from './Ads';
import Settings from './Settings';
import ProtectedRoute from '../Auth/ProtectedRoute';
import { useAppContext } from '../../services/utils';
export const DashContext = createContext();

function DashHome() {
	const { handleLogout } = useAppContext();
	const [dashDrawerOpen, setDashDrawerOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > 1) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<>
			<ProtectedRoute>
				<AnimatedYPage>
					<DashContext.Provider value={{ dashDrawerOpen, setDashDrawerOpen, handleLogout }}>
						<DashDrawer></DashDrawer>
						<div className='container h-screen grid grid-cols-12'>
							<div className={`sticky top-0 z-20 ${isScrolled ? 'bg-emerald-100' : 'bg-white'} 
								transition-all duration-300
								col-start-1 col-end-13 sm:col-start-2 sm:col-end-13 sm:p-3 rounded-lg`}
							>
								<DashBar></DashBar>
							</div>
							<div className='sticky top-20 sm:top-10 rounded col-start-1 col-end-13 
								row-start-1 row-end-2 md:fixed md:top-1/2 md:-translate-y-1/2 md:row-start-2 md:row-end-13
								hidden md:block'
							>
								<SideNav></SideNav>
							</div>
							<div className='row-start-2 row-end-13 col-start-1 md:col-start-2 col-end-13'>
								<Routes>
									<Route path='/dashview' element={<DashView></DashView>}></Route>
									<Route path='/settings' element={<Settings></Settings>}></Route>
									<Route path='/ads' element={<Ads></Ads>}></Route>
									<Route path='/lipa-na-mpesa' element={<MpesaPayment></MpesaPayment>}></Route>
								</Routes>
							</div>
						</div>
					</DashContext.Provider>
				</AnimatedYPage>
			</ProtectedRoute>
		</>
	)
}

export default DashHome;
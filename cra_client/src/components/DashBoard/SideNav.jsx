import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { TbSmartHome } from "react-icons/tb";
import CartIcon from '../Cart/CartIcon';
import { CgProfile } from "react-icons/cg";
import { MdPostAdd } from "react-icons/md";
import { MdOutlineListAlt } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { RiSettings3Line } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { useAppContext } from '../../services/utils';

function SideNav() {
	const { userId, scrollToTop, handleLogout } = useAppContext();

	return (
		<div className='flex md:flex-col justify-between md:justify-center items-center md:gap-8 md:border-r-2 md:border-gray-500'>
			<NavLink to={'/'}>
				<TbSmartHome className='transition-all duration-400 cursor-pointer hover:text-blue-500 hover:scale-110' size={30}/>
			</NavLink>

			<CartIcon />

			<NavLink to={`/dashboard/${userId}/dashview`} onClick={scrollToTop}>
				<CgProfile className='transition-all duration-400 cursor-pointer hover:text-blue-500 hover:scale-110' size={30} />
			</NavLink>

			<MdOutlineFavoriteBorder className='transition-all duration-400 cursor-pointer hover:text-blue-500 hover:scale-110' size={30} />


			<NavLink to={`/dashboard/${userId}/adpost`} onClick={scrollToTop}>
				<MdPostAdd className='transition-all duration-400 cursor-pointer hover:text-blue-500 hover:scale-110' size={30} />
			</NavLink>

			<NavLink to={`/dashboard/${userId}/ads`} onClick={scrollToTop}>
				<MdOutlineListAlt className='transition-all duration-400 cursor-pointer hover:text-blue-500 hover:scale-110' size={30} />
			</NavLink>

			<IoNotificationsOutline className='transition-all duration-400 cursor-pointer hover:text-blue-500 hover:-skew-x-6' size={30} />
			
			<NavLink to={`/dashboard/${userId}/settings`} onClick={scrollToTop}>
				<RiSettings3Line className='transition-all duration-400 cursor-pointer hover:text-blue-500 hover:rotate-180' size={30} />
			</NavLink>

			<SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'left' }} />
			
			<TbLogout2 
				onClick={handleLogout}
				className='transition-all duration-400 cursor-pointer hover:text-blue-500' 
				size={30} 
			/>
		</div>
	)
}

export default SideNav;
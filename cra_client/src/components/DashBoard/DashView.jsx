import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { FaArrowRightLong } from "react-icons/fa6";
import { MdShoppingCartCheckout } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../services/utils';
import { enqueueSnackbar } from 'notistack';
import AnimatedXPage from '../Animations/AnimatedXPage';

function DashView() {
	const { userId, user, setCartOpen } = useAppContext();
	const navigate = useNavigate();
	const [ads, setAds] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

	return (
		<AnimatedXPage>
		<div className='container grid grid-cols-12'>
		<div className='col-span-12 md:col-span-8'>
			<div>
				{ user.role === 'buyer' && (
					// <h2 className='text-lg my-2 font-bold'>Recent Purchases</h2>
					<h2 className='text-lg my-2 font-bold'>Recent Advertisements</h2>
				)}
				{ user.role === 'seller' && (
					<h2 className='text-lg my-2 font-bold'>Recent Advertisements</h2>
				)}
				<div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
					<div className='flex justify-center'>
						<img className='rounded h-52 object-cover cursor-pointer transition-all duration-300 hover:scale-105' 
							src="https://i.pinimg.com/474x/06/30/e6/0630e63a37d7ef817f4705d1627bd89d.jpg" 
							alt="NA" 
							width={200} 
						/>
					</div>
					<div className='flex justify-center'>
						<img className='rounded h-52 object-cover cursor-pointer transition-all duration-300 hover:scale-105' 
							src="https://i.pinimg.com/474x/5f/16/50/5f16506b67a0c0b2481529687f1f8b85.jpg" 
							alt="NA" 
							width={200} 
						/>
					</div>
					<div className='flex justify-center'>
						<img className='rounded h-52 object-cover cursor-pointer transition-all duration-300 hover:scale-105' 
							src="https://i.pinimg.com/474x/a3/6a/7f/a36a7f4b38c104f9833750f839b5eccc.jpg" 
							alt="NA" 
							width={200} 
						/>
					</div>
				</div>
			</div>
		</div>

		{
			user.role === 'buyer' &&
			(
				<div className='col-span-12 md:col-span-4 text-center rounded-xl mt-5'>
					<div>
						<div>
							<h2 className='text-emerald-500 text-lg font-bold'>My Cart</h2>
							<h3 className='text-lg text-gray-500'>Items</h3>
						</div>
					</div>

					<div className='flex justify-around'>
						<div>
							<h2 className='text-lg'>Total Cost</h2>
							
							<NavLink to={`/account/${userId}/lipa-na-mpesa`}>
								<button className='bg-green-500 hover:bg-green-400 transition-all duration-500 w-36 h-10 text-white-500 font-bold rounded-full'>Checkout <MdShoppingCartCheckout className='inline ml-1' size={20} /></button>
							</NavLink>
						</div>
						<div>
							<p>Kes. <strong>1500</strong></p>
							<button 
								className='bg-green-500 hover:bg-green-400 transition-all duration-500 w-36 h-10 text-white-500 font-bold rounded-full'
							>
								Show All 
								<FaArrowRightLong className='inline ml-1' />
							</button>
						</div>
					</div>

					<div className='grid grid-cols-12 items-center mt-2'>
						<div className='col-start-1 col-end-2 flex justify-center'>
							<RxHamburgerMenu className='text-xl' />
						</div>

						<div className='col-start-11 col-end-13'>
							<div className='flex flex-col justify-between items-center'>
								<CiEdit className='my-2 text-2xl transition-all duration-500 hover:cursor-pointer hover:text-green-300' />
								<RiDeleteBin5Line 
									className='my-2 text-orange-700 text-2xl transition-all duration-300 hover:cursor-pointer hover:text-orange-600' 
								/>
							</div>
						</div>
					</div>

					<div className='flex justify-center mt-2'>
						<button
							// onClick={() => setCartOpen(true)}
							className='bg-green-500 hover:bg-green-400 transition-all duration-500 w-36 h-10 text-white-500 font-bold rounded-full'
						>
							Show All 
							<FaArrowRightLong className='inline ml-1' />
						</button>
					</div>
				</div>
			)
		}

		{/* seller */}
		{
			user.role === 'seller' &&
			(
				<div className='col-span-12 md:col-span-4 text-center rounded-xl mt-5'>
					<div>
						<div>
							<NavLink to={`/account/${userId}/ads`} className='text-emerald-600 text-lg font-bold'>My Products</NavLink>
							<h3 className='text-lg text-gray-500'>{ads.length} {ads.length === 1 ? 'Ad' : 'Ads'}</h3>
						</div>
					</div>

					<div className='grid grid-cols-12 items-center mt-2'>
						<div className='col-start-1 col-end-2 flex justify-center'>
							<RxHamburgerMenu className='text-xl transition-all duration-500 hover:cursor-pointer hover:text-green-300' />
						</div>
						<div className='col-start-2 col-end-11'>
							{
								ads.length > 0 && (
									<img src={ads[0]?.image} className='rounded-lg h-60 w-60 object-cover' alt="NA" />
								)
							}
							{/* <img src="https://i.pinimg.com/474x/a3/18/3e/a3183e363358309ec737feba214a6387.jpg" className='rounded h-60 w-60 object-cover' alt="NA" /> */}
						</div>
						<div className='col-start-11 col-end-13'>
							<div className='flex flex-col justify-between items-center'>
								<CiEdit className='my-2 text-2xl transition-all duration-500 hover:cursor-pointer hover:text-green-300' />
								<RiDeleteBin5Line 
									className='my-2 text-orange-700 text-2xl transition-all duration-300 hover:cursor-pointer hover:text-orange-600' 
								/>
							</div>
						</div>
					</div>

					<div className='flex justify-center mt-2'>
						<button
							onClick={() => navigate(`/dashboard/${userId}/ads`)}
						 	className='bg-green-500 hover:bg-green-400 transition-all duration-500 w-36 h-10 text-white-500 font-bold rounded-full'
						>
							Show All 
							<FaArrowRightLong className='inline ml-1' />
						</button>
					</div>
				</div>
			)
		}
	</div>
	</AnimatedXPage>
	)
};

export default DashView;
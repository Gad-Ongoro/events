import React, { useState, useEffect, useContext } from 'react';
import { useAppContext } from '../../services/utils';

const Ads = () => {
	const { userId } = useAppContext();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-semibold mb-4">My Ads</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {ads.map((ad) => (
            <div key={ad.id} className="group grid justify-center items-center">
              <div className="grid justify-center items-center aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7">
                <img
                  alt={ad.imageAlt || ad.name}
                  src={ad.image || 'https://via.placeholder.com/150'}
                  className="h-48 w-48 object-cover object-center rounded-lg group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{ad.name}</h3>
							<p className="mt-1 font-medium text-gray-900"><strong>Category: </strong>{ad.category}</p>
							<p className="mt-1 font-medium text-gray-900"><strong>Price: </strong> {ad.price} per {ad.unit_of_measurement}</p>
							<p className="mt-1 font-medium text-gray-900"><strong>Stock: </strong> {ad.quantity_available} {ad.unit_of_measurement}s</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ads;
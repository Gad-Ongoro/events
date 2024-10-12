import { Link } from "react-router-dom";
import Footer from "./Footer";
import "../App.css";
import { useAppContext } from "../services/utils";

function Event() {
  const { events } = useAppContext();

  let spinners = (<div className='text-center p-4 m-4'>
		<div className='spinner-border text-primary mx-2'></div>
		<div className='spinner-grow text-primary mx-2'></div>
		<div className='spinner-border text-primary mx-2'></div>
		<div className='spinner-grow text-primary mx-2'></div>
		<div className='spinner-border text-primary mx-2'></div>
		<div className='spinner-grow text-primary mx-2'></div>
	</div>);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Upcoming Events
          </h2>

          { events[0] === undefined ? spinners :
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {events.map((event) => (
              <Link key={event.id} to={`/events/${event.id}`}>
                <div className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      className="eventImage"
                      src={event.photo.url}
                      alt={`${event.name}`}
                    />
                  </div>
                  <div className="mt-4 justify-between">
                    <h3 className="text-sm text-gray-700">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {event.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{event.venue}</p>
                    <p className="text-sm font-medium text-gray-900">
                      Start Date: {event.start_date}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Event;

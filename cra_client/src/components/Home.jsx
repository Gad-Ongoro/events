import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "../App.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useAppContext } from "../services/utils";

function Home() {
  const { events } = useAppContext();

  let spinners = (<div className='text-center p-4 m-4'>
		<div className='spinner-border text-primary mx-2'></div>
		<div className='spinner-grow text-primary mx-2'></div>
		<div className='spinner-border text-primary mx-2'></div>
		<div className='spinner-grow text-primary mx-2'></div>
		<div className='spinner-border text-primary mx-2'></div>
		<div className='spinner-grow text-primary mx-2'></div>
	</div>);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1
    }
  };

  let event_cards = events.map((event) => (
    <Link key={event.id} to={`/events/${event.id}`}>
      <div className="">
        <div className='grid justify-center items-center'>
          <img
            className="eventImage rounded-lg"
            src={event.photo.url}
            alt={`${event.name}`}
          />
        </div>
      </div>
    </Link>
  ))

  const carouselEvents = events.map((event) => ({
    id: event.id,
    imageUrl: event.photo.url,
    eventName: event.name,
    startDate: event.start_date,
  }));

  return (
    <>
      <div className="mt-16 mb-40 mx-auto items-center">
        {/* <section className="w-full bg-cover bg-center h-96" style={{ backgroundImage: "url('/path-to-hero-image.jpg')" }}>
          <div 
            className="w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center text-white"
            style={{ backgroundImage: "url('https://i.pinimg.com/564x/99/e6/97/99e697e6f2125eafd83cfb40ffa1f8db.jpg')"}}
          >
          </div>
        </section> */}
        <div 
          className="bg-cover bg-center space-y-4 flex-1 sm:text-center lg:text-left" 
        >
          <h1 className="p-5 text-gray-800 font-bold text-4xl xl:text-5xl">
            Discover Experiences Without Limits With
            <span className="text-indigo-600"> Ticket Nexus</span>
          </h1>
          <p className="px-5 text-gray-500 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
            Elevating Events to unforgettable Experiences. Book your next event
            with us for unlimited experiences.
          </p>
          <div>
            <div className="px-5 mt-12 space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
              <Link to={"/events"}>
                <button
                  className="px-28 py-3.5 w-full bg-indigo-600 hover:bg-indigo-500 border-none text-white text-center rounded-md shadow-md block sm:w-auto"
                  type="button"
                >
                  Browse Events
                </button>
              </Link>
            </div>
          </div>
        </div>

        { events[0] === undefined ? spinners :
        <div className="flex-1 text-center mt-4 lg:mt-0 lg:ml-3">

          {carouselEvents.length > 0 && (
            <Carousel 
              responsive={responsive}
              showDots={true}
              ssr={true}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              transitionDuration={200}
              removeArrowOnDeviceType={["tablet", "mobile"]}
              containerClass="carousel-container"
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
              className='transition-all rounded-lg m-2 h-56 z-0'
            >
              {event_cards}
            </Carousel>
          )}
        </div>
        }

      </div>
      <Footer />
    </>
  );
}

export default Home;

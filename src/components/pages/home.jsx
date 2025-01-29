import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Home = () => {
  const responsive = {
    largeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className="home">
      <div
        className="welcome"
        style={{ backgroundImage: "url('/assets/kch.webp')" }}
      >
        <h1> Welcome to Fake Store </h1>
        <p>
          Take a journey though our page and discover our latest home collection
          today
        </p>
      </div>
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={2000}
        containerClass="carousel-container"
      >
        <div>
          <img src="/assets/p1.png" alt="Image 1" className="carousel-image" />
        </div>
        <div>
          <img src="/assets/p2.png" alt="Image 2" className="carousel-image" />
        </div>
        <div>
          <img src="/assets/p3.png" alt="Image 3" className="carousel-image" />
        </div>
        <div>
          <img src="/assets/p4.png" alt="Image 4" className="carousel-image" />
        </div>
        <div>
          <img src="/assets/p5.png" alt="Image 5" className="carousel-image" />
        </div>
        <div>
          <img src="/assets/p6.png" alt="Image 6" className="carousel-image" />
        </div>
      </Carousel>
      <div className="welcome"></div>
    </div>
  );
};

export default Home;

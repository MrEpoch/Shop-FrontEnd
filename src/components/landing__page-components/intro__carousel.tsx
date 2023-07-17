import useEmblaCarousel from "embla-carousel-react";
import Slide1 from "../../assets/sandwich-1.jpg";
import Slide2 from "../../assets/sandwich-2.jpg";
import Slide3 from "../../assets/sandwich-3.jpg";
import "./intro__carousel.css";
import React, { useEffect } from "react";

export default function IntroCarousel(): React.JSX.Element {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    function scrollNext() {
      if (!emblaApi) return;
      emblaApi.scrollNext();
    }

    const timer = setInterval(scrollNext, 10000);

    return () => clearInterval(timer);
  }, [emblaApi]);

  return (
    <div className="landing__page-carousel " ref={emblaRef}>
      <div className="landing__page-carousel__container">
        <div
          className="landing__page-carousal__slide"
          style={{ backgroundImage: `url(${Slide1})` }}
        ></div>
        <div
          className="landing__page-carousal__slide"
          style={{ backgroundImage: `url(${Slide2})` }}
        ></div>
        <div
          className="landing__page-carousal__slide"
          style={{ backgroundImage: `url(${Slide3})` }}
        ></div>
      </div>
      <h1 className="landing__page-carousal__slogan">
        Modern gastronomy with classic taste
      </h1>
    </div>
  );
}

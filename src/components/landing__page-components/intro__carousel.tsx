import useEmblaCarousel from 'embla-carousel-react';

export function IntroCarousel() {
    const [emblaRef] = useEmblaCarousel({ loop: true });

    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                <div className="embla__slide_1"></div>
                <div className="embla__slide_2"></div>
                <div className="embla__slide_3"></div>
            </div>
        </div>
    )
}

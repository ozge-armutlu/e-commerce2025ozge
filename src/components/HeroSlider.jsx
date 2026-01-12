import Slider from "react-slick";


  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
  };

  const images = [
    "/images/mobile-shop-header-1.png",
    "/images/mobile-shop-cards-31.png",
    "/images/mobile-product-cards-10.png",
  ];
export default function HeroSlider() {
  return (
    <div className="px-4 overflow-hidden">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="w-full">
            <img
              src={src}
              className="w-full h-64 sm:h-80 object-cover rounded-xl"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}





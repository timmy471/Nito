import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { carouselbreakPoints } from '@src/helpers/constants';

export const FaCarousel = ({ children }: { children: any }) => {
  const newCarouselBreakPoints = { ...carouselbreakPoints };
  if (children.length < 5) newCarouselBreakPoints.desktop.partialVisibilityGutter = 0;

  return (
    <Carousel
      draggable={true}
      swipeable={true}
      showDots={false}
      responsive={newCarouselBreakPoints}
      // infinite={true}
      arrows={false}
      autoPlay={false}
      shouldResetAutoplay={false}
      keyBoardControl={true}
      slidesToSlide={1}
      partialVisible={true}
      containerClass='carousel-container'
      itemClass='carousel-item-padding'>
      {children}
    </Carousel>
  );
};

import BookCard from "../bookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Book } from "../../types";

interface BooksProps {
  books: Book[] | null;
}

function BooksSlider({ books }: BooksProps) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      navigation={true}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        830: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1070: {
          slidesPerView: 2,
          spaceBetween: 50,
        },
        1180: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {books?.map((book, index) => (
        <SwiperSlide key={index}>
          <BookCard book={book} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default BooksSlider;

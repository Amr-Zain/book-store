import img from "../../assets/banner.png";
import Button from "../utils/button";

function Banner() {
  return (
    <div className="flex gap-4 flex-col md:flex-row-reverse py-14 justify-between items-center ">
      <div className="w-full md:w-1/2 flex  justify-center md:justify-end items-center">
        <img src={img} alt="" />
      </div>
      <div className="flex flex-col w-full md:w-1/2">
        <h1 className="md:text-4xl text-2xl mb-6 font-medium">
          New Releases This Week
        </h1>
        <p className="mb-10 text-gray-500">
          It's time to update your reading list with some of the latest and
          greatest releases in the literary world. From heart-pumping thrillers
          to captivating memoirs, this week's new releases offer something for
          everyone
        </p>
        <Button className="px-12 text-base w-min ">Subscribe </Button>
      </div>
    </div>
  );
}

export default Banner;

import { useEffect } from "react";
import Banner from "../../components/home/banner";
import Slider from "../../components/home/topSales";
import Recommeneded from "../../components/home/recommended";

function Home() {
    useEffect(()=>{
        document.title = 'Book-Store| Home'
    })
    return ( <div>
        <Banner />
        <Slider />
        <Recommeneded />
    </div> );
}

export default Home;
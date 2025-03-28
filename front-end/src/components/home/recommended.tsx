import { useQuery } from "@tanstack/react-query";
import BooksSlider from "./booksSlider"
import { listBooks } from "../../api";
import SliderItemsSkeleton from "./sliderItemsSkeleton";


const Recommeneded = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['recommeneded-books'],
    queryFn: ()=>listBooks(undefined,false),
    staleTime: 1000 * 60 * 15 
  })
  return (
    <div className='py-16'>
        <h2 className='text-3xl font-semibold mb-6'>Recommended for you </h2>
        {error ? (
        <div className="text-red-600">
          Failed to load recommendations: {error.message}
        </div>
      ) : null}

      {isPending ? (
        <SliderItemsSkeleton />
      ) : (
        <BooksSlider books={data || []} />
      )}
    </div>
  )
}

export default Recommeneded
import { useQuery } from "@tanstack/react-query";
import BooksSlider from "./booksSlider"
import { listBooks } from "../../api";

/* 
const books = [
    {_id:'1',title: 'dskflj',coverImage:'book-1.png',description:'dfskl fhseh eeop cmxlk', newPrice:250,oldPrice:300, },
    {_id:'2',title: 'dskflj',coverImage:'book-2.png',description:'dfskl fhseh eeop cmxlak', newPrice:250,oldPrice:300,},
    {_id:'3',title: 'dskflj',coverImage:'book-3.png',description:'dfskl fhseh eeop cmxlk', newPrice:250,oldPrice:300 },
    {_id:'4',title: 'dskflj',coverImage:'book-4.png',description:'dfskl fhseh eeop cmxlk', newPrice:250,oldPrice:300, },
    {_id:'5',title: 'dskflj',coverImage:'book-1.png',description:'dfskl fhseh eeop cmxlk', newPrice:250,oldPrice:300, },
    {_id:'6',title: 'dskflj',coverImage:'book-2.png',description:'dfskl fhseh eeop cmxlak', newPrice:250,oldPrice:300, },
    {_id:'7',title: 'dskflj',coverImage:'book-3.png',description:'dfskl fhseh eeop cmxlk', newPrice:250,oldPrice:300, },
    {_id:'8',title: 'dskflj',coverImage:'book-4.png',description:'dfskl fhseh eeop cmxlk', newPrice:250,oldPrice:300, },
]; */
const Recommeneded = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['Recommeneded'],
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
        <div className="text-gray-500">Loading recommendations...</div>
      ) : (
        <BooksSlider books={data || []} />
      )}
    </div>
  )
}

export default Recommeneded
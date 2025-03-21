import BooksSlider from "./booksSlider"


const books = [
    {_id:'1',title: 'dskflj',coverImage:'book-1.png',description:'dfskl fhseh eeop cmxlk', newPrice:250,oldPrice:300, },
    {_id:'2',title: 'dskflj',coverImage:'book-2.png',description:'dfskl fhseh eeop cmxlak', newPrice:250,oldPrice:300,},
    {_id:'3',title: 'dskflj',coverImage:'book-3.png',description:'dfskl fhseh eeop cmxlk', newPrice:250,oldPrice:300 },
    {_id:'4',title: 'dskflj',coverImage:'book-4.png',description:'dfskl fhseh eeop cmxlk', newPrice:250,oldPrice:300, },
    {_id:'5',title: 'dskflj',coverImage:'book-1.png',description:'dfskl fhseh eeop cmxlk', newPrice:250,oldPrice:300, },
    {_id:'6',title: 'dskflj',coverImage:'book-2.png',description:'dfskl fhseh eeop cmxlak', newPrice:250,oldPrice:300, },
    {_id:'7',title: 'dskflj',coverImage:'book-3.png',description:'dfskl fhseh eeop cmxlk', newPrice:250,oldPrice:300, },
    {_id:'8',title: 'dskflj',coverImage:'book-4.png',description:'dfskl fhseh eeop cmxlk', newPrice:250,oldPrice:300, },
];
const Recommeneded = () => {
   

  return (
    <div className='py-16'>
        <h2 className='text-3xl font-semibold mb-6'>Recommended for you </h2>
        <BooksSlider books={books}/>
    </div>
  )
}

export default Recommeneded
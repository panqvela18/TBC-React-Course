import Image from 'next/image';
import { BsCartCheckFill } from 'react-icons/bs';
import Link from 'next/link';


export default function Product({ id,img, name, description, price }) {
  

  return (
    <div className='flex justify-between bg-white rounded flex-col items-center filter drop-shadow-xl py-2 '>
      <div className="relative h-40 w-40">
        <Image src={img} alt='productimage' objectFit='cover' className="w-auto h-40"  width={160} height={80} />
      </div>
      <div className='flex justify-center items-center flex-col p-3'>
        <h5 className="text-black font-bold text-xl mb-2">{name}</h5>
        <p className="text-gray-400 font-medium mb-2">{`${description.split(" ")
            .slice(0, 10)
            .join(" ")}`} ...</p>
        <span className="text-black font-bold text-xl ">{price}$</span>
      </div>
      {/* <button  className='bg-blue-500 text-white flex items-center py-2 px-4 rounded font-bold'>Add to Cart <BsCartCheckFill className="ml-3" color="white" /></button> */}
      <button  className='bg-blue-500 text-white flex items-center py-2 px-4 rounded font-bold'><Link href={`/product/${id}`}>Learn More</Link></button>
    </div>
  )
}

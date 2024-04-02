import { BsCartCheckFill } from "react-icons/bs";

export default function Product({img,name,description,price}) {
  return (
    <div className='flex justify-between bg-white rounded flex-col items-center filter drop-shadow-xl pb-2 '>
        <img className='w-40 h-40 object-contain select-none ' src={img} alt='productimage' />
        <div className='flex justify-center items-center flex-col p-3'>
            <h5 className="text-black font-bold text-xl mb-2">{name}</h5>
            <p className="text-gray-400 font-medium mb-2">{description}</p>
            <span className="text-black font-bold text-xl ">{price}$</span>
        </div>
        <button className='bg-blue-500 text-white flex items-center py-2 px-4 rounded font-bold'>Add to Cart <BsCartCheckFill className="ml-3" color="white" /></button>
    </div>
  )
}

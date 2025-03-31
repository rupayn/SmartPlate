import React from 'react'
import Image from 'next/image';
import Img1 from "../../public/img1.png"
import Img2 from "../../public/img2.png"
import Img3 from "../../public/img3.png"
import IMG4 from "../../public/img4.png"
import IMG5 from "../../public/img5.png"
import IMG6 from "../../public/img6.png"
function HomePage() {
  return (
    <div>
      <div className='flex justify-start items-center '>
      <div className="mt-24 w-4/12 m-28">
        <p className="text-[#FD930B] font-extralight"><span className=' font-semibold'>welcome our food center</span></p>
        <div className='w-[560px] h-[158px]'>
          <h1 className='text-[55.83px] '>Discover Restaurants and <span className='text-[#FD930B] font-semibold'>Delicious Food.</span></h1>
          
      
        </div>
        <div>
        <div className="w-[522px]  pt-[2rem] font-medium">
          Good food is not just sustenance; its an artful celebration of
          flavors, a source of joy, and a communal experience that transcends
          nourishment. In its essence, good food is a symphony for the senses, a
          momentary escape to happiness, and a universal language that unites us
          all.
        </div>
        </div>
        <div className=" flex gap-24 pt-10 ">
          <button className="bg-[#FD930B] text-white px-4 py-2 rounded-full">Order Now</button>
          <button className=" bg-[#FD930B] px-4 py-2 rounded-full">Go to Cart</button>
        </div>
          
        
      </div>

      <div className='flex'>
        <Image src={Img1} alt="image" width={112} height={200} className='w-80 object-cover'></Image>
        <Image src={Img2} alt="image" width={112} height={200} className='w-64 h-96 '></Image>
      </div>
      </div>
      <div className=' flex mt-24 m-28 space-x-30 '>
      <div>
      <Image src={Img3} alt="image" width={112} height={200} className='w-80 object-cover'></Image>
      </div>
      <div  className="mt-24 w-4/12 m-28">
      <p className="text-[#FD930B] font-extralight"><span className=' font-semibold'>ABOUT US</span> </p>
      <div className='w-[560px] h-[158px]'>
          <h1 className='text-[36.76px] '>Here are some top Food Canteens where  <span className=' font-semibold'>you can lunch in or take away.</span></h1>
          <p >Explore UEM Kolkata College's Canteen Food Delivery online – your quick and convenient link to the heart of our campus's  culinary delights. Savor the essence of campus life with every click. Welcome to a new era of UEMK dinin</p>
          
      
        </div>
      </div>
      </div>
      <div className='bg-red-800 flex flex-col items-center justify-center h-[800px]' >
      <div className='flex justify-center pb-9 '><p className="text-[#FD930B] font-extralight "><span className='font-semibold'>OUR SERVICE</span> </p></div>
      <div className='flex justify-center w-[1443px] '>
      <h1 className='text-[36.76px] font-semibold'>We Are More Than Multiple Services</h1>
      </div>
      <div className='flex space-x-5 w-[1080px] h-[600px] bg-amber-400'>
      <div className='flex justify-center w-[376px] h-[542.5px] border-spacing-2'>
      <h1>Minced Meat</h1>

      </div>
      

      </div>
      </div>
    </div>
  );
}

export default HomePage


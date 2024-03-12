import React from 'react'


export default function ImgWithTextSection({img,title,description,flex}) {
  return (
    <section className={`px-[4%] mt-20 flex items-center ${flex} justify-between md:flex-col md:mt-4`}>
    <div className="w-[45%] flex flex-col md:w-full">
      <p
        className="text-blue-500 font-bold mb-4"
        style={{ fontSize: "clamp(1rem, 0.5385rem + 2.0513vw, 3rem)" }}
      >
        {title}
      </p>
      <p className="text-[#07043B] text-lg">
        {description}
      </p>
    </div>
    <img className="w-[45%] md:w-full" src={img} alt="image1" />
  </section>
  )
}

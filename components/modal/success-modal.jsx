'use client';
import { MdClose } from "react-icons/md";

const SuccessModal = ({setShowModal,title,subtitle}) => {
  return (
    <div className="w-[462px] h-[86px] px-6 border rounded-lg flex flex-col justify-center relative">
        <MdClose onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-lg font-light text-gray-500"/>
        <h1 className="text-lg font-bold">{title}</h1>
        <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
  )
}

export default SuccessModal
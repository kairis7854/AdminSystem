import { useState } from 'react'
import { SquarePlus } from 'lucide-react';
import AppPagination from '../../../components/common/AppPagination.jsx'
import ComputerDialog from './ComputerDialog.jsx'
import './computer.scss'
import MacBookNeo from '../../../assets/MacBookNeo.jpg'

export async function loader({ request, params }) {
    return null
}
export default function Computer() {
    const [isOpen, setIsOpen] = useState(false)  //彈窗開關




    return (
        <div className='computer flex flex-col '>
            {/* 新增商品 */}
            <div className='flex  self-end pr-[20px] pb-[20px] cursor-pointer'>
                <SquarePlus className='h-[26px] w-[26px] text-[#1DA57A]' />
                <span className='text-[18px] text-[#1DA57A] ml-[9px]' onClick={() => { setIsOpen(true); setMobileData({ type: 'add', data: {} }) }}>新增商品 </span>
            </div>

            {/* 卡片 */}
            <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[20px] items-start mb-[20px]'>
                <div className="flex flex-col flex-start bg-white border border-gray-200 rounded-[5px] overflow-hidden shadow-sm">
                    <div className="aspect-[4/3] w-full flex items-center justify-center p-[10px] ">
                        <img
                            src={MacBookNeo}
                            className="w-full  object-contain"
                            alt="product"
                        />
                    </div>
                    <div className="flex flex-col p-[10px]">
                        <h3 className="text-sm font-medium text-gray-700 truncate ">MacBook Neo</h3>
                        <span className='text-xs text-[gray] mb-[10px]'>Apple</span>
                        <span className="text-base font-bold text-gray-900">NT${'19900'}</span>
                    </div>
                </div>
                <div className="flex flex-col flex-start bg-white border border-gray-200 rounded-[5px] overflow-hidden shadow-sm">
                    <div className="aspect-[4/3] w-full flex items-center justify-center p-[10px] ">
                        <img
                            src={MacBookNeo}
                            className="w-full  object-contain"
                            alt="product"
                        />
                    </div>
                    <div className="flex flex-col p-[10px]">
                        <h3 className="text-sm font-medium text-gray-700 truncate ">MacBook Neo</h3>
                        <span className='text-xs text-[gray] mb-[10px]'>Apple</span>
                        <span className="text-base font-bold text-gray-900">NT${'19900'}</span>
                    </div>
                </div>
            </div>


            {/* 頁面選擇 */}
            <div className='self-end pr-[20px]'>
                <AppPagination currentPage={5} setCurrentPage={5} totalPages={5} />
            </div>

            {/* 彈窗 */}
            <ComputerDialog isOpen={isOpen} setIsOpen={setIsOpen} mobileData={null} />
        </div>
    )
}


export { Computer as Component } 
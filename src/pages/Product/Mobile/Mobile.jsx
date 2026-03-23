import { useState } from 'react'
import { SquarePlus } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux'
import { updateMobile, deleteMobile } from '../../../store/modules/productStore.jsx'
import { toast } from "sonner"
import MobileDialog from './MobileDialog.jsx'
import MobileTable from './MobileTable.jsx'
import AppPagination from '../../../components/common/AppPagination.jsx'
import './mobile.scss'


export async function loader({ request, params }) {
    return null
}

export default function Mobile() {
    const [isOpen, setIsOpen] = useState(false)  //彈窗開關
    const [mobileData, setMobileData] = useState({ type: null, data: {} })  //表單資料
    const { mobiles } = useSelector((state) => state.product);
    const dispatch = useDispatch()

    // 分頁邏輯開始
    const [currentPage, setCurrentPage] = useState(1); //當前頁數
    const itemsPerPage = 6; //每頁顯示筆數
    const totalPages = Math.ceil(mobiles.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage; // 目前最後一筆 
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 目前第一筆
    const currentItems = mobiles.slice(indexOfFirstItem, indexOfLastItem);
    // 分頁邏輯結束

    const changeSell = (item) => {
        const newStatus = item.onSell ? false : true;
        dispatch(updateMobile({ ...item, onSell: newStatus }));
        newStatus ? toast.success('商品已上架') : toast.success('商品已下架');
    }

    const onDelete = (id) => {
        const isConfirmed = window.confirm("確定要刪除嗎？");
        if (isConfirmed) {
            dispatch(deleteMobile(id));
            toast.success('刪除成功');

            if (currentItems.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1)
            }
        }
    }

    return (
        <div className='mobile flex flex-col'>
            {/* 新增商品 */}
            <div className='flex  self-end pr-[20px] pb-[20px] cursor-pointer'>
                <SquarePlus className='h-[26px] w-[26px] text-[#1DA57A]' />
                <span className='text-[18px] text-[#1DA57A] ml-[9px]' onClick={() => { setIsOpen(true); setMobileData({ type: 'add', data: {} }) }}>新增商品 </span>
            </div>

            {/* 列表 */}
            <div className='mb-[20px]'>
                <MobileTable data={currentItems} changeSell={changeSell} setIsOpen={setIsOpen} setMobileData={setMobileData} onDelete={onDelete}/>
            </div>

            {/* 頁面選擇 */}
            <div className='self-end pr-[20px]'>
                <AppPagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
            </div>

            {/* 彈窗 */}
            <MobileDialog isOpen={isOpen} setIsOpen={setIsOpen} mobileData={mobileData} />
        </div>
    )
}

export { Mobile as Component } 
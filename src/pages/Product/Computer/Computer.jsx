import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCompunter } from '../../../store/modules/productStore.jsx'
import { SquarePlus } from 'lucide-react';
import { toast } from "sonner"
import AppPagination from '../../../components/common/AppPagination.jsx'
import ComputerDialog from './ComputerDialog.jsx'
import ComputerCard from './ComputerCard.jsx'
import './computer.scss'

export async function loader({ request, params }) {
    return null
}

export default function Computer() {
    const [isOpen, setIsOpen] = useState(false)  //彈窗開關
    const [computerData, setComputerData] = useState({ type: null, data: {} })  //選中的卡片資料
    const { computers } = useSelector((state) => state.product)
    const dispatch = useDispatch()

    // 分頁邏輯開始
    const [currentPage, setCurrentPage] = useState(1); //當前頁數
    const [itemsPerPage, setItemsPerPage] = useState(10); //每頁顯示卡片數，RWD
    const [gridCols, setGridCols] = useState('grid-cols-5'); //每頁顯示列數(grid)，RWD

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setItemsPerPage(4);
                setGridCols('grid-cols-2');
            } else if (width < 1024) {
                setItemsPerPage(6);
                setGridCols('grid-cols-3');
            } else if (width < 1200) {
                setItemsPerPage(10);
                setGridCols('grid-cols-5');
            } else {
                setItemsPerPage(12);
                setGridCols('grid-cols-6');
            }
            setCurrentPage(1);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const totalPages = Math.ceil(computers.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage; // 目前最後一筆 
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 目前第一筆
    const currentItems = computers.slice(indexOfFirstItem, indexOfLastItem);
    // 分頁邏輯結束

    const onDelete = (id) => {
        const isConfirmed = window.confirm("確定要刪除嗎？");
        if (isConfirmed) {
            dispatch(deleteCompunter(id));
            toast.success('刪除成功');
            setIsOpen(false);
            if (currentItems.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1)
            }
        }
    };

    return (
        <div className='computer flex flex-col flex-1 min-w-0'>
            {/* 新增商品 */}
            <div className='flex  self-end pr-[20px] pb-[20px] cursor-pointer' onClick={() => { setIsOpen(true); setComputerData({ type: 'add', data: {} }) }}>
                <SquarePlus className='h-[26px] w-[26px] text-[#1DA57A]' />
                <span className='text-[18px] text-[#1DA57A] ml-[9px]' >新增商品 </span>
            </div>

            {/* 卡片 */}
            <div className={`grid gap-[20px] items-stretch w-full ${gridCols}`} >
                <ComputerCard data={currentItems} setIsOpen={setIsOpen} setComputerData={setComputerData}/>
            </div>

            {/* 頁面選擇 */}
            <div className='mt-auto ml-auto pr-[20px] pt-[20px]'>
                <AppPagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
            </div>

            {/* 彈窗 */}
            <ComputerDialog isOpen={isOpen} setIsOpen={setIsOpen} computerData={computerData} onDelete={onDelete} />
        </div>
    )
}


export { Computer as Component } 
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCompunter } from '../../../store/modules/productStore.jsx'
import { SquarePlus, Search } from 'lucide-react';
import { toast } from "sonner"
import AppPagination from '../../../components/common/AppPagination.jsx'
import ComputerDialog from './ComputerDialog.jsx'
import ComputerCard from './ComputerCard.jsx'
import './computer.scss'

export async function loader({ request, params }) {
    return null
}

export default function Computer() {
    const dispatch = useDispatch()
    const { computers } = useSelector((state) => state.product)
    const [isOpen, setIsOpen] = useState(false)  //彈窗開關
    const [computerData, setComputerData] = useState({ type: null, data: {} })  //彈窗資料

    const [currentPage, setCurrentPage] = useState(1); //分頁，當前頁數
    const [totalPages, setTotalPages] = useState(1);   //分頁，總頁數

    const [searchData, setSearchData] = useState(null) //收尋資料
    const [cardList, setCardList] = useState(computers) //卡片資料

    //設置查詢
    const onSearch = (item) => {
        if (item === '') {
            setSearchData(null)
        } else {
            setSearchData(item.toLowerCase());
        }
        setCurrentPage(1)
    }


    // RWD分頁邏輯
    const [itemsPerPage, setItemsPerPage] = useState(10); //每頁顯示卡片數，RWD
    const [gridCols, setGridCols] = useState('grid-cols-5'); //每頁顯示列數(grid)，RWD

    useEffect(() => { //響應式 grid
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setItemsPerPage(4);
                setGridCols('grid-cols-2');
            } else if (width < 1024) {
                setItemsPerPage(6);
                setGridCols('grid-cols-3');
            } else if (width < 1200) {
                setItemsPerPage(8);
                setGridCols('grid-cols-4');
            } else {
                setItemsPerPage(10);
                setGridCols('grid-cols-5');
            }
            setCurrentPage(1);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => { //分頁邏輯
        const filteredComputers = searchData
            ? computers.filter(item =>
                item.name?.toLowerCase().includes(searchData) ||
                item.brand?.toLowerCase().includes(searchData)
            )
            : computers;
        const total = Math.ceil(filteredComputers.length / itemsPerPage) || 1;
        setTotalPages(total);//總頁數

        const indexOfLastItem = currentPage * itemsPerPage; // 目前最後一筆 
        const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 目前第一筆
        const currentItems = filteredComputers.slice(indexOfFirstItem, indexOfLastItem);
        setCardList(currentItems)//當前頁面卡片資料
    }, [currentPage, computers, searchData, itemsPerPage])


    //設置刪除
    const onDelete = (id) => {
        const isConfirmed = window.confirm("確定要刪除嗎？");
        if (isConfirmed) {
            dispatch(deleteCompunter(id));
            toast.success('刪除成功');
            setIsOpen(false);
            if (cardList.length === 1 && currentPage > 1) {
                setCurrentPage(prev => prev - 1)
            }
        }
    };

    return (
        <div className='computer flex flex-col'>
            <div className='flex justify-between items-center mb-[10px]'>
                {/* 查詢商品 */}
                <div className="relative flex items-center w-full max-w-sm">
                    <input
                        type="text"
                        onChange={(e) => onSearch(e.target.value)}
                        placeholder="請輸入關鍵字(廠牌,型號)"
                        className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1DA57A] focus:border-transparent pr-12 transition-all"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pl-2 border-l border-gray-300 my-2 cursor-pointer hover:text-blue-600 group" >
                        <Search className="h-4 w-4 text-gray-400 group-hover:text-[#1DA57A] transition-colors" />
                    </div>
                </div>
                {/* 新增商品 */}
                <div className='flex self-end cursor-pointer' onClick={() => { setIsOpen(true); setComputerData({ type: 'add', data: {} }) }}>
                    <SquarePlus className='h-[26px] w-[26px] text-[#1DA57A]' />
                    <span className='text-[18px] text-[#1DA57A] ml-[9px]' >新增商品 </span>
                </div>
            </div>

            {/* 卡片 */}
            <div className={`grid gap-[20px] w-full min-h-0 ${gridCols}  mb-[20px]`  } >
                <ComputerCard data={cardList} setIsOpen={setIsOpen} setComputerData={setComputerData} />
            </div>

            {/* 頁面選擇 */}
            <div className='mt-auto ml-auto pr-[20px] '>
                <AppPagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
            </div>

            {/* 彈窗 */}
            <ComputerDialog isOpen={isOpen} setIsOpen={setIsOpen} computerData={computerData} onDelete={onDelete} />
        </div>
    )
}


export { Computer as Component } 
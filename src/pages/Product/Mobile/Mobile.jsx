import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateMobile, deleteMobile } from '../../../store/modules/productStore.jsx'
import { SquarePlus, Search } from 'lucide-react';
import { toast } from "sonner"
import MobileDialog from './MobileDialog.jsx'
import MobileTable from './MobileTable.jsx'
import AppPagination from '../../../components/common/AppPagination.jsx'
import './mobile.scss'


export async function loader({ request, params }) {
    return null
}

export default function Mobile() {
    const dispatch = useDispatch()
    const { mobiles } = useSelector((state) => state.product);
    const [isOpen, setIsOpen] = useState(false)  //彈窗開關
    const [dialogData, setDialogData] = useState({ type: null, data: {} })  //彈窗資料
    const [currentPage, setCurrentPage] = useState(1); // 分頁，當前頁碼
    const [totalPages, setTotalPages] = useState(1);   // 分頁，總頁數
    const [searchData, setSearchData] = useState(null) //搜尋資料
    const [table, setTable] = useState(mobiles) //列表資料

    //設置查詢
    const onSearch = (item) => {
        if (item === null) {
            setSearchData(null)
        } else {
            setSearchData(item.toLowerCase());
        }
        setCurrentPage(1)
    }

    //分頁邏輯
    useEffect(() => {
        const itemsPerPage = 6; //每頁顯示筆數
        const filteredMobiles = searchData
            ? mobiles.filter(item =>
                item.brand?.toLowerCase().includes(searchData) ||
                item.model?.toLowerCase().includes(searchData)
            )
            : mobiles;
        const total = Math.ceil(filteredMobiles.length / itemsPerPage) || 1;
        setTotalPages(total);

        const indexOfLastItem = currentPage * itemsPerPage; // 目前最後一筆 
        const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 目前第一筆
        const currentItems = filteredMobiles.slice(indexOfFirstItem, indexOfLastItem);
        setTable(currentItems)
        
    }, [currentPage, mobiles, searchData])

    //商品上架
    const changeSell = (item) => {
        const newStatus = item.onSell ? false : true;
        dispatch(updateMobile({ ...item, onSell: newStatus }));
        newStatus ? toast.success('商品已上架') : toast.success('商品已下架');
    }

    //刪除商品
    const onDelete = (id) => {
        const isConfirmed = window.confirm("確定要刪除嗎？");
        if (isConfirmed) {
            dispatch(deleteMobile(id));
            toast.success('刪除成功');

            if (table.length === 1 && currentPage > 1) {
                setCurrentPage(1)
            }
        }
    }

    return (
        <div className='mobile flex flex-col'>
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
                <div className='flex  self-end pr-[20px] pb-[20px] cursor-pointer' onClick={() => { setIsOpen(true); setDialogData({ type: 'add', data: {} }) }}>
                    <SquarePlus className='h-[26px] w-[26px] text-[#1DA57A]' />
                    <span className='text-[18px] text-[#1DA57A] ml-[9px]' >新增商品 </span>
                </div>
            </div>

            {/* 列表 */}
            <div className='mb-[20px]'>
                <MobileTable data={table} changeSell={changeSell} setIsOpen={setIsOpen} setDialogData={setDialogData} onDelete={onDelete} />
            </div>

            {/* 頁面選擇 */}
            <div className='mt-auto ml-auto pr-[20px]'>
                <AppPagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
            </div>

            {/* 彈窗 */}
            <MobileDialog isOpen={isOpen} setIsOpen={setIsOpen} dialogData={dialogData} />
        </div>
    )
}

export { Mobile as Component } 
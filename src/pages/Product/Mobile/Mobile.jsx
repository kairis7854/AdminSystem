import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SquarePlus, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination'
import { useSelector, useDispatch } from 'react-redux'
import { updateMobile, deleteMobile } from '../../../store/modules/productStore.jsx'
import { toast } from "sonner"
import MobileDialog from './MobileDialog.jsx'
import './mobile.scss'

export async function loader({ request, params }) {
    return null
}

export default function Mobile() {
    const [isOpen, setIsOpen] = useState(false)
    const [mobileData, setMobileData] = useState({ type: null, data: {} })
    const { mobiles } = useSelector((state) => state.product);
    const dispatch = useDispatch()

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
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">廠牌</TableHead>
                            <TableHead>型號</TableHead>
                            <TableHead>規格</TableHead>
                            <TableHead>建議售價</TableHead>
                            <TableHead className="text-center">狀態</TableHead>
                            <TableHead className="text-center">操作</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mobiles.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.brand}</TableCell>
                                <TableCell>{item.model}</TableCell>
                                <TableCell>{item.spec}</TableCell>
                                <TableCell>${item.price}</TableCell>
                                <TableCell>
                                    {
                                        item.onSell === true ?
                                            <div className="flex flex-col items-center gap-1 py-2">
                                                <div className='bg-[#ff4d4f] text-white px-4 py-2 cursor-pointer' onClick={() => { changeSell(item) }}> 下架  </div>
                                                <span className='text-green-600 '>在售</span>
                                            </div>
                                            : <div className="flex flex-col items-center gap-1 py-2">
                                                <div className='bg-[#1DA57A] text-white px-4 py-2 cursor-pointer' onClick={() => { changeSell(item) }}> 上架 </div>
                                                <span className='text-black '>已停售</span>
                                            </div>
                                    }
                                </TableCell>
                                <TableCell className=" ">
                                    <div className='flex justify-center items-center text-[#1DA57A] cursor-pointer'>
                                        <div
                                            className='mr-5'
                                            onClick={() => {
                                                setIsOpen(true);
                                                setMobileData({ type: 'edit', data: item })
                                            }}
                                        >修改</div>
                                        <div onClick={() => { onDelete(item.id) }}>刪除</div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* 頁面選擇 */}
            <div className='self-end pr-[20px]'>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationLink href='#' aria-label='Go to previous page' size='icon'>
                                <ChevronLeftIcon className='size-4' />
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href='#'>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href='#' isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href='#'>3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href='#' aria-label='Go to next page' size='icon'>
                                <ChevronRightIcon className='size-4' />
                            </PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

                {/* 彈窗 */}
                <MobileDialog isOpen={isOpen} setIsOpen={setIsOpen} mobileData={mobileData} />
            </div>
        </div>
    )
}

export { Mobile as Component } 
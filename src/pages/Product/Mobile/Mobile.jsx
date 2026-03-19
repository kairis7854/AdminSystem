import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SquarePlus, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination'
import './mobile.scss'
import MobileDialog from './MobileDialog.jsx'

export async function loader({ request, params }) {
    return null
}

export default function Mobile() {
    const [isOpen, setIsOpen] = useState(false)
    const [mobileData, setMobileData] = useState(null)

    return (
        <div className='mobile flex flex-col'>
            {/* 新增商品 */}
            <div className='flex  self-end pr-[20px] pb-[20px] cursor-pointer'>
                <SquarePlus className='h-[26px] w-[26px] text-[#1DA57A]' />
                <span className='text-[18px] text-[#1DA57A] ml-[9px]' onClick={() => { setIsOpen(true) }}>新增商品 </span>
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
                        {mobileProducts.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.brand}</TableCell>
                                <TableCell>{item.model}</TableCell>
                                <TableCell>{item.spec}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col items-center gap-1 py-2">
                                        <div className='bg-[#ff4d4f] text-white px-4 py-2 cursor-pointer'>
                                            上架
                                        </div>
                                        <span className='text-green-600 '>
                                            在售
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className=" ">
                                    <div className='flex justify-center items-center text-[#1DA57A] cursor-pointer'>
                                        <div className='mr-5'>修改</div>
                                        <div>刪除</div>
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
                <MobileDialog open={isOpen} onOpenChange={setIsOpen} mobileData={mobileData} />
            </div>
        </div>
    )
}



const mobileProducts = [
    {
        id: "M001",
        brand: "Apple",
        model: "iPhone 15 Pro",
        spec: "256GB / 原色鈦金屬",
        price: "NT$ 40,400",
        status: "上架",
    },
    {
        id: "M002",
        brand: "Samsung",
        model: "Galaxy S24 Ultra",
        spec: "512GB / 鈦灰",
        price: "NT$ 43,900",
        status: "下架",
    },
    {
        id: "M003",
        brand: "Google",
        model: "Pixel 8 Pro",
        spec: "128GB / 海灣藍",
        price: "NT$ 33,900",
        status: "上架",
    },
    {
        id: "M001",
        brand: "Apple",
        model: "iPhone 15 Pro",
        spec: "256GB / 原色鈦金屬",
        price: "NT$ 40,400",
        status: "上架",
    },
    {
        id: "M002",
        brand: "Samsung",
        model: "Galaxy S24 Ultra",
        spec: "512GB / 鈦灰",
        price: "NT$ 43,900",
        status: "下架",
    },
    {
        id: "M003",
        brand: "Google",
        model: "Pixel 8 Pro",
        spec: "128GB / 海灣藍",
        price: "NT$ 33,900",
        status: "上架",
    },
];

export { Mobile as Component } 
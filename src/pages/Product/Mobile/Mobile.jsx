import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import './mobile.scss'


export async function loader({ request, params }) {
    return null
}


export default function Mobile() {
    return (
        <div className='mobile'>
            {TableDemo()}
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
    }
];

export function TableDemo() {
    return (
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
                            <div className="flex flex-col items-center gap-1 py-3">
                                <div className='bg-[#ff4d4f] text-white px-4 py-2'>
                                    上架
                                </div>
                                <span className='text-green-700 font-bold'>
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
    )
}

export { Mobile as Component } 
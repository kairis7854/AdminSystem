import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


export default function ({ data, changeSell, setIsOpen, setDialogData, onDelete }) {


    return (
        <Table className="table-fixed ">
            <TableHeader>
                <TableRow>
                    <TableHead className="max-w-[150px]">廠牌</TableHead>
                    <TableHead>型號</TableHead>
                    <TableHead>規格</TableHead>
                    <TableHead>建議售價</TableHead>
                    <TableHead className="text-center">狀態</TableHead>
                    <TableHead className="text-center">操作</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell className="truncate font-medium">{item.brand}</TableCell>
                        <TableCell className="truncate">{item.model}</TableCell>
                        <TableCell className="truncate">{item.spec}</TableCell>
                        <TableCell className="truncate">${item.price}</TableCell>
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
                                        setDialogData({ type: 'edit', data: item })
                                    }}
                                >修改</div>
                                <div onClick={() => { onDelete(item.id) }}>刪除</div>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

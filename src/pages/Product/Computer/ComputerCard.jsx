import React from 'react'

export default function ComputerCard({data,setIsOpen,setComputerData}) {

    return (
        data.map((item) => (
            <div
                className="flex flex-col flex-start bg-white border border-gray-200 rounded-[5px] overflow-hidden shadow-sm cursor-pointer h-full"
                key={item.id}
                onClick={() => { setIsOpen(true); setComputerData({ type: 'edit', data: item }) }
                }
            >
                <div className=" h-full w-full flex items-center justify-center p-[10px] ">
                    {item.image ? (
                        <img src={item.image} className="w-full h-full object-contain" alt={item.name} />
                    ) : (
                        <div className="w-full h-full aspect-[4/3] bg-gradient-to-bl from-slate-200 via-blue-200 to-indigo-200" />
                    )}
                </div>
                <div className="flex flex-col p-[10px] mt-auto">
                    <h3 className="text-sm font-medium text-gray-700 truncate ">{item.name}</h3>
                    <span className='text-xs text-[gray] mb-[10px]'>{item.brand}</span>
                    <span className="text-base font-bold text-gray-900">NT${item.price.toLocaleString()}</span>
                </div>
            </div>
        )
        )

    )
}

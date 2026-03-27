import React from 'react'

export default function ComputerCard({ data, setIsOpen, setComputerData }) {

    return (
        data.map((item) => (
            <div
                className="group flex flex-col bg-white border border-gray-200 rounded-[5px] overflow-hidden shadow-sm cursor-pointer 
                transition-all duration-220 ease-in-out 
                hover:shadow-md hover:-translate-y-1 hover:border-gray-300"
                key={item.id}
                onClick={() => { setIsOpen(true); setComputerData({ type: 'edit', data: item }) }
                }
            >
                <div className="flex items-center justify-center flex-1 min-h-0 w-full p-[10px] ">
                    {item.image ? (
                        <img src={item.image} className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-105" alt={item.name} />
                    ) : (
                        <div className="w-full h-full aspect-[4/3] bg-gradient-to-bl from-slate-200 via-blue-200 to-indigo-200 transition-transform duration-200 group-hover:scale-105" />
                    )}
                </div>
                <div className="flex flex-col p-[10px] mt-auto">
                    <h3 className="text-sm font-medium text-gray-700 truncate">{item.name}</h3>
                    <span className='text-xs text-[gray] mb-[10px] truncate '>{item.brand}</span>
                    <span className="text-base font-bold text-gray-900 truncate ">NT${item.price.toLocaleString()}</span>
                </div>
            </div>
        ))
    )
}

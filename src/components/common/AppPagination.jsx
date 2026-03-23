import React from 'react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

export default function AppPagination({ currentPage, setCurrentPage, totalPages }) {


    return (
        <Pagination>
            <PaginationContent>
                {/* 上一頁 */}
                <PaginationItem>
                    <PaginationLink
                        href='#'
                        onClick={(e) => { e.preventDefault(); if (currentPage > 1) setCurrentPage(currentPage - 1) }}
                        size='icon'
                    >
                        <ChevronLeftIcon className='size-4' />
                    </PaginationLink>
                </PaginationItem>

                {/* 總頁數 */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            href='#'
                            isActive={currentPage === page} 
                            onClick={(e) => { e.preventDefault(); setCurrentPage(page) }}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* 下一頁 */}
                <PaginationItem>
                    <PaginationLink
                        href='#'
                        onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) setCurrentPage(currentPage + 1) }}
                        size='icon'
                    >
                        <ChevronRightIcon className='size-4' />
                    </PaginationLink>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

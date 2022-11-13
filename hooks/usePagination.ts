import { useState } from "react"

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
}

export const usePagination = ({currentPage, totalItems, itemsPerPage}: PaginationProps) => {
    const [currPage, setCurrPage] = useState(currentPage);

    const handlePrevPage = () => {
        currPage >= 1 && setCurrPage(prev => prev - 1);
    }

    const handleNextPage = () => {        
        const res = totalItems > ((currPage + 1) * itemsPerPage) && totalItems - ((currPage + 1) * itemsPerPage); 
               
        res > 0 && setCurrPage(prev => prev + 1);
    }

    return {currPage, handleNextPage, handlePrevPage, itemsPerPage, totalItems, setCurrPage}
}
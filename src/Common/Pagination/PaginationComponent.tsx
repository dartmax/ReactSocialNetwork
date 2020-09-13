import React, {FC, useState} from 'react';
import styles from './Pagination.module.css';
import cn from 'classnames';

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage?: number
    onPageChanged?: (pageNumber: number) => void
    portionSize?: number
}

let PaginationComponent: FC<PropsType> = ({
    totalUsersCount,
    pageSize,
    currentPage = 1,
    onPageChanged = x => x,
    portionSize = 10
}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages: Array<number> = [];
    for (let i = 0; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={cn(styles.paginator)}>
        { portionCount > 1 && <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button> }
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
            return <span className={cn({[styles.selectedPage]: currentPage === p}, styles.pageNumber)}
                        key={p}
                        onClick={(e) => {
                        onPageChanged(p);
        }}>{p}</span>
        })}
        { portionCount > portionNumber && <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button> }
    </div>
}

export default PaginationComponent;
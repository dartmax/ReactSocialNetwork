import React, {useState} from "react";
import styles from "./Pagination.module.css";
import cn from "classnames";

let PaginationComponent = ({totalUsersCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 0; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={styles.paginator}>
        { portionCount > 1 && <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button> }
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
            return <span className={cn({[styles.selectedPage]: currentPage === p}, styles.selectedPage)}
                        key={p}
                        onClick={(e) => {
                        onPageChanged(p);
        }}>{p}</span>
        })}
        { portionCount > portionNumber && <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button> }
    </div>
}

export default PaginationComponent;
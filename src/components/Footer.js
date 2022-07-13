import React from 'react';
import { memo } from 'react';

const Footer = (props) => {
    const { status, setStatusFilter, numOfTodosLeft, numOfTodos, clearComplete } = props;
    const filterBtns = [
        {
            title: 'All',
            isActived: status === 'ALL',
            onClick: () => setStatusFilter('ALL'),
            link: '',
        },
        {
            title: 'Active',
            isActived: status === 'ACTIVE',
            onClick: () => setStatusFilter('ACTIVE'),
            link: 'active',
        },
        {
            title: 'Completed',
            isActived: status === 'COMPLETED',
            onClick: () => setStatusFilter('COMPLETED'),
            link: 'completed',
        },
    ];

    return (
        <>
            {numOfTodos ? (
                <footer className="text-[#777] py-[10px] px-[15px] h-[40px] text-center border-t border-solid border-[#e6e6e6] before:content-[''] before:absolute before:right-0 before:bottom-0 before:left-0 before:h-[50px] before:overflow-hidden before:shadow-[0_1px_1px_rgb(0,0,0,20%),0_8px_0_-3px_#f6f6f6,0_9px_1px_-3px_rgb(0,0,0,20%),0_16px_0_-6px_#f6f6f6,0_17px_2px_-6px_rgb(0,0,0,20%)]">
                    <span className="float-left text-left">
                        <span>{numOfTodosLeft}</span>
                        <span> </span>
                        <span>{numOfTodosLeft <= 1 ? 'item' : 'items'}</span>
                        <span> left</span>
                    </span>
                    <ul className="m-0 p-0 list-none absolute right-0 left-0">
                        {filterBtns.map((btn) => (
                            <FilterBtn key={`btn${btn.title}`} {...btn} />
                        ))}
                    </ul>
                    {numOfTodos > numOfTodosLeft && (
                        <button
                            className="float-right relative leading-[20px] no-underline cursor-pointer active:float-right active:relative active:leading-[20px] active:no-underline active:cursor-pointer"
                            onClick={clearComplete}
                        >
                            Clear completed
                        </button>
                    )}
                </footer>
            ) : (
                ''
            )}
        </>
    );
};

const FilterBtn = memo((props) => {
    const { title, isActived, onClick, link } = props;
    return (
        <>
            <li className="inline">
                <a
                    href={`#/${link}`}
                    className={`m-[3px] py-[3px] px-[7px] no-underline rounded-[3px] ${
                        isActived ? 'border border-solid border-[#af2f2f33]' : ''
                    } `}
                    onClick={onClick}
                >
                    {title}
                </a>
            </li>
        </>
    );
});

export default memo(Footer);

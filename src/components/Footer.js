import React from 'react';
import { memo } from 'react';

const Footer = (props) => {
    const { status, setStatusFilter, numOfTodosLeft, numOfTodos,clearComplete } = props;
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
        <footer className="footer">
            <span className="todo-count">
                <strong>{numOfTodosLeft}</strong>
                <span> </span>
                <span>{numOfTodosLeft <= 1 ? 'item' : 'items'}</span>
                <span> left</span>
            </span>
            <ul className="filters">
                {filterBtns.map((btn) => (
                    <FilterBtn key={`btn${btn.title}`} {...btn} />
                ))}
            </ul>
            {numOfTodos > numOfTodosLeft && <button className="clear-completed" onClick={clearComplete}>Clear completed</button>}
        </footer>
    );
};

const FilterBtn = memo((props) => {
    const { title, isActived, onClick, link } = props;
    return (
        <>
            <li>
                <a href={`#/${link}`} className={`${isActived ? 'selected' : ''}`} onClick={onClick}>
                    {title}
                </a>
            </li>
        </>
    );
});

export default memo(Footer);

import React from 'react';
import { memo } from 'react';
import Todo from './Todo';

const TodoList = (props) => {
    const { todoList, isCheckedAll, checkAlltodos } = props;
    return (
        <section className="relative z-[2] border-t border-solid border-[#e6e6e6]">
            <input
                className="bg-none cursor-default box-border my-[3px] mr-[4px] ml-[4px] p-[initial] border-[initial] text-center opacity-0 absolute border-0
                    bg-[initial] cursor-default box-border my-[3px] mr-[3px] ml-[4px] p-[initial] border-[initial]
                    peer
                    "
                type="checkbox"
                checked={isCheckedAll}
            />
            <label
                className="w-[60px] h-[34px] text-[0] absolute top-[-52px] left-[-8px] rotate-90 before:content-['❯'] before:text-[22px] before:text-[#e6e6e6] before:py-[10px] before:px-[30px] peer-checked:before:text-[#737373]"
                htmlFor="toggle-all"
                onClick={checkAlltodos}
            ></label>
            <ul className="m-[0] p-[0] list-none">
                {todoList.map((todo, index) => (
                    <Todo key={`todo${todo.id}`} {...{ todo }} {...props} index={index} />
                ))}
            </ul>
        </section>
    );
};

export default memo(TodoList);

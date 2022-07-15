import React from 'react';
import { memo, useState, useRef , useEffect } from 'react';

const Header = (props) => {
    const nameRef = useRef();
    const [text, setText] = useState('');
    const { addTodo, isCheckedAll, todoList } = props;
    const onAddTodo = (e = {}) => {
        const newText = text.trim();
        console.log(todoList);
        const checkItemSimilar =
            todoList.length > 0 ? !(todoList.filter((todo) => todo.text === newText).length >= 1) : true;
        if (e.key === 'Enter' && newText !== '' && checkItemSimilar) {
            addTodo({
                id: new Date().valueOf(),
                text: newText,
                isCompleted: false,
            });
            setText('');
            nameRef.current.focus();
        }
    };
    useEffect (()=>{
        localStorage.setItem('TODO' , JSON.stringify(todoList))
    },[todoList,addTodo])

    return (
        <header className="header">
            <h1 className="absolute top-[-146px] w-[100%] text-[100px] font-[480] text-center text-[#af2f2f26]">
                todos
            </h1>
            <input
                ref={nameRef}
                className="placeholder:italic placeholder:opacity-0.00002 relative outline-none m-0 w-[100%] text-[24px] font-[inherit] leading-[1.4rem] p-[6px] shadow-[inset_0_-1px_5px_0_rgba(0,0,0,0.2)] box-border py-[16px] pr-[16px] pl-[60px] bg-[#00000001] shadow-[inset_0_-2px_1px_rgba(0,0,0,0.03)]"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => onAddTodo(e)}
                checked={isCheckedAll}
                placeholder="What needs to be done ?"
            />
        </header>
    );
};

export default memo(Header);

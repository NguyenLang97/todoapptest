import React from 'react';
import { memo, useState } from 'react';

const Todo = (props) => {
    const { todo, getTodoEditingId, todoEditingId, onEditTodo, index, markCompleted, removeTodo } = props;
    const isEditing = todoEditingId === todo.id;
    const [text, setText] = useState(todo.text);
    const editTodo = () => {
        onEditTodo({ ...todo, text }, index);
    };

    return (
        <li
            className={`${isEditing ? 'last:mb-[-1px]' : ''} ${
                todo.isCompleted ? 'completed' : ''
            } border-b-0 p-0 relative text-[24px] border-b border-solid border-[#ededed] group`}
        >
            {!isEditing ? (
                <div className="view">
                    <input
                        className="h-[40px] bg-none opacity-0 text-center 
                        w-[40px] h-auto absolute top-0 bottom-0 my-auto 
                        mx-0 border-0 appearance-none
                        cursor-default box-border my-[3px] mr-[4px] ml-[4px] p-[initial] border-[initial] bg-[initial] cursor-default box-border my-[3px] mr-[3px] ml-[4px] p-[initial] border-[initial] peer"
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={() => markCompleted(todo.id)}
                    />
                    <label
                        className="bg-hero-pattern bg-no-repeat bg-[center_left] py-[15px] pr-[15px] pl-[60px] block leading-[1.2] transition-[color_0.4s] 
                        peer-checked:bg-footer-texture
                        peer-checked:text-[#d9d9d9] peer-checked:line-through "
                        onDoubleClick={() => {
                            getTodoEditingId(todo.id);
                        }}
                    >
                        {todo.text}
                    </label>
                    <button
                        className="hidden absolute top-0 right-[10px] bottom-[0] w-[40px] h-[40px] my-auto mx-0 text-[30px] text-[#cc9a9a] mb-[11px] transition-[color_0.2s_ease-out] group-hover:text-[#af5b5e] group-hover:block after:content-['x'] m-0 p-0 border-0 bg-none text-[100%] align-baseline font-[inherit] appearance-none"
                        onClick={() => removeTodo(todo.id)}
                    ></button>
                </div>
            ) : (
                <input
                    className="relative m-0 w-[100%] text-[24px] font-[inherit] leading-[1.4rem] p-[6px] border border-solid border-[#999] shadow-[inset_0_-1px_5px_0_rgba(0,0,0,0.2)] box-border block w-[90%] py-[12px] px-[16px] my-0 mr-0 ml-[10%] "
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={editTodo}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            editTodo();
                        }
                    }}
                />
            )}
        </li>
    );
};

export default memo(Todo);

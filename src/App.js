import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import store from './store';

// Components
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

// CSS
import './index.css';
import './App.css';

const isNotCheckedAll = (todos = []) => todos.find((todo) => !todo.isCompleted);

const filterByStatus = (todos = [], status = '', id = '') => {
    switch (status) {
        case 'ACTIVE':
            return todos.filter((todo) => !todo.isCompleted);
        case 'COMPLETED':
            return todos.filter((todo) => todo.isCompleted);
        case 'REMOVE':
            return todos.filter((todo) => todo.id !== id);
        default:
            return todos;
    }
};
const initStoreage = JSON.parse(localStorage.getItem('TODO')) || []
console.log(initStoreage)

class App extends PureComponent {
    state = {
        todoList: initStoreage,
        todoEditingId: '',
        isCheckedAll: false,
        status: 'ALL',
    };

    componentDidMount() {
        this.setState({
            isCheckedAll: !isNotCheckedAll(this.state.todoList),
        });
    }

    addTodo = (todo) => {
        this.setState((preState) => ({
            todoList: [...preState.todoList, todo],
        }));
    };

    getTodoEditingId = (id) => {
        this.setState({ todoEditingId: id });
    };

    onEditTodo = (todo, index) => {
        if (index >= 0) {
            const { todoList: list } = this.state;
            // const list = [...this.state.todoList]
            list.splice(index, 1, todo);
            this.setState({ todoList: list, todoEditingId: '' });
        }
    };

    markCompleted = (id) => {
        const { todoList } = this.state;
        const updatedList = todoList.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
        );
        this.setState((preState) => ({
            todoList: updatedList,
            isCheckedAll: !isNotCheckedAll(updatedList),
        }));
    };

    checkAlltodos = () => {
        const { todoList, isCheckedAll } = this.state;
        this.setState((preState) => ({
            todoList: todoList.map((todo) => ({ ...todo, isCompleted: !isCheckedAll })),
            isCheckedAll: !preState.isCheckedAll,
        }));
    };

    setStatusFilter = (status) => {
        this.setState({ status });
    };

    clearComplete = () => {
        const { todoList } = this.state;
        this.setState({
            todoList: filterByStatus(todoList, 'ACTIVE'),
        });
    };

    removeTodo = (id) => {
        const { todoList } = this.state;
        this.setState({ todoList: filterByStatus(todoList, 'REMOVE', id) });
    };

    render() {
        const { todoList, todoEditingId, isCheckedAll, status } = this.state;

        return (
            <Provider store={store}>
                <div className="w-[500px] bg-white my-[130px] mx-auto relative shadow-[0_2px_4px_0_rgba(0,0,0,0.2),0_25px_50px_0_rgba(0,0,0,0.1)]">
                    <Header todoList={todoList} addTodo={this.addTodo} isCheckedAll={isCheckedAll} />
                    <TodoList
                        todoList={filterByStatus(todoList, status)}
                        getTodoEditingId={this.getTodoEditingId}
                        todoEditingId={todoEditingId}
                        onEditTodo={this.onEditTodo}
                        markCompleted={this.markCompleted}
                        isCheckedAll={isCheckedAll}
                        checkAlltodos={this.checkAlltodos}
                        removeTodo={this.removeTodo}
                    />
                    <Footer
                        setStatusFilter={this.setStatusFilter}
                        status={status}
                        clearComplete={this.clearComplete}
                        numOfTodos={todoList.length}
                        numOfTodosLeft={filterByStatus(todoList, 'ACTIVE').length}
                    />
                </div>
            </Provider>
        );
    }
}

export default App;

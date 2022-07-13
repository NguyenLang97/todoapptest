const INITIAL_STATE = { todoList: [], todoEditingId: '', isCheckedAll: false, status: 'ALL' };

const todosReducers = (state= INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default todosReducers;

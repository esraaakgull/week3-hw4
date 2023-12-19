import React, {useState} from 'react';

const TodoApp = () => {
    const initialData = {
        todo: [
            {done: true, text: 'Taste JavaScript'},
            {text: 'Code furiously', done: true},
            {text: 'Promote Mavo', done: false},
            {text: 'Give talks', done: false},
            {text: 'Write tutorials', done: true},
            {text: 'Have a life!', done: false},
        ],
    };

    const [data, setData] = useState(initialData);
    const [newTodo, setNewTodo] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    const addTodo = (newTodoText) => {
        if (newTodoText.trim() !== '') {
            const newTodoList = [...data.todo, {text: newTodoText, done: false}];
            setData({todo: newTodoList});
        }
        setNewTodo('');
    };

    const deleteTodo = (todoToDelete) => {
        const filteredTodos = data.todo.filter((todo) => todo !== todoToDelete);
        setData({todo: filteredTodos});
    };

    const toggleTodo = (todoToToggle) => {
        const toggledTodos = data.todo.map((todo) => {
            if (todo === todoToToggle) {
                return {...todo, done: !todo.done};
            }
            return todo;
        });
        setData({todo: toggledTodos});
    };

    const handleInputChange = (e) => {
        setNewTodo(e.target.value);
    };

    const filterTodos = () => {
        switch (activeFilter) {
            case 'active':
                return data.todo.filter((todo) => !todo.done);
            case 'completed':
                return data.todo.filter((todo) => todo.done);
            default:
                return data.todo;
        }
    };

    const todosToShow = filterTodos();

    return (
        <section className="todoapp" mv-bar="none" mv-storage="local" mv-autosave="3" mv-mode="edit"
                 mv-init="#initial_data">
            <header className="header">
                <h1>todos</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        addTodo(newTodo);
                    }}
                >
                    <input
                        className="new-todo"
                        placeholder="What needs to be done?"
                        autoFocus
                        value={newTodo}
                        onChange={handleInputChange}
                    />
                </form>
            </header>

            <section hidden={data.todo.length === 0} className="main">
                <input
                    id="toggle-all"
                    className="toggle-all"
                    type="checkbox"
                    checked={data.todo.filter((todo) => !todo.done).length === 0}
                    onChange={() => {
                        const areAllCompleted = data.todo.filter((todo) => !todo.done).length === 0;
                        const updatedTodos = data.todo.map((todo) => ({...todo, done: !areAllCompleted}));
                        setData({todo: updatedTodos});
                    }}
                />
                <label htmlFor="toggle-all" onClick={() => setData({...data, done: !data.done})}>
                    Mark all as complete
                </label>

                <ul className="todo-list">
                    {todosToShow.map((todo, index) => (
                        <li key={index} className={todo.done ? 'completed' : ''}>
                            <div className="view">
                                <input
                                    className="toggle"
                                    type="checkbox"
                                    checked={todo.done}
                                    onChange={() => toggleTodo(todo)}
                                />
                                <label>{todo.text}</label>
                                <button className="destroy" onClick={() => deleteTodo(todo)}></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <footer hidden={data.todo.length === 0} className="footer">
        <span className="todo-count">
          {data.todo.filter((todo) => !todo.done).length}{' '}
            {data.todo.filter((todo) => !todo.done).length === 1 ? 'item' : 'items'} left
        </span>

                <ul className="filters">
                    <li>
                        <a href="/#"
                           className={activeFilter === 'all' ? 'selected' : ''}
                           onClick={() => setActiveFilter('all')}
                        >
                            All
                        </a>
                    </li>
                    <li>
                        <a
                            href="/#"
                            className={activeFilter === 'active' ? 'selected' : ''}
                            onClick={() => setActiveFilter('active')}
                        >
                            Active
                        </a>
                    </li>
                    <li>
                        <a
                            href="/#"
                            className={activeFilter === 'completed' ? 'selected' : ''}
                            onClick={() => setActiveFilter('completed')}
                        >
                            Completed
                        </a>
                    </li>
                </ul>

                <button
                    hidden={data.todo.filter((todo) => todo.done).length === 0}
                    className="clear-completed"
                    onClick={() => setData({todo: data.todo.filter((todo) => !todo.done)})}
                >
                    Clear completed
                </button>
            </footer>

            <footer className="info">
                <p>Click to edit a todo</p>
                <p>
                    Created by <a href="https://d12n.me/">Dmitry Sharabin</a> with <a href="https://mavo.io">Mavo</a>
                </p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </footer>
        </section>
    );
};

export default TodoApp;

import React, { useState, useEffect, useRef } from 'react';
import Intro from './Intro';
import './Dashboard.css';
import Navbar from './Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import View from './View';
import Analytics from './Analytics';

function Dashboard() {
    const [todos, setTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [activeIndex, setActiveIndex] = useState(null); // To track which menu is active
    const [selectedTodo, setSelectedTodo] = useState(null); // To track the selected todo for viewing
    const [isModalOpen, setIsModalOpen] = useState(false); // To track modal visibility
    const dropdownRef = useRef(null); // To reference the dropdown menu

    // Load tasks from local storage on initial render
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        const storedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos')) || [];
        setTodos(storedTodos);
        setCompletedTodos(storedCompletedTodos);
    }, []);

    // Save tasks to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    // Save completed tasks to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
    }, [completedTodos]);

    // Close dropdown menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveIndex(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const addTodo = () => {
        if (inputValue.trim().length >= 5) {
            const newTodo = {
                text: inputValue,
                completed: false,
                createdAt: new Date().toLocaleString(),
                completedAt: null,
            };
            setTodos([...todos, newTodo]);
            setInputValue('');
        }
    };

    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    const toggleComplete = (index) => {
        const newTodos = todos.map((todo, i) =>
            i === index ? { ...todo, completed: !todo.completed, completedAt: todo.completed ? null : new Date().toLocaleString() } : todo
        );
        setTodos(newTodos);
    };

    const editTodo = (index, newText) => {
        const newTodos = todos.map((todo, i) =>
            i === index ? { ...todo, text: newText } : todo
        );
        setTodos(newTodos);
    };

    const toggleMenu = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const viewTodo = (index) => {
        setSelectedTodo({ ...todos[index], index });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTodo(null);
    };

    const completeTodo = (index) => {
        const todoToComplete = todos[index];
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
        setCompletedTodos([...completedTodos, { ...todoToComplete, completed: true, completedAt: new Date().toLocaleString() }]);
        setIsModalOpen(false); // Close modal after completing
    };

    return (
        <>
            <Intro />
            <Navbar />
            <div className='todo-dashboard'>
                <div className='todo-dashboard-input'>
                    <input
                        name='todo-task'
                        placeholder='Enter your Todo task'
                        type='text'
                        minLength={5}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button onClick={addTodo}>Add</button>
                </div>
                <div className='todo-dashboard-list hide-scrollbar'>
                    <ul className='todo-list'>
                        {
                            todos.map((todo, index) => (
                                <li key={index} className='todo-list-row'>
                                    <span
                                        style={{ textDecoration: todo.completed ? 'line-through' : 'none', overflow: "hidden" }}
                                        onClick={() => toggleComplete(index)}
                                    >
                                        {todo.text}
                                    </span >
                                    <div className='todo-list-actions' ref={dropdownRef}>
                                        <button className='hamburger-btn' onClick={() => toggleMenu(index)}>☰</button>
                                        {
                                            activeIndex === index && (
                                                <div className='dropdown-menu'>
                                                    <button className='view' onClick={() => viewTodo(index)}>
                                                        <i className='fas fa-eye icon'></i> View
                                                    </button>
                                                    <button className='edit' onClick={() => {
                                                        const newText = prompt("Edit task", todo.text);
                                                        if (newText && newText.trim().length >= 5) {
                                                            editTodo(index, newText);
                                                        }
                                                    }}>
                                                        <i className='fas fa-edit icon'></i> Edit
                                                    </button>
                                                    <button className='delete' onClick={() => deleteTodo(index)}>
                                                        <i className='fas fa-trash icon'></i> Delete
                                                    </button>
                                                    <button className='complete' onClick={() => completeTodo(index)}>
                                                        <i className='fas fa-check icon'></i> Complete
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <View
                    todo={selectedTodo}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    editTodo={editTodo}
                    deleteTodo={deleteTodo}
                    completeTodo={completeTodo}
                />
                <Analytics todos={todos} completedTodos={completedTodos} />
            </div>
        </>
    );
}

export default Dashboard;

import React from 'react';

function View({ todo, isOpen, onClose, editTodo, deleteTodo, completeTodo }) {
    const handleEdit = () => {
        const newText = prompt("Edit task", todo.text);
        if (newText && newText.trim().length >= 5) {
            editTodo(todo.index, newText);
            onClose();
        }
    };

    const handleDelete = () => {
        deleteTodo(todo.index);
        onClose();
    };

    const handleComplete = () => {
        completeTodo(todo.index);
        console.log("Complete task:", todo.text);
        onClose();
    };

    return (
        <>
            {isOpen && todo && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span className='close' onClick={onClose}>&times;</span>
                        <h2>Todo Details</h2>
                        <p><strong>Task:</strong> {todo.text}</p>
                        <p><strong>Created At:</strong> {todo.createdAt}</p>
                        <p><strong>Status:</strong> {todo.completed ? `Completed at ${todo.completedAt}` : 'Pending'}</p>
                        <button className='modal-edit' onClick={handleEdit}>Edit</button>
                        <button className='modal-delete' onClick={handleDelete}>Delete</button>
                        <button className='modal-complete' onClick={handleComplete}>Complete</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default View;

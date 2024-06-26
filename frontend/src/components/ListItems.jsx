import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';

function ListItems(props) {
    const [text, setText] = useState("");
    const [editId, setEditId] = useState(null);

    function startEditing(id, task){
        setEditId(id);
        setText(task);
    }

    function saveTask(taskId){
        props.onEdit(text, taskId);
        setEditId(null);
    };

    function handleInput(event){
        const task = event.target.value;
        task.length < 45 ? setText(task) : (setText(""), alert("Too long text!"));
    };

    const newList = props.tasks.filter(task => task.duration === props.duration);
    return (
        <div className='items-list'>
            <h1 id="title">FOR {props.duration.toUpperCase()}</h1>
            <ul>
                {newList.map((task) => (
                    <li key={task.id}>
                        {editId === task.id ? (
                            <div>
                                <input 
                                    className='custom-input'
                                    type="text" 
                                    value={text} 
                                    onChange={handleInput} 
                                />
                                <button className="icon-button" onClick={() => saveTask(task.id)}><DoneIcon /></button>
                            </div>
                        ) : (
                            <div>
                                {task.task}
                                <button className="icon-button" onClick={() => startEditing(task.id, task.task)}><EditIcon /></button>
                                <button className="icon-button" onClick={() => props.onDelete(task.id)}><DeleteIcon /></button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListItems;

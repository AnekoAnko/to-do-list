import React, { useState } from 'react';
import Axios from "axios";
import { getData } from "./App";
import DoneIcon from '@mui/icons-material/Done';

function Form({ setTasks }) {
    const [text, setText] = useState("");
    const [duration, setDuration] = useState("day");

    function handleInput(event){
        const task = event.target.value;
        task.length < 45 ? setText(task) : (setText(""), alert("Too long text!"));
    };

    function handleChange(event){
        const option = event.target.value;
        setDuration(option);
    }

    const sendData = async (event) => {
        event.preventDefault();
        try {
            await Axios.post("http://localhost:3000/sendData", { task: text, duration: duration });
            const data = await getData();
            setTasks(data);
            setText("");
        } catch (error) {
            console.error("There was an error sending data!", error);
        }
    };

    return (
        <form method="post" onSubmit={sendData}>
            <input className='custom-input' name="data" placeholder="type data" value={text} onChange={handleInput} />
            <select className='custom-select' name="duration" onChange={handleChange} required>
                <option>day</option>
                <option>week</option>
                <option>month</option>
            </select>
            <button className='icon-button' type="submit"><DoneIcon /></button>
        </form>
    );
}

export default Form;

import React, { useState, useEffect } from 'react';
import Axios from "axios";
import ListItems from "./ListItems";
import Form from "./Form";

const getData = async () => {
    const response = await Axios.get("http://localhost:3000/getData");
    return response.data;
};

const updateData = async (task, id) => {
    await Axios.put(`http://localhost:3000/updateData/${id}`, {task : task});
}

const deleteData = async (id) => {
     await Axios.delete(`http://localhost:3000/deleteData/${id}`)
}

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData();
            setTasks(data);
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
      await deleteData(id);
      const data = await getData();
      setTasks(data);
    }

    const handleUpdate = async (task, id) => {
        await updateData(task, id);
        const data = await getData();
        setTasks(data);
        
    }
    


    return (
        <div>
          <div className='todo-items'>
              <ListItems tasks={tasks} duration={"day"} onEdit={handleUpdate} onDelete={handleDelete} />
              <ListItems tasks={tasks} duration={"week"} onEdit={handleUpdate} onDelete={handleDelete}/>
              <ListItems tasks={tasks} duration={"month"} onEdit={handleUpdate} onDelete={handleDelete}/>
          </div >
          <div className='input-form'>
              <Form setTasks={setTasks} />
          </div>
        </div>
    );
};

export default App;
export { getData };
import React, { useEffect, useState } from 'react'
import '../App.css'
import './DeleteIcon'
import DeleteIcon from './DeleteIcon'
import { BsCheckCircleFill } from 'react-icons/bs'
// import DeleteIcon from './DeleteIcon'


export default function TodoApp() {
    const [todolist, setTodoList] = useState(false)
    const [allTodos, setTodos] = useState([])
    const [newtTittle, setNewTittle] = useState("")
    const [newDescription, setNewDescription] = useState()
    const [completedTodos, setCompletedTodos] = useState([])

    const handleAddTodo = () => {
        let newTodoItem = {
            title: newtTittle,
            description: newDescription
        }

        let updatedTodoArr = [...allTodos];
        updatedTodoArr.push(newTodoItem)
        setTodos(updatedTodoArr);
        localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    };
    useEffect(() => {
        let savedTodo = JSON.parse(localStorage.getItem('todolist'));
        if (savedTodo) {
            setTodos(savedTodo);
        }
    }, [])

    const handleDelete = (index) => {
        let reducedTodo = [...allTodos];
        reducedTodo.splice(index);

        localStorage.setItem('todolist', JSON.stringify(reducedTodo));
        setTodos(reducedTodo)
    }

    const handleComplete = (index) => {
        let now = new Date();
        let day = now.getDate();
        let month = now.month() + 1;
        let year = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let completedOn = day + '-' + month + '-' + year + 'at' + h + ':' + m + ':' + s;

        let filteredItem = {
            ...allTodos[index],
            completedOn: completedOn
        }

        let updatedCompletedArr = [...completedTodos];
        updatedCompletedArr.push(filteredItem);
        setCompletedTodos(updatedCompletedArr);
    }

    return (
        <div className='App'>
            <h1>My Todo App</h1>

            <div className='container'>
                <div className="todo-input">
                    <div className="todo-input-item">
                        <label>Title</label>
                        <input type='text' value={newtTittle} onChange={(e) => setNewTittle(e.target.value)} placeholder='What do you want to type?' />
                    </div>
                    <div className="todo-input-item">
                        <label>Description</label>
                        <input type='text' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="What's your description?" />
                    </div>
                    <div className="todo-input-item">
                        <button type='button' onClick={handleAddTodo} className="primaryBtn">Add</button>
                    </div>
                </div>
                <div className='btn-area'>
                    <button className={`secondaryBtn ${todolist === false && 'active'}`} onClick={() => setTodoList(false)}>ToDo</button>
                    {/* <button className={`secondaryBtn ${todolist === true && 'active'}`} onClick={() => setTodoList(true)}>Completed</button> */}
                </div>

                <div className='todo-list'>
                    {todolist === false && allTodos
                        .map((item, index) => {
                            return (
                                <div className='todo-list-item' key={index}>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <div className='icon' title='delet?' onClick={() => handleDelete(index)}>
                                        <DeleteIcon /></div>
                                        {/* <div className='check-icon'onClick={() => handleComplete(index)} title='complete?'><BsCheckCircleFill /></div> */}
                                </div>
                            )
                        })

                    }
{/* 
                    {todolist === true && completedTodos
                        .map((item, index) => {
                            return (
                                <div className='todo-list-item' key={index}>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <p><small>Completed On: {item.completedOn}</small></p>
                                    <div className='icon'onClick={() => handleDelete(index)} title='delet?'>
                                        <DeleteIcon />
                                    </div>
                                </div>
                            )
                        })
                    } */}
                </div>

            </div>
        </div>
    )
}

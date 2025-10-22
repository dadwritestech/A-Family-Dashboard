import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(tasksData);
    });
    return () => unsubscribe();
  }, []);

  const addTask = async () => {
    if (newTask.trim() === '') return;
    await addDoc(collection(db, 'tasks'), {
      text: newTask,
      completed: false,
    });
    setNewTask('');
  };

  const toggleComplete = async (task) => {
    await updateDoc(doc(db, 'tasks', task.id), {
      completed: !task.completed,
    });
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Todo List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new task"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between p-2 mb-2 bg-gray-100 rounded-lg"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task)}
                className="mr-2 h-5 w-5 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {task.text}
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 text-white p-1 rounded-lg hover:bg-red-600 text-xs"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

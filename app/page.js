"use client"
import React, { useState } from 'react';

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() && desc.trim()) {
      setMainTask([...mainTask, { title, desc }]);
      setTitle("");
      setDesc("");
    }
  };

  const deleteHandler = (index) => {
    const updatedTasks = mainTask.filter((_, i) => i !== index);
    setMainTask(updatedTasks);
  };

  const completeHandler = (index) => {
    const completed = mainTask[index];
    setCompletedTask([...completedTask, completed]);
    deleteHandler(index);
  };

  const renderTask = mainTask.length > 0 
    ? mainTask.map((task, index) => (
        <li key={index} className='flex items-center justify-between mb-8'>
          <div className='flex items-center justify-between w-2/3'>
            <h5 className='text-2xl font-semibold'>{task.title}</h5>
            <h5 className='text-lg font-medium'>{task.desc}</h5>
          </div>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition'
            onClick={() => deleteHandler(index)}
          >
            Delete
          </button>
          <button
            className='bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition'
            onClick={() => completeHandler(index)}
          >
            Completed
          </button>
        </li>
      ))
    : <h2 className='text-gray-600 text-lg'>No Task Available</h2>;

  const renderCompletedTask = completedTask.length > 0 
    ? completedTask.map((task, index) => (
        <li key={index} className='flex items-center justify-between mb-4'>
          <div className='flex flex-col items-start'>
            <h5 className='text-xl font-semibold'>{task.title}</h5>
            <h5 className='text-lg text-gray-700'>{task.desc}</h5>
          </div>
        </li>
      ))
    : <h2 className='text-gray-600 text-lg'>No Completed Tasks</h2>;

  return (
    <>
      <h1 className='bg-gradient-to-r from-blue-500 to-purple-600 text-white p-5 text-3xl font-bold text-center'>Todo List</h1>

      <form onSubmit={submitHandler} className='p-6 bg-gray-100 rounded-lg shadow-md max-w-xl mx-auto my-6'>
        <input
          type='text'
          className='text-lg border-gray-400 border-2 m-2 px-4 py-2 rounded-lg w-full'
          placeholder='Enter Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          className='text-lg border-gray-400 border-2 m-2 px-4 py-2 rounded-lg w-full'
          placeholder='Enter Description'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button
          type='submit'
          className='bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 text-lg font-bold rounded-lg m-2 hover:scale-105 transition'
        >
          Add Task
        </button>
      </form>

      <div className='p-8 bg-gray-50 rounded-lg shadow-md max-w-2xl mx-auto'>
        <ul>{renderTask}</ul>
      </div>

      <div className='bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-8 text-center font-bold text-2xl text-white mt-10 rounded-lg shadow-md max-w-2xl mx-auto'>
        <h1>Completed Tasks</h1>
        <ul className='mt-4'>{renderCompletedTask}</ul>
      </div>
    </>
  );
};

export default Page;

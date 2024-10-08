import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import { Button, Form, Modal } from "react-bootstrap";

const TaskList = () => {
  //exemple of taskand local storage 
  const [tasks, setTasks] = useState(()=>{
    const savedTasks = localStorage.getItem("tasks");
    // console.log(savedTasks.length)
    return savedTasks.length > 2 ? JSON.parse(savedTasks):
    [
    {
      id: Math.random(),
      name: "GO GYM",
      description: "Boxbike session",
      completed: false,
    },
    
  ]});

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])
  
  

  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState("");
  const [editedTaskDescription, setEditedTaskDescription] = useState("");

  //addin task
  const addTask = (name, description) => {
    const newTask = {
      id: Math.random(),
      name,
      description,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  //deleting task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //DOne/Undone
  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };
  //edit 
  const handleEdit = (task) => {
    if (!task.completed) {
      setCurrentTask(task);
      setEditedTaskName(task.name);
      setEditedTaskDescription(task.description);
      setShowModal(true);
    }
  };

  const handleSaveChanges = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === currentTask.id
        ? { ...task, name: editedTaskName, description: editedTaskDescription }
        : task
    );
    setTasks(updatedTasks);
    setShowModal(false);
     
  };

  return (
    <div>
      <TaskForm addTask={addTask} />
      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete} handleEdit={handleEdit}
          />
        ))}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="taskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                value={editedTaskName}
                onChange={(e) => setEditedTaskName(e.target.value)}
          
              />
            </Form.Group>
            <Form.Group controlId="taskDescription">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                value={editedTaskDescription}
                onChange={(e) => setEditedTaskDescription(e.target.value)}
              
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskList;

import React from "react";
import { Task } from "../Task";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: #f0f0f0;
  padding: 10px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: #ff5050;
  color: white;
  border: none;
  cursor: pointer;
`;

interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete }) => {
  if (tasks.length === 0) {
    return <p>No tasks yet.</p>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>Title</TableHeader>
          <TableHeader>Due Date</TableHeader>
          <TableHeader>Category</TableHeader>
          <TableHeader>Action</TableHeader>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <TableCell>{task.title}</TableCell>
            <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
            <TableCell>{task.category}</TableCell>
            <TableCell>
              <DeleteButton onClick={() => onDelete(task.id)}>
                Delete
              </DeleteButton>
            </TableCell>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TaskList;

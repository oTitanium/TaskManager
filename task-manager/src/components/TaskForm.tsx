import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import categories from "../categories";
import styled from "styled-components";
import { Task } from "../Task";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 5px;
`;

const Select = styled.select`
  padding: 5px;
`;

const Error = styled.p`
  color: red;
  font-size: 12px;
`;

const schema = z.object({
  title: z.string().min(3).max(50),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
  category: z.enum(categories),
});

type TaskFormData = z.infer<typeof schema>;

interface TaskFormProps {
  onSubmit: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = (data: TaskFormData) => {
    const task: Task = {
      ...data,
      id: Date.now(),
      dueDate: new Date(data.dueDate).setHours(24), // Adjust dueDate to start of day in local time zone
    };
    onSubmit(task);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <Label htmlFor="title">Title:</Label>
      <Input type="text" id="title" {...register("title")} />
      {errors.title && <Error>{errors.title.message}</Error>}

      <Label htmlFor="dueDate">Due Date:</Label>
      <Input type="date" id="dueDate" {...register("dueDate")} />
      {errors.dueDate && <Error>{errors.dueDate.message}</Error>}

      <Label htmlFor="category">Category:</Label>
      <Select id="category" {...register("category")}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>
      {errors.category && <Error>{errors.category.message}</Error>}

      <button type="submit">Add Task</button>
    </Form>
  );
};

export default TaskForm;

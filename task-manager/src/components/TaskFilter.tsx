import React from "react";
import categories from "../categories";

interface TaskFilterProps {
  onSelectCategory: (category: string) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onSelectCategory }) => {
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = event.target.value;
    onSelectCategory(selectedCategory);
  };

  return (
    <select onChange={handleCategoryChange}>
      <option value="">All</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default TaskFilter;

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from './components/TodoApp';

test('renders ToDo List heading', () => {
  render(<TodoApp />);
  const headingElement = screen.getByText(/ToDo List/i);
  expect(headingElement).toBeInTheDocument();
});

test('allows users to add a new todo', () => {
  render(<TodoApp />);
  const inputElement = screen.getByPlaceholderText(/Введите новую задачу/i);
  const buttonElement = screen.getByText(/Добавить задачу/i);

  fireEvent.change(inputElement, { target: { value: 'Новая задача' } });
  fireEvent.click(buttonElement);

  expect(screen.getByText(/Новая задача/i)).toBeInTheDocument();
});
test('allows users to remove a todo', () => {
  render(<TodoApp />);
  const inputElement = screen.getByPlaceholderText(/Введите новую задачу/i);
  const buttonElement = screen.getByText(/Добавить задачу/i);
  
  fireEvent.change(inputElement, { target: { value: 'Удаляемая задача' } });
  fireEvent.click(buttonElement);

  const removeButton = screen.getByText(/Удалить/i);
  fireEvent.click(removeButton);

  expect(screen.queryByText(/Удаляемая задача/i)).not.toBeInTheDocument();
});
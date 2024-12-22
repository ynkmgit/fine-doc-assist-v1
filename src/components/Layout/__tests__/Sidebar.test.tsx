import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../Sidebar';

describe('Sidebar', () => {
  const mockOnToggle = jest.fn();
  const mockItems = [
    { id: '1', label: 'Test Item 1', onClick: jest.fn() },
    { id: '2', label: 'Test Item 2', onClick: jest.fn() }
  ];

  it('renders correctly when open', () => {
    render(
      <Sidebar
        isOpen={true}
        onToggle={mockOnToggle}
        items={mockItems}
      />
    );
    
    expect(screen.getByText('Test Item 1')).toBeInTheDocument();
    expect(screen.getByText('Test Item 2')).toBeInTheDocument();
    expect(screen.getByLabelText('サイドバーを閉じる')).toBeInTheDocument();
  });

  it('renders correctly when closed', () => {
    render(
      <Sidebar
        isOpen={false}
        onToggle={mockOnToggle}
        items={mockItems}
      />
    );
    
    expect(screen.getByLabelText('サイドバーを開く')).toBeInTheDocument();
  });

  it('calls onClick handler when menu item is clicked', () => {
    render(
      <Sidebar
        isOpen={true}
        onToggle={mockOnToggle}
        items={mockItems}
      />
    );
    
    fireEvent.click(screen.getByText('Test Item 1'));
    expect(mockItems[0].onClick).toHaveBeenCalled();
  });

  it('calls onToggle when toggle button is clicked', () => {
    render(
      <Sidebar
        isOpen={true}
        onToggle={mockOnToggle}
        items={mockItems}
      />
    );
    
    fireEvent.click(screen.getByLabelText('サイドバーを閉じる'));
    expect(mockOnToggle).toHaveBeenCalled();
  });
});
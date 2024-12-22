import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MainLayout from '../MainLayout';

describe('MainLayout', () => {
  it('renders children content', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('toggles sidebar visibility', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );
    
    const toggleButton = screen.getByLabelText(/サイドバーを閉じる/i);
    fireEvent.click(toggleButton);
    
    expect(screen.getByLabelText(/サイドバーを開く/i)).toBeInTheDocument();
  });

  it('renders sidebar menu items', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );
    
    expect(screen.getByText('エディタ')).toBeInTheDocument();
    expect(screen.getByText('プレビュー')).toBeInTheDocument();
    expect(screen.getByText('CSSエディタ')).toBeInTheDocument();
  });
});
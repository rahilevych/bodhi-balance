/* eslint-disable @typescript-eslint/no-explicit-any */

import userEvent from '@testing-library/user-event';
import { AppProvider, useAppContext } from '../AppContext';
import { render, renderHook, screen } from '@testing-library/react';
import * as windowHook from '../../hooks/useWindowSize';

jest.mock('../../shared/modal/NotificationWindow.tsx', () => ({
  NotificationWindow: ({ message, onClose }: any) => (
    <div data-testid='notification'>
      <span>{message}</span>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));
jest.mock('../../hooks/useWindowSize.ts', () => ({
  useWindowSize: jest.fn(() => ({ width: 800, height: 600 })),
}));

const TestComponent = () => {
  const {
    openModal,
    closeModal,
    isModalOpen,

    isMobile,
  } = useAppContext();

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <button onClick={closeModal}>Close Modal</button>
      <div>{isModalOpen ? 'Modal Open' : 'Modal Closed'}</div>
      <div>{isMobile ? 'Mobile' : 'Desktop'}</div>
    </div>
  );
};

describe('AppContext', () => {
  const mockedUseWindowSize = windowHook.useWindowSize as jest.Mock;
  test('openModal and closeModal work correctly', async () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>,
    );

    const openBtn = screen.getByText('Open Modal');
    const closeBtn = screen.getByText('Close Modal');

    await userEvent.click(openBtn);
    expect(screen.getByText('Modal Open')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');

    await userEvent.click(closeBtn);
    expect(screen.getByText('Modal Closed')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('auto');
  });

  test('isMobile is true for small width', () => {
    mockedUseWindowSize.mockReturnValue({
      width: 500,
      height: 600,
    });

    const TestComponent = () => {
      const { isMobile } = useAppContext();
      return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>;
    };

    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>,
    );

    expect(screen.getByText('Mobile')).toBeInTheDocument();
  });
  test('isMobile is false for large width', () => {
    mockedUseWindowSize.mockReturnValue({
      width: 1024,
      height: 600,
    });

    const TestComponent = () => {
      const { isMobile } = useAppContext();
      return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>;
    };

    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>,
    );

    expect(screen.getByText('Desktop')).toBeInTheDocument();
  });
  test('useAppContext throws error if no provider', () => {
    expect(() => renderHook(() => useAppContext())).toThrow(
      'useAppContext must be used within a AppProvider',
    );
  });
});

import '@testing-library/jest-dom';
import React from 'react';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

jest.mock('antd', () => {
  const antd = jest.requireActual('antd');

  return {
    ...antd,
    Row: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Col: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

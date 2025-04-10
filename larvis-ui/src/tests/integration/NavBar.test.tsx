import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NavBar from 'src/components/NavBar/NavBar';
import { AuthContextProvider } from 'src/contexts/authContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('src/api/hooks/user', () => ({
  useGetUserById: () => ({
    data: {
      user_id: 'user-456',
      name: 'User Test',
      password: '1234',
    },
    isPending: false,
    isError: false,
    error: null,
  }),
  useUpdateUser: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),
}));

const renderNavBar = () => {
  const queryClient = new QueryClient();

  return render(
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <NavBar />
      </QueryClientProvider>
    </AuthContextProvider>,
  );
};

describe('NavBar integration with AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.setItem('token', 'fake-token');
    sessionStorage.setItem('currentuserId', 'user-456');
  });

  it('renders NavBar title and buttons', () => {
    renderNavBar();
    expect(screen.getByText('Larvis')).toBeInTheDocument();
    expect(screen.getByTestId('my-profile-button')).toBeInTheDocument();
    expect(screen.getByTestId('logout-button')).toBeInTheDocument();
  });

  it('opens the profile modal and shows ProfileCard', async () => {
    renderNavBar();

    fireEvent.click(screen.getByTestId('my-profile-button'));

    await waitFor(() => {
      expect(screen.getByLabelText(/User ID/i)).toHaveValue('user-456');
      expect(screen.getByLabelText(/Name/i)).toHaveValue('User Test');
    });
  });

  it('calls logout on logout button click', () => {
    renderNavBar();
    fireEvent.click(screen.getByTestId('logout-button'));
    expect(sessionStorage.getItem('token')).toBeNull();
    expect(sessionStorage.getItem('currentuserId')).toBeNull();
  });
});

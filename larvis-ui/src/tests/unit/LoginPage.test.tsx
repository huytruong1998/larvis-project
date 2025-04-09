import { render, screen, waitFor } from '@testing-library/react';
import useLoginUser from 'src/api/hooks/auth';
import LoginPage from 'src/pages/LoginPage/LoginPage';

jest.mock('src/api/hooks/auth', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('LoginPage', () => {
  const loginMock = jest.fn();
  beforeEach(() => {
    loginMock.mockClear();
  });

  it('should renders form with inputs and button - T16', () => {
    (useLoginUser as jest.Mock).mockReturnValue({
      mutate: loginMock,
      isPending: false,
      isError: false,
      error: null,
    });
    render(<LoginPage />);
    expect(screen.getByLabelText(/User Id/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('should shows error message when there is unauthenticated error - T29', async () => {
    (useLoginUser as jest.Mock).mockImplementation(() => {
      return {
        mutate: () => {},
        isPending: false,
        isError: true,
        error: { status: 401 },
      };
    });

    render(<LoginPage />);
    await waitFor(() => {
      const errorMessages = screen.getAllByText('Invalid username and password');
      expect(errorMessages.length).toBe(2);
    });
  });
});

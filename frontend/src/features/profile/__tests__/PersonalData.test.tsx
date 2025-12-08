import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PersonalData } from '../components/personal-data/PersonalData';
import { useProfile } from '../../auth/hooks/useProfile';
import { useDeleteUser } from '../hooks/useDeleteUser';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../auth/hooks/useProfile');
jest.mock('../hooks/useUpdateUser', () => ({
  useUpdateUser: () => ({
    mutate: jest.fn(),
  }),
}));

jest.mock('../hooks/useDeleteUser');

describe('PersonalData component', () => {
  const deleteUserMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useProfile as jest.Mock).mockReturnValue({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '',
        address: '',
      },
    });
    (useDeleteUser as jest.Mock).mockReturnValue({ mutate: deleteUserMock });
  });

  test('renders user info', () => {
    render(
      <MemoryRouter>
        <PersonalData />
      </MemoryRouter>,
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  test('opens edit form when EditBtn is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <PersonalData />
      </MemoryRouter>,
    );

    await user.click(screen.getByText('Edit'));
    expect(screen.getByTestId('form')).toBeInTheDocument();
  });

  test('opens confirmation modal and calls deleteUser', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <PersonalData />
      </MemoryRouter>,
    );

    await user.click(screen.getByText('Delete'));
    expect(
      screen.getByText(/Are you sure you want to delete/i),
    ).toBeInTheDocument();

    await user.click(screen.getByText('Yes'));
    expect(deleteUserMock).toHaveBeenCalled();
  });

  test('cancels deletion when Cancel is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <PersonalData />
      </MemoryRouter>,
    );

    await user.click(screen.getByText('Delete'));
    await user.click(screen.getByText('Cancel'));

    expect(deleteUserMock).not.toHaveBeenCalled();
    expect(screen.queryByText(/Are you sure/i)).not.toBeInTheDocument();
  });
});

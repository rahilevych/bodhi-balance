import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersonalDataForm } from '../components/personal-data-form/PersonalDataForm';

const mockedMutate = jest.fn();

jest.mock('../hooks/useUpdateUser', () => ({
  useUpdateUser: () => ({
    mutate: mockedMutate,
  }),
}));

jest.mock('../../auth/hooks/useProfile', () => ({
  useProfile: () => ({
    data: {
      _id: 'u1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '',
      address: '',
    },
  }),
}));

const renderWithClient = (ui: React.ReactNode) => {
  const client = new QueryClient();
  return render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>,
  );
};

describe('PersonalDataForm', () => {
  test('renders default user values', () => {
    renderWithClient(<PersonalDataForm onEditing={jest.fn()} />);

    expect(screen.getByPlaceholderText('Full Name')).toHaveValue('John Doe');
    expect(screen.getByPlaceholderText('Email')).toHaveValue(
      'john@example.com',
    );
    expect(screen.getByPlaceholderText('Phone (optional)')).toHaveValue('');
    expect(screen.getByPlaceholderText('Address (optional)')).toHaveValue('');
  });

  test('submits form and calls updateUser', async () => {
    const user = userEvent.setup();
    const onEditingMock = jest.fn();

    renderWithClient(<PersonalDataForm onEditing={onEditingMock} />);

    await user.clear(screen.getByPlaceholderText('Full Name'));
    await user.type(screen.getByPlaceholderText('Full Name'), 'Alice Cooper');

    await user.type(screen.getByPlaceholderText('Phone (optional)'), '123456');

    await user.type(
      screen.getByPlaceholderText('Address (optional)'),
      'Berlin',
    );

    await user.click(screen.getByText('Save'));

    expect(mockedMutate).toHaveBeenCalledWith({
      id: 'u1',
      data: {
        name: 'Alice Cooper',
        email: 'john@example.com',
        phone: '123456',
        address: 'Berlin',
      },
    });

    expect(onEditingMock).toHaveBeenCalledWith(false);
  });

  test('cancel button closes editing mode', async () => {
    const user = userEvent.setup();
    const onEditingMock = jest.fn();

    renderWithClient(<PersonalDataForm onEditing={onEditingMock} />);

    await user.click(screen.getByText('Cancel'));

    expect(onEditingMock).toHaveBeenCalledWith(false);
  });

  test('shows validation error on empty name', async () => {
    const user = userEvent.setup();

    renderWithClient(<PersonalDataForm onEditing={jest.fn()} />);

    const nameInput = screen.getByPlaceholderText('Full Name');

    await user.clear(nameInput);
    await user.click(screen.getByText('Save'));

    expect(screen.getByText(/name must be at least/i)).toBeInTheDocument();
  });
});

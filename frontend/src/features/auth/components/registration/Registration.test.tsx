// import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom';
// import { useAppContext } from '../../../context/AppContext';
// import { registerUser } from '../../../services/authService';
// import { RegistrationForm } from './RegistrationForm';

// jest.mock('../../../context/AppContext.tsx', () => ({
//   useAppContext: jest.fn(),
// }));
// jest.mock('../../../services/authService.ts', () => ({
//   registerUser: jest.fn(),
// }));

// describe('RegistrationForm', () => {
//   const setNotificationMock = jest.fn();

//   beforeEach(() => {
//     jest.clearAllMocks();
//     (useAppContext as jest.Mock).mockReturnValue({
//       setNotification: setNotificationMock,
//     });
//   });

//   test('renders form inputs and button', () => {
//     render(<RegistrationForm />);
//     const textInputs = screen.getAllByRole('textbox');
//     const passwordInput = screen.getByPlaceholderText(/password/i);
//     expect(textInputs).toHaveLength(2);
//     expect(passwordInput).toBeInTheDocument();
//     expect(
//       screen.getByRole('button', { name: /sign up/i })
//     ).toBeInTheDocument();
//   });

//   test('shows validation errors on empty submit', async () => {
//     render(<RegistrationForm />);
//     const button = screen.getByRole('button', { name: /sign up/i });
//     await userEvent.click(button);
//     expect(await screen.findByText('Name is required!')).toBeInTheDocument();
//     expect(await screen.findByText('Email is required!')).toBeInTheDocument();
//     expect(
//       await screen.findByText('Password must be at least 6 characters long')
//     ).toBeInTheDocument();
//   });
//   test('shows error for invalid email format', async () => {
//     render(<RegistrationForm />);
//     await userEvent.type(
//       screen.getByPlaceholderText(/full name/i),
//       'Adam Smith'
//     );
//     await userEvent.type(screen.getByPlaceholderText(/email/i), ' smith');
//     await userEvent.type(screen.getByPlaceholderText(/password/i), ' 111111');
//     const button = screen.getByRole('button', { name: /sign up/i });
//     await userEvent.click(button);
//     expect(
//       await screen.findByText(/Invalid email format/i)
//     ).toBeInTheDocument();
//   });
//   test('shows error for invalid password format', async () => {
//     render(<RegistrationForm />);
//     await userEvent.type(
//       screen.getByPlaceholderText(/full name/i),
//       'Adam Smith'
//     );
//     await userEvent.type(
//       screen.getByPlaceholderText(/email/i),
//       ' smith@gmail.com'
//     );
//     await userEvent.type(screen.getByPlaceholderText(/password/i), ' 1111');
//     const button = screen.getByRole('button', { name: /sign up/i });
//     await userEvent.click(button);
//     expect(
//       await screen.findByText(/Password must be at least 6 characters long/i)
//     ).toBeInTheDocument();
//   });
//   test('calls registerUser from service and show that registration was successful', async () => {
//     (registerUser as jest.Mock).mockResolvedValueOnce({});
//     render(<RegistrationForm />);
//     await userEvent.type(
//       screen.getByPlaceholderText(/full name/i),
//       'Adam Smith'
//     );
//     await userEvent.type(
//       screen.getByPlaceholderText(/email/i),
//       'smith@gmail.com'
//     );
//     await userEvent.type(screen.getByPlaceholderText(/password/i), '111111');
//     const button = screen.getByRole('button', { name: /sign up/i });
//     await userEvent.click(button);
//     await waitFor(() => {
//       expect(registerUser).toHaveBeenCalledWith({
//         fullName: 'Adam Smith',
//         email: 'smith@gmail.com',
//         password: '111111',
//       });
//     });
//     expect(setNotificationMock).toHaveBeenCalledWith(
//       'Successfully registered!'
//     );
//   });
//   test('shows error message when registration failed', async () => {
//     const error = {
//       response: { data: { error: 'User already exists' } },
//     };
//     (registerUser as jest.Mock).mockRejectedValueOnce(error);
//     render(<RegistrationForm />);
//     await userEvent.type(
//       screen.getByPlaceholderText(/full name/i),
//       'Adam Smith'
//     );
//     await userEvent.type(
//       screen.getByPlaceholderText(/email/i),
//       'smith@gmail.com'
//     );
//     await userEvent.type(screen.getByPlaceholderText(/password/i), '111111');
//     const button = screen.getByRole('button', { name: /sign up/i });
//     await userEvent.click(button);
//     await waitFor(() => {
//       expect(registerUser).toHaveBeenCalledWith({
//         fullName: 'Adam Smith',
//         email: 'smith@gmail.com',
//         password: '111111',
//       });
//     });
//     expect(setNotificationMock).toHaveBeenCalledWith('Registration failed!');
//   });

//   test('shows unknown error message on unexpected error', async () => {
//     (registerUser as jest.Mock).mockRejectedValueOnce(
//       new Error('Network Error')
//     );
//     render(<RegistrationForm />);

//     await userEvent.type(
//       screen.getByPlaceholderText(/full name/i),
//       'Adam Smith'
//     );
//     await userEvent.type(
//       screen.getByPlaceholderText(/email/i),
//       'smith@gmail.com'
//     );
//     await userEvent.type(screen.getByPlaceholderText(/password/i), '111111');
//     const button = screen.getByRole('button', { name: /sign up/i });
//     await userEvent.click(button);
//     await waitFor(() => {
//       expect(registerUser).toHaveBeenCalledWith({
//         fullName: 'Adam Smith',
//         email: 'smith@gmail.com',
//         password: '111111',
//       });
//     });
//     expect(await screen.findByText('Unknown error')).toBeInTheDocument();
//     expect(setNotificationMock).toHaveBeenCalledWith('Registration failed!');
//   });
// });

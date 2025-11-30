// import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom';
// import { useAppContext } from '../../../context/AppContext';
// import { MemoryRouter, useNavigate } from 'react-router-dom';
// import { PersonalData } from '../components/personal-data/PersonalData';
// import { deleteUser, updateUser } from '../../../services/userService';

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: jest.fn(),
// }));
// jest.mock('../../services/authService', () => ({
//   getMe: jest.fn(),
// }));
// jest.mock('../../services/userService', () => ({
//   deleteUser: jest.fn(),
//   updateUser: jest.fn(),
// }));
// jest.mock('../../services/subscriptionService', () => ({
//   getSubscriptionByUserId: jest.fn(),
// }));
// jest.mock('../../context/AppContext', () => ({
//   useAppContext: jest.fn(),
// }));
// jest.mock('react-spinners', () => ({
//   BounceLoader: ({ loading }: { loading: boolean }) =>
//     loading ? <div data-testid='loader'>Loading...</div> : null,
// }));
// const mockUser = {
//   _id: '123',
//   name: 'User',
//   email: 'user@example.com',
//   phone: '+490112232635',
//   address: 'Teststreet',
// };
// const mockNavigate = jest.fn();
// const user = userEvent.setup();
// describe('PersonalData', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//     (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
//     (useAppContext as jest.Mock).mockReturnValue({
//       user: mockUser,
//       setUser: jest.fn(),
//       setNotification: jest.fn(),
//       setIsAuthenticated: jest.fn(),
//       color: '#000',
//     });
//   });
//   test('renders user data ', () => {
//     render(
//       <MemoryRouter>
//         <PersonalData />
//       </MemoryRouter>,
//     );

//     expect(screen.getByText('Full Name:').parentElement).toHaveTextContent(
//       `Full Name: ${mockUser.name}`,
//     );
//     expect(screen.getByText('Email:').parentElement).toHaveTextContent(
//       `Email: ${mockUser.email}`,
//     );
//     expect(screen.getByText('Phone:').parentElement).toHaveTextContent(
//       `Phone: ${mockUser.phone}`,
//     );
//     expect(screen.getByText('Address:').parentElement).toHaveTextContent(
//       `Address: ${mockUser.address}`,
//     );

//     expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
//   });
//   test('switches to edit mode on Edit button click', async () => {
//     render(
//       <MemoryRouter>
//         <PersonalData />
//       </MemoryRouter>,
//     );
//     await user.click(screen.getByText('Edit'));
//     expect(screen.getByTestId('form')).toBeInTheDocument();
//   });

//   test('calls updateUser on valid form submit', async () => {
//     const setUserMock = jest.fn();
//     const updateUserMock = updateUser as jest.Mock;
//     updateUserMock.mockResolvedValueOnce({ ...mockUser, name: 'New name' });
//     (useAppContext as jest.Mock).mockReturnValue({
//       user: mockUser,
//       setUser: setUserMock,
//       setNotification: jest.fn(),
//       setIsAuthenticated: jest.fn(),
//       color: '#000',
//     });

//     render(
//       <MemoryRouter>
//         <PersonalData />
//       </MemoryRouter>,
//     );

//     await user.click(screen.getByText('Edit'));
//     await user.clear(screen.getByPlaceholderText('Full Name'));
//     await user.type(screen.getByPlaceholderText('Full Name'), 'New name');
//     await user.click(screen.getByText('Save'));

//     await waitFor(() => {
//       expect(updateUserMock).toHaveBeenCalledWith(
//         expect.objectContaining({ name: 'New name' }),
//         mockUser._id,
//       );
//       expect(setUserMock).toHaveBeenCalledWith(
//         expect.objectContaining({ name: 'New name' }),
//       );
//     });
//   });
//   test('shows error message if form validation fails', async () => {
//     render(
//       <MemoryRouter>
//         <PersonalData />
//       </MemoryRouter>,
//     );
//     await user.click(screen.getByText('Edit'));
//     await user.clear(screen.getByPlaceholderText('Full Name'));
//     await user.type(screen.getByPlaceholderText('Full Name'), 'N');

//     await user.click(screen.getByText('Save'));

//     await waitFor(() => {
//       expect(
//         screen.getByText('Name must be at least 3 symbols'),
//       ).toBeInTheDocument();
//     });
//   });

//   test('opens confirmation modal on Delete click', async () => {
//     render(
//       <MemoryRouter>
//         <PersonalData />
//       </MemoryRouter>,
//     );
//     await user.click(screen.getByText('Delete'));
//     expect(
//       screen.getByText('Are you sure you want to delete your account?'),
//     ).toBeInTheDocument();
//   });

//   test('calls deleteUser on confirm delete', async () => {
//     const deleteUserMock = deleteUser as jest.Mock;
//     deleteUserMock.mockResolvedValueOnce('User deleted successfully!');
//     const setUserMock = jest.fn();
//     const setIsAuthenticatedMock = jest.fn();
//     const setNotificationMock = jest.fn();

//     (useAppContext as jest.Mock).mockReturnValue({
//       user: mockUser,
//       setUser: setUserMock,
//       setNotification: setNotificationMock,
//       setIsAuthenticated: setIsAuthenticatedMock,
//       color: '#000',
//     });
//     render(
//       <MemoryRouter>
//         <PersonalData />
//       </MemoryRouter>,
//     );
//     await user.click(screen.getByRole('button', { name: 'Delete' }));

//     await user.click(screen.getByText('Yes'));

//     await waitFor(() => {
//       expect(deleteUserMock).toHaveBeenCalled();
//       expect(setUserMock).toHaveBeenCalledWith(null);
//       expect(setIsAuthenticatedMock).toHaveBeenCalledWith(false);
//       expect(setNotificationMock).toHaveBeenCalledWith(
//         'User deleted successfully!',
//       );
//     });
//   });
// });

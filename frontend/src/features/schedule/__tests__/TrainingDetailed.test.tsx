// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom';
// import { TrainingDetailed } from '../../features/schedule/components/training-detailed/TrainingDetailed';

// const mockStartCheckout = jest.fn();

// jest.mock('../../hooks/useCheckout', () => ({
//   useCheckout: () => ({
//     startCheckout: mockStartCheckout,
//   }),
// }));

// jest.mock('../../services/scheduleService', () => ({
//   getTrainingById: jest.fn(),
// }));

// jest.mock('../../hooks/useFetchDataWithParam', () => ({
//   useFetchDataWithParam: () => ({
//     data: {
//       _id: 'training123',
//       datetime: new Date('2025-06-25T10:00:00.000Z'),
//       duration: 60,
//       spots_taken: 3,
//       spots_total: 10,
//       trainer_id: {
//         _id: 'trainer001',
//         fullName: 'Anna Smith',
//         experience: 5,
//         photo: 'https://example.com/avatar.jpg',
//         about: 'Certified yoga instructor with 5 years of experience',
//       },
//       yogaStyle_id: {
//         _id: 'style001',
//         title: 'Hatha Yoga',
//         description: 'Gentle introduction to basic yoga postures',
//       },
//       type: 'group',
//       price: 15,
//       priceId: 'price_abc123',
//     },
//     loading: false,
//     error: null,
//   }),
// }));

// describe('TrainingDetailed', () => {
//   beforeEach(() => {
//     mockStartCheckout.mockClear();
//   });

//   test('renders training details correctly', () => {
//     render(<TrainingDetailed id='training123' />);
//     expect(screen.getByText('Hatha Yoga')).toBeInTheDocument();
//     expect(screen.getByText(/Certified yoga instructor/i)).toBeInTheDocument();
//     expect(screen.getByText('Anna Smith')).toBeInTheDocument();
//     expect(screen.getByText('Price:')).toBeInTheDocument();
//     expect(screen.getByText('15 $')).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /book/i })).toBeInTheDocument();
//   });

//   test('starts checkout session on buy click', async () => {
//     const user = userEvent.setup();
//     render(<TrainingDetailed id='training123' />);
//     const button = screen.getByRole('button', { name: /book/i });
//     await user.click(button);
//     expect(mockStartCheckout).toHaveBeenCalledTimes(1);
//     expect(mockStartCheckout).toHaveBeenCalledWith('training123', 'training');
//   });
// });

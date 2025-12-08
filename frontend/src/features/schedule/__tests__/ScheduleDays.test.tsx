import { render, screen, fireEvent } from '@testing-library/react';
import { getNext7Days } from '../../../utils/dateHelpers';
import { ScheduleDays } from '../components/schedule-days/ScheduleDays';

jest.mock('../../../utils/dateHelpers');

describe('ScheduleDays', () => {
  const mockSetDay = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (getNext7Days as jest.Mock).mockReturnValue([
      new Date('2025-12-07'),
      new Date('2025-12-08'),
      new Date('2025-12-09'),
      new Date('2025-12-10'),
      new Date('2025-12-11'),
      new Date('2025-12-12'),
      new Date('2025-12-13'),
    ]);
  });

  test('renders 7 days', () => {
    render(<ScheduleDays day={new Date('2025-12-07')} setDay={mockSetDay} />);

    const days = screen.getAllByRole('listitem');
    expect(days).toHaveLength(7);
  });

  test('marks the active day correctly', () => {
    render(<ScheduleDays day={new Date('2025-12-09')} setDay={mockSetDay} />);

    const activeDay = screen.getByText('Tuesday').closest('li'); // 2025-12-09
    expect(activeDay).toHaveClass('active');
  });

  test('calls setDay when a day is clicked', () => {
    render(<ScheduleDays day={new Date('2025-12-07')} setDay={mockSetDay} />);

    const dayToClick = screen.getByText('08/12').closest('li'); // 2025-12-08
    fireEvent.click(dayToClick!);

    expect(mockSetDay).toHaveBeenCalledWith(new Date('2025-12-08'));
  });
});

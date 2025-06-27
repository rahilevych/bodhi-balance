import { render, screen } from '@testing-library/react';
import { ProfileNav } from './ProfileNav';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('ProfileNav', () => {
  const tabs = ['Profile', 'Subscription', 'My bookings', 'Payments'];
  const onTabChange = jest.fn();

  test('renders component with all tabs', () => {
    render(<ProfileNav activeTab={tabs[0]} onTabChange={onTabChange} />);
    tabs.forEach(async (tab) => {
      expect(screen.getByText(tab)).toBeInTheDocument();
    });
  });

  test('calls onTabChange with correct tab on click', async () => {
    const user = userEvent.setup();
    render(<ProfileNav activeTab={tabs[0]} onTabChange={onTabChange} />);

    for (const tab of tabs) {
      await user.click(screen.getByText(tab));
      expect(onTabChange).toHaveBeenCalledWith(tab);
    }
  });
});

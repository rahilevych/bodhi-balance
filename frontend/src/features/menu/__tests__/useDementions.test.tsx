import { render } from '@testing-library/react';
import { useDimensions } from '../hooks/useDimensions';
import { useRef } from 'react';

describe('useDimensions hook', () => {
  test('returns correct width and height', () => {
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null);
      const { width, height } = useDimensions(ref);
      return (
        <div ref={ref} style={{ width: 200, height: 150 }}>
          {width}-{height}
        </div>
      );
    };

    const { container } = render(<TestComponent />);
    expect(container.textContent).toBe('0-0');
  });
});

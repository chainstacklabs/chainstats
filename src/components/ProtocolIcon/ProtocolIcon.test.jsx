import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProtocolIcon from './ProtocolIcon';

describe('ProtocolIcon', () => {
  it.each(['Monad', 'Plasma', 'Tempo', 'Unichain'])(
    'renders an SVG icon for %s',
    (protocolName) => {
      const { container } = render(<ProtocolIcon protocolName={protocolName} />);
      expect(container.querySelector('svg')).toBeTruthy();
    }
  );

  it('renders a fallback badge for unknown protocols', () => {
    render(<ProtocolIcon protocolName="Unknown Protocol" />);
    expect(screen.getByText('UP')).toBeTruthy();
  });

  it('handles empty and null protocol names without crashing', () => {
    render(<ProtocolIcon protocolName={null} />);
    expect(screen.getByText('?')).toBeTruthy();
  });
});

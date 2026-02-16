import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProtocolIcon from './ProtocolIcon';

describe('ProtocolIcon', () => {
  it('renders provided SVG icons for newly added protocols', () => {
    const { container: monadContainer } = render(
      <ProtocolIcon protocolName="Monad" />
    );
    expect(monadContainer.querySelector('svg')).toBeTruthy();

    const { container: plasmaContainer } = render(
      <ProtocolIcon protocolName="Plasma" />
    );
    expect(plasmaContainer.querySelector('svg')).toBeTruthy();

    const { container: tempoContainer } = render(
      <ProtocolIcon protocolName="Tempo" />
    );
    expect(tempoContainer.querySelector('svg')).toBeTruthy();

    const { container: unichainContainer } = render(
      <ProtocolIcon protocolName="Unichain" />
    );
    expect(unichainContainer.querySelector('svg')).toBeTruthy();
  });

  it('renders a fallback badge for unknown protocols', () => {
    render(<ProtocolIcon protocolName="Unknown Protocol" />);
    expect(screen.getByText('UP')).toBeTruthy();
  });
});

vi.mock('../locations-list/locations-list', () => ({
  LocationsList: () =>
    <div data-testid="mock-locations-list" />,
}));

import { render, screen } from '@testing-library/react';
import NavTabs from './nav-tabs';

describe('Component: NavTabs', () => {
  it('renders container and includes LocationsList', () => {
    render(<NavTabs />);

    const mockLocations = screen.getByTestId('mock-locations-list');

    expect(mockLocations).toBeInTheDocument();
  });
});

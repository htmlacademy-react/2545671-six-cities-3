import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Error404 from './error-404';

describe('Component: error-404', () => {
  it('should render correct', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Error404 />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByTestId('page-notfound')).toBeInTheDocument();
    expect(screen.getByText(/404\./i)).toBeInTheDocument();
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});

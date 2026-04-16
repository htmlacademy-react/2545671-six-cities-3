import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import App from './app';
import { AppRoute, AuthorizationStatus } from '../../consts/consts';
import { makeFakeState } from '../../utils/mocks';
import mockOffers from '../../mock/mock-offers';
import type { State, AppDispatch } from '../../types/state';

vi.mock('../../pages/main-page/main-page', () => ({ __esModule: true, default: () => <div data-testid="page-main">Main</div> }));
vi.mock('../../pages/offer-page/offer-page', () => ({ __esModule: true, default: () => <div data-testid="page-offer">Offer</div> }));
vi.mock('../../pages/favorites-page/favorites-page', () => ({ __esModule: true, default: () => <div data-testid="page-favorites">Favorites</div> }));
vi.mock('../../pages/login-page/login-page', () => ({ __esModule: true, default: () => <div data-testid="page-login">Login</div> }));
vi.mock('../../pages/error-404/error-404', () => ({ __esModule: true, default: () => <div data-testid="page-notfound">404</div> }));

vi.mock('../../hooks/hooks', async () => {
  const actual = await vi.importActual<typeof import('../../hooks/hooks')>('../../hooks/hooks');
  const noopDispatch = ((() => ({})) as unknown) as AppDispatch;
  return {
    __esModule: true,
    ...actual,
    useAppDispatch: () => noopDispatch,
  };
});
vi.mock('../../store/api-action/api-action', () => ({ __esModule: true, checkAuthAction: vi.fn() }));

const makeStaticReducer = <T,>(sliceState: T) => (s = sliceState) => s;

const renderApp = (route: string, preloaded?: Partial<State>) => {
  const history = createMemoryHistory();
  history.push(route);

  const state = makeFakeState(preloaded);
  const store = configureStore({
    reducer: {
      offerReducer: makeStaticReducer(state.offerReducer),
      currentOfferReducer: makeStaticReducer(state.currentOfferReducer),
      favoritesReducer: makeStaticReducer(state.favoritesReducer),
      reviewsReducer: makeStaticReducer(state.reviewsReducer),
      userReducer: makeStaticReducer(state.userReducer),
    },
    preloadedState: state,
    devTools: false,
  });

  return render(
    <Provider store={store}>
      <Router navigator={history} location={history.location}>
        <App />
      </Router>
    </Provider>
  );
};

describe('App routing - routing only', () => {
  it('renders Main on /', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Main);

    renderApp(AppRoute.Main);

    expect(screen.getByTestId('page-main')).toBeInTheDocument();
  });

  it('renders Offer on /offer/:id (routing only, mock OfferPage used)', () => {
    const history = createMemoryHistory();
    const mockOffer = mockOffers[0];
    history.push(`/offer/${mockOffer.id}`);

    renderApp(`/offer/${mockOffer.id}`);

    expect(screen.getByTestId('page-offer')).toBeInTheDocument();
  });

  it('renders Login on /login', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Login);

    renderApp(AppRoute.Login, {
      userReducer: { authorizationStatus: AuthorizationStatus.NoAuth, user: null },
    });

    expect(screen.getByTestId('page-login')).toBeInTheDocument();
  });

  it('renders Favorites on /favorites when authorized', () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Favorites);

    renderApp(AppRoute.Favorites, {
      userReducer: { authorizationStatus: AuthorizationStatus.Auth, user: { name: 'uka', email: 'u@e', avatarUrl: '', isPro: false, token: 'token' } },
    });

    expect(screen.getByTestId('page-favorites')).toBeInTheDocument();
  });

  it('renders 404 on unknown route', () => {
    const history = createMemoryHistory();
    history.push('/some/unknown/path');

    renderApp('/some/unknown/path');

    expect(screen.getByTestId('page-notfound')).toBeInTheDocument();
  });
});

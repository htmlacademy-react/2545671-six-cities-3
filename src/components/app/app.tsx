import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import FavoritesPage from '../../pages/favorites-page/favorites-page';
import MainPage from '../../pages/main-page/main-page';
import OfferPage from '../../pages/offer-page/offer-page';
import Error404 from '../../pages/error-404/error-404';
import LoginPage from '../../pages/login-page/login-page';
import PrivateRoute from '../private-route/private-route';

import { AppRoute } from '../../consts/consts';

import { useAppDispatch } from '../../hooks/hooks';
import { useEffect } from 'react';
import { checkAuthAction } from '../../store/api-action/api-action';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage />}
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferPage />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute >
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Error}
          element={<Error404 />}
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;

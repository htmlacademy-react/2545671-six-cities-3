import { Header } from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { PlaceCard } from '../../components/place-card/place-card';

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import { selectFavoritesByCity, selectFavoriteCities } from '../../selectors/favorites-selector';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { fetchFavoriteAction } from '../../store/api-action/api-action';


function FavoritesPage(): JSX.Element {
  const favoritesByCity = useAppSelector(selectFavoritesByCity);
  const favoriteCities = useAppSelector(selectFavoriteCities);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteAction());
  }, [dispatch]);

  if (favoriteCities.length === 0) {
    return (
      <div className="page page--favorites-empty">
        <Helmet><title>6 cities: favorites empty</title></Helmet>
        <Header />
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  return (
    <div className="page" data-testid="page-favorites">
      <Helmet><title>6 cities: favorites</title></Helmet>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favoriteCities.map((city) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to="#">
                        <span>{city} </span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {favoritesByCity[city].map((card) => (
                      <PlaceCard key={card.id} data={card} variant="favorites" />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;

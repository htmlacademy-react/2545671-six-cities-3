import { Header } from '../../components/header/header';
import NavTabs from '../../components/nav-tabs/nav-tabs';
import Sort from '../../components/sort/sort';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import Spinner from '../../components/spinner/spinner';
import MainEmpty from '../../components/main-empty/main-empty';

import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { PlacesSorting, AuthorizationStatus } from '../../consts/consts';
import { createFilteredAndSortedSelector } from '../../selectors/offers-selectors';
import { fetchAllOffers } from '../../store/api-action/api-action';

function MainPage(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const selectedCity = useAppSelector((state) => state.offerReducer.city);

  const [selectedSorting, setSelectedSorting] = useState<PlacesSorting>(PlacesSorting.Popular);

  const selector = useMemo(() => createFilteredAndSortedSelector(), []);
  const sortedOffers = useAppSelector((state) => selector(state, selectedSorting));

  const isOffersLoading = useAppSelector((state) => state.offerReducer.isLoading);

  const authorizationStatus = useAppSelector((state) => state.userReducer.authorizationStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllOffers());
  }, [dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  if (isOffersLoading) {
    return (
      <div className="page page--gray page--main">
        <Helmet><title>6 cities</title></Helmet>
        <Header />
        <main className="page__main page__main--index">
          <Spinner />
        </main>
      </div>
    );
  }
  const count = sortedOffers.length;

  const isOffersAvailable = count > 0;

  const mainClassName = `page__main page__main--index ${count === 0 ?
    'page__main--index-empty' : ''}`;

  const places = count === 1 ?
    `${count} place to stay in ${selectedCity.name}`
    :
    `${count} places to stay in ${selectedCity.name}`;

  return (
    <div className="page page--gray page--main" data-testid="page-main" >
      <Helmet><title>6 cities</title></Helmet>
      <Header />
      <main
        className={mainClassName}
      >
        <h1 className="visually-hidden">Cities</h1>
        <NavTabs />
        <div className="cities">
          {isOffersAvailable ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{places}</b>
                <Sort selected={selectedSorting} onChange={setSelectedSorting} />
                < OfferList
                  offers={sortedOffers}
                  onActiveOfferChange={setActiveOfferId}
                />
              </section>
              <div className="cities__right-section">
                {selectedCity &&
                  (
                    <Map
                      offers={sortedOffers}
                      location={selectedCity.location}
                      className='cities__map map'
                      activeOfferId={activeOfferId}
                    />
                  )}
              </div>
            </div>
          ) : (
            <MainEmpty cityName={selectedCity.name} />
          )}
        </div>
      </main >
    </div >
  );
}

export default MainPage;

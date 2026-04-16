import { Header } from '../../components/header/header';
import { OfferGallery } from '../../components/offer-gallery/offer-gallery';
import { OfferDetails } from '../../components/offer-details/offer-details';
import { OfferHost } from '../../components/offer-host/offer-host';
import { OfferReviews } from '../../components/offer-reviews/offer-reviews';
import { NearPlaces } from '../../components/near-places/near-places';
import InsideAmenitiesItem from '../../components/inside-amenities-item/inside-amenities-item';
import Error404 from '../error-404/error-404';
import Map from '../../components/map/map';
import Spinner from '../../components/spinner/spinner';

import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { fetchNearbyOffersById, fetchOfferById, fetchReviewsByOfferId } from '../../store/api-action/api-action';
import { clearOffer } from '../../store/current-offer-slice/current-offer-slice';
import { clearReviews } from '../../store/reviews-slice/reviews-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { COUNT_NEARBY_OFFERS, MAX_IMAGES_COUNT, AuthorizationStatus } from '../../consts/consts';

function OfferPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector((state) => state.userReducer.authorizationStatus);
  const { currentOffer, isLoading, isOfferNotFound, nearbyOffers, } = useAppSelector((state) => state.currentOfferReducer);
  const { reviews } = useAppSelector((state) => state.reviewsReducer);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferById(id));
      dispatch(fetchNearbyOffersById(id));
      dispatch(fetchReviewsByOfferId(id));
    }
    return () => {
      dispatch(clearOffer());
      dispatch(clearReviews());
    };
  }, [dispatch, id]);

  if (isOfferNotFound) {
    return <Error404 />;
  }

  if (isLoading || !currentOffer) {
    return (
      <div className="page">
        <Header />
        <main className="page__main page__main--offer">
          <Spinner />
        </main>
      </div>
    );
  }

  const nearby = nearbyOffers.slice(0, COUNT_NEARBY_OFFERS);

  const mapOffers = [...nearby, currentOffer];

  return (
    <div className="page" data-testid="page-offer">
      <Helmet><title>6 cities: offer</title></Helmet>
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <OfferGallery images={currentOffer.images.slice(0, MAX_IMAGES_COUNT)} />
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <OfferDetails
                data={currentOffer}
              />
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <InsideAmenitiesItem
                  services={currentOffer.goods}
                />
              </div>
              <OfferHost
                host={currentOffer.host}
                description={currentOffer.description}
              />
              <OfferReviews
                reviews={reviews}
                isAuth={authStatus === AuthorizationStatus.Auth}
              />
            </div>
          </div>
          <Map
            offers={mapOffers}
            location={currentOffer.location}
            className='offer__map map'
            activeOfferId={currentOffer.id}
            allowHover={false}
          />
        </section>
        <div className="container">
          <NearPlaces
            offers={nearby}
          />
        </div>
      </main>
    </div>
  );
}

export default OfferPage;

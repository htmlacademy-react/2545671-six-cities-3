import { ReviewItem } from '../review-item/review-item';
import { ReviewsForm } from '../reviews-form/reviews-form';
import { memo } from 'react';

import { Review } from '../../types/review';
import { sortReviewsByDate } from '../../utils/utils';
import { MAX_REVIEW_COUNT } from '../../consts/consts';

type OfferReviewsProps = {
  reviews: Review[];
  isAuth: boolean;
}

function OfferReviewsComponent({ reviews, isAuth }: OfferReviewsProps): JSX.Element {
  const sortedReviews = sortReviewsByDate(reviews).slice(0, MAX_REVIEW_COUNT);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortedReviews.map((review) => (
          <ReviewItem
            key={review.id}
            data={review}
          />))}
      </ul>
      {isAuth ? <ReviewsForm /> : null}
    </section>
  );
}

export const OfferReviews = memo(OfferReviewsComponent);

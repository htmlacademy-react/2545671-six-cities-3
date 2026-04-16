import { memo } from 'react';
import { formatDateForTime, getRating } from '../../utils/utils';
import { Review } from '../../types/review';


type ReviewItemProps = {
  data: Review;
}
function ReviewItemComponent({ data }: ReviewItemProps): JSX.Element {
  const { text, dateTime } = formatDateForTime(data.date, 'en-US');
  const newRating = getRating(data.rating);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={data.user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {data.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: newRating }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {data.comment}
        </p>
        <time className="reviews__time" dateTime={dateTime}>{text}</time>
      </div>
    </li >
  );
}

export const ReviewItem = memo(ReviewItemComponent);

import { Fragment, ReactEventHandler, useState, FormEvent, memo } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { postReviewAction } from '../../store/api-action/api-action';
import { RATING, RatingLimits } from '../../consts/consts';

type ChangeHandle = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

type ReviewState = {
  rating: number;
  review: string;
};

function ReviewsFormComponent(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { isPosting } = useAppSelector((state) => state.reviewsReducer);
  const [review, setReview] = useState<ReviewState>({ rating: 0, review: '' });

  const handleChange: ChangeHandle = (evt) => {
    const { name, value } = evt.currentTarget;
    setReview({ ...review, [name]: name === 'rating' ? Number(value) : value });
  };

  const isInvalid = (review.rating === 0 ||
    review.review.length < RatingLimits.Min ||
    review.review.length > RatingLimits.Max);

  const handleFormSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!id) {
      return null;
    }
    if (isInvalid) {
      return;
    }
    try {
      await dispatch(postReviewAction({
        id: id,
        rating: review.rating,
        comment: review.review
      })).unwrap();

      setReview({ rating: 0, review: '' });
    } catch (_err) {
      void _err;
    }
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(evt) => void handleFormSubmit(evt)}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING.map(({ value, label }) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              onChange={handleChange}
              checked={review.rating === value}
              disabled={isPosting}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={label}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleChange}
        value={review.review}
        disabled={isPosting}

      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span>
          and describe your stay with at least{' '}
          <b className="reviews__text-amount">{RatingLimits.Min} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isInvalid || isPosting}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export const ReviewsForm = memo(ReviewsFormComponent);

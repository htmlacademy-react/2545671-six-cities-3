import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './error-404.css';

export default function Error404(): JSX.Element {
  return (
    <div
      className='error'
      data-testid="page-notfound"
    >
      <Helmet><title>6 cities: error</title></Helmet>
      <h1 className='error-title'>
        404.
        <br />
        <small className='error-small'>
          Page not found
        </small>
      </h1>
      <Link className='error-link' to="/">
        Go to main page
      </Link>
    </div>
  );
}

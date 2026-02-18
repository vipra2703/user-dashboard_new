import { Spinner } from 'react-bootstrap';

export function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">{message}</span>
      </Spinner>
      {/* <p className="mt-3 text-muted">{message}</p> */}
    </div>
  );
}

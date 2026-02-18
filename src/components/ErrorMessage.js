import { Alert, Button } from 'react-bootstrap';

export function ErrorMessage({ message, onRetry }) {
  return (
    <Alert variant="danger" className="d-flex align-items-center justify-content-between">
      <div>
        <Alert.Heading className="h6 mb-1">Error</Alert.Heading>
        <p className="mb-0">{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline-danger" size="sm" onClick={onRetry}>
          Retry
        </Button>
      )}
    </Alert>
  );
}

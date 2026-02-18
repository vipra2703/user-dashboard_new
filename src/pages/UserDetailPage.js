import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Button, ListGroup, Badge } from 'react-bootstrap';
import { userService } from '../services/userService';
import { useUserContext } from '../context/UserContext';
import { LoadingSpinner, ErrorMessage } from '../components';

export function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { selectedUsers, toggleUserSelection } = useUserContext();
  const isSelected = selectedUsers.includes(Number(id));

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [userData, userPosts] = await Promise.all([
        userService.getUserById(id),
        userService.getUserPosts(id)
      ]);
      setUser(userData);
      setPosts(userPosts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  if (loading) {
    return <LoadingSpinner message="Loading user details..." />;
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage message={error} onRetry={fetchUserData} />
        <Button variant="secondary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <ErrorMessage message="User not found" />
        <Button variant="secondary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Button
        variant="outline-secondary"
        onClick={() => navigate('/dashboard')}
        className="mb-4"
      >
        &larr; Back to Dashboard
      </Button>

      <Row>
        <Col lg={4} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">User Profile</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <div
                  className="rounded-circle bg-secondary d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: '100px', height: '100px' }}
                >
                  <span className="text-white fs-1">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h4>{user.name}</h4>
                <p className="text-muted mb-0">@{user.username}</p>
              </div>

              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Email:</strong>
                  <span>{user.email}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Phone:</strong>
                  <span>{user.phone}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <strong>Website:</strong>
                  <span>{user.website}</span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
            <Card.Footer>
              <Button
                variant={isSelected ? 'success' : 'outline-primary'}
                className="w-100"
                onClick={() => toggleUserSelection(Number(id))}
              >
                {isSelected ? 'Selected' : 'Select User'}
              </Button>
            </Card.Footer>
          </Card>
        </Col>

        <Col lg={8}>
          <Row className="g-4">
            <Col md={6}>
              <Card className="shadow-sm h-100">
                <Card.Header>
                  <h5 className="mb-0">Company</h5>
                </Card.Header>
                <Card.Body>
                  <h6>{user.company?.name}</h6>
                  <p className="text-muted mb-2">
                    <em>"{user.company?.catchPhrase}"</em>
                  </p>
                  <Badge bg="secondary">{user.company?.bs}</Badge>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm h-100">
                <Card.Header>
                  <h5 className="mb-0">Address</h5>
                </Card.Header>
                <Card.Body>
                  <p className="mb-1">{user.address?.street}, {user.address?.suite}</p>
                  <p className="mb-1">{user.address?.city}, {user.address?.zipcode}</p>
                  <small className="text-muted">
                    Geo: {user.address?.geo?.lat}, {user.address?.geo?.lng}
                  </small>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12}>
              <Card className="shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Recent Posts</h5>
                  <Badge bg="primary">{posts.length} posts</Badge>
                </Card.Header>
                <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {posts.length === 0 ? (
                    <p className="text-muted text-center">No posts found</p>
                  ) : (
                    <ListGroup variant="flush">
                      {posts.slice(0, 5).map(post => (
                        <ListGroup.Item key={post.id}>
                          <h6 className="mb-1">{post.title}</h6>
                          <p className="text-muted mb-0 small">{post.body}</p>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

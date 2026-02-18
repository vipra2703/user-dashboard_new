import { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Card, Row, Col, Form } from 'react-bootstrap';
import { userService } from '../services/userService';
import { useUserContext } from '../context/UserContext';
import { useDebounce, useFetch } from '../hooks';
import {
  LoadingSpinner,
  ErrorMessage,
  SearchBar,
  Pagination,
  UserTable
} from '../components';

export function DashboardPage() {
  const [searchInput, setSearchInput] = useState('');

  const {
    selectedUsers,
    filters,
    toggleUserSelection,
    updateFilters
  } = useUserContext();

  const debouncedSearch = useDebounce(searchInput, 300);

  // Fetch users using useFetch hook
  const { data: users, loading, error, refetch } = useFetch(
    useCallback(() => userService.getUsers(), []),
    []
  );

  // Update search filter when debounced value changes
  useEffect(() => {
    updateFilters({ search: debouncedSearch, currentPage: 1 });
  }, [debouncedSearch, updateFilters]);

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let result = [...(users || [])];

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(user =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.company?.name.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    result.sort((a, b) => {
      let aValue, bValue;

      switch (filters.sortField) {
        case 'email':
          aValue = a.email;
          bValue = b.email;
          break;
        case 'company':
          aValue = a.company?.name || '';
          bValue = b.company?.name || '';
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      const comparison = aValue.localeCompare(bValue);
      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [users, filters.search, filters.sortField, filters.sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedUsers.length / filters.pageSize);

  const paginatedUsers = useMemo(() => {
    const startIndex = (filters.currentPage - 1) * filters.pageSize;
    return filteredAndSortedUsers.slice(startIndex, startIndex + filters.pageSize);
  }, [filteredAndSortedUsers, filters.currentPage, filters.pageSize]);

  // Handlers
  const handleSort = useCallback((field, order) => {
    updateFilters({ sortField: field, sortOrder: order });
  }, [updateFilters]);

  const handlePageChange = useCallback((page) => {
    updateFilters({ currentPage: page });
  }, [updateFilters]);

  const handlePageSizeChange = useCallback((e) => {
    updateFilters({ pageSize: Number(e.target.value), currentPage: 1 });
  }, [updateFilters]);

  if (loading) {
    return <LoadingSpinner message="Loading users..." />;
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>User Management Dashboard</h1>
          <p className="text-muted">
            Manage and view all users in the system
          </p>
        </Col>
      </Row>

      {error && (
        <ErrorMessage message={error} onRetry={refetch} />
      )}

      <Card className="shadow-sm">
        <Card.Header className="bg-white py-3">
          <Row className="align-items-center g-3">
            <Col xs={12} md={6} lg={4}>
              <SearchBar
                value={searchInput}
                onChange={setSearchInput}
                placeholder="Search by name, email, or company..."
              />
            </Col>
            <Col xs={12} md={6} lg={4} className="ms-auto">
              <div className="d-flex align-items-center justify-content-md-end gap-2">
                <Form.Label className="mb-0 text-nowrap">Show:</Form.Label>
                <Form.Select
                  value={filters.pageSize}
                  onChange={handlePageSizeChange}
                  style={{ width: 'auto' }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                </Form.Select>
                <span className="text-muted">entries</span>
              </div>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body className="p-0">
          <UserTable
            users={paginatedUsers}
            selectedUsers={selectedUsers}
            onToggleSelection={toggleUserSelection}
            sortField={filters.sortField}
            sortOrder={filters.sortOrder}
            onSort={handleSort}
          />
        </Card.Body>

        <Card.Footer className="bg-white py-3">
          <Row className="align-items-center">
            <Col xs={12} md={6} className="mb-3 mb-md-0">
              <span className="text-muted">
                Showing {paginatedUsers.length} of {filteredAndSortedUsers.length} users
                {selectedUsers.length > 0 && ` (${selectedUsers.length} selected)`}
              </span>
            </Col>
            <Col xs={12} md={6}>
              <Pagination
                currentPage={filters.currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
}

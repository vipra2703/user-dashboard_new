import { Table, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { memo, useCallback } from 'react';
import { SortableHeader } from './SortableHeader';

export const UserTable = memo(function UserTable({
  users,
  selectedUsers,
  onToggleSelection,
  sortField,
  sortOrder,
  onSort
}) {
  const navigate = useNavigate();

  const handleRowClick = useCallback((userId) => {
    navigate(`/users/${userId}`);
  }, [navigate]);

  const handleCheckboxClick = useCallback((e, userId) => {
    e.stopPropagation();
    onToggleSelection(userId);
  }, [onToggleSelection]);

  if (users.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        <p className="mb-0">No users found</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <Table striped hover className="mb-0">
        <thead className="table-dark">
          <tr>
            <th style={{ width: '50px' }}>
              <Form.Check
                type="checkbox"
                checked={users.length > 0 && users.every(u => selectedUsers.includes(u.id))}
                onChange={() => {
                  const allSelected = users.every(u => selectedUsers.includes(u.id));
                  users.forEach(u => {
                    if (allSelected || !selectedUsers.includes(u.id)) {
                      onToggleSelection(u.id);
                    }
                  });
                }}
                aria-label="Select all"
              />
            </th>
            <SortableHeader
              field="name"
              label="Name"
              currentSortField={sortField}
              currentSortOrder={sortOrder}
              onSort={onSort}
            />
            <SortableHeader
              field="email"
              label="Email"
              currentSortField={sortField}
              currentSortOrder={sortOrder}
              onSort={onSort}
            />
            <SortableHeader
              field="company"
              label="Company"
              currentSortField={sortField}
              currentSortOrder={sortOrder}
              onSort={onSort}
            />
            <th className="d-none d-md-table-cell">City</th>
            <th style={{ width: '100px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr
              key={user.id}
              onClick={() => handleRowClick(user.id)}
              style={{ cursor: 'pointer' }}
              className={selectedUsers.includes(user.id) ? 'table-primary' : ''}
            >
              <td onClick={(e) => e.stopPropagation()}>
                <Form.Check
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={(e) => handleCheckboxClick(e, user.id)}
                  aria-label={`Select ${user.name}`}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.company?.name || '-'}</td>
              <td className="d-none d-md-table-cell">{user.address?.city || '-'}</td>
              <td onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleRowClick(user.id)}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
});

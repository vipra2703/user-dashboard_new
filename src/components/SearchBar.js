import { Form, InputGroup } from 'react-bootstrap';
import { memo } from 'react';

export const SearchBar = memo(function SearchBar({ value, onChange, placeholder = 'Search users...' }) {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text>
        <i className="bi bi-search"></i>
        Search
      </InputGroup.Text>
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search"
      />
    </InputGroup>
  );
});

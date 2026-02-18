#  User Dashboard

A React-based user management dashboard application that provides authentication, user listing, and detailed user insights through a clean and intuitive interface.

---

##  Pages Overview

---

##  Login Page

A simple and secure authentication interface with built-in validation.

### Features
- Username and password input fields
- Client-side form validation with error messages
- Loading indicator during authentication
- Redirects to the dashboard upon successful login
- Session persistence using localStorage

---

##  Dashboard Page

The core user management interface featuring an interactive and scalable data table.

### Features

####  Search
- Search users by name, email, or company
- Debounced input for performance optimization

####  Sorting
- Clickable column headers to sort by:
  - Name
  - Email
  - Company
- Supports ascending and descending order

####  Pagination
- Efficient navigation through users
- Configurable page sizes:
  - 5
  - 10
  - 25

####  User Selection
- Select individual users using checkboxes
- Select or deselect all users at once

####  Loading State
- Displays a spinner while fetching user data

####  Error Handling
- User-friendly error messages
- Retry option for failed API calls

---

##  User Detail Page

A comprehensive view of an individual user's profile and activity.

### Features

####  User Profile Card
- Avatar
- Name & Username
- Email
- Phone
- Website

####  Company Information
- Company name
- Catchphrase
- Business type

####  Address Details
- Street
- Suite
- City
- Zipcode

####  Recent Posts
- Displays up to 5 recent posts by the user

####  User Selection
- Toggle user selection directly from the detail page

####  Navigation
- Back button for easy return to the dashboard

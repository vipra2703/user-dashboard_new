User Dashboard
A React-based user management dashboard application that provides authentication, user listing, and detailed user insights through a clean and intuitive interface.
________________________________________
Pages Overview
Login Page
A simple and secure authentication interface with built-in validation.
Features
    •	Username and password input fields
    •	Client-side form validation with error messages
    •	Loading indicator during authentication
    •	Redirects to the dashboard upon successful login
    •	Session persistence using localStorage
    
________________________________________
Dashboard Page
The core user management interface featuring an interactive and scalable data table.
Features
    •	Search
    Search users by name, email, or company with debounced input for performance optimization
    •	Sorting
    Clickable column headers to sort by:
    o	Name
    o	Email
    o	Company
    (Ascending / Descending order)
    •	Pagination
    o	Navigate through users efficiently
    o	Configurable page sizes: 5, 10, 25
    •	User Selection
    o	Select individual users using checkboxes
    o	Select or deselect all users at once
    •	Loading State
    o	Displays a spinner while fetching user data
    •	Error Handling
    o	User-friendly error messages
    o	Retry option for failed API calls 
________________________________________
User Detail Page
A comprehensive view of an individual user's profile and activity.
Features
    •	User Profile Card
    o	Avatar
    o	Name & Username
    o	Email, Phone, Website
    •	Company Information
    o	Company name
    o	Catchphrase
    o	Business type
    •	Address Details
    o	Street, Suite, City, Zipcode
    o	Geo coordinates (latitude & longitude)
    •	Recent Posts
    o	Displays up to 5 recent posts by the user
    •	User Selection
    o	Toggle user selection directly from the detail page
    •	Navigation
    o	Back button for easy return to the dashboard


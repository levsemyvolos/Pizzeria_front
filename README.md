# 🍕 Pizzeria Frontend

A modern, responsive pizzeria ordering system built with React and Material-UI. This application provides a seamless experience for customers to browse pizzas, customize orders, and manage their profiles.

> **🔗 Full-Stack Project**: This frontend application is part of a complete pizza ordering system. For the backend API server, visit: [Pizzeria Backend Server](https://github.com/levsemyvolos/Pizzeria_server)

## 🎯 Overview

The Pizzeria Frontend Application is a comprehensive React-based single-page application that delivers an intuitive and engaging user experience for customers to browse pizzas, customize orders, and manage their accounts. This frontend application works in conjunction with the [Pizzeria Backend Server](https://github.com/levsemyvolos/Pizzeria_server) to provide a complete pizza ordering system. The application demonstrates modern frontend development practices with enterprise-level architecture patterns.

This project showcases advanced React development techniques, including:

- **Component-driven architecture** with reusable UI components
- **Context-based state management** for authentication and cart
- **Progressive Web App** capabilities with responsive design
- **Type-safe API integration** with comprehensive error handling
- **Modern UI/UX patterns** following Material Design guidelines
- **Professional routing** with protected routes and navigation guards

## ✨ Features

### 🔐 Authentication System

- User registration and login
- JWT token-based authentication
- Protected routes for authenticated users
- Automatic token refresh and logout on expiry
- Profile management with password change functionality

### 🍕 Pizza Ordering

- Browse available pizzas with high-quality images
- Search functionality to find specific pizzas
- Sort pizzas by name or price (ascending/descending)
- Detailed pizza information with customization options
- Size and dough type selection
- Real-time price calculation based on selections

### 🛒 Shopping Cart

- Add multiple pizzas with different configurations
- Quantity management for each item
- Automatic item grouping by pizza, size, and dough type
- Real-time total calculation
- Persistent cart state during session
- Checkout functionality with order creation

### 📱 Responsive Design

- Mobile-first responsive design
- Modern Material-UI components
- Intuitive navigation with React Router
- Loading states and error handling
- Toast notifications for user feedback

### 📍 Additional Features

- Location page for restaurant information
- User profile management
- Order history tracking
- Order cancellation functionality
- Pagination for large datasets

## 🛠️ Technologies Used

### Frontend Core

- **React 18** - Modern React with hooks and functional components
- **React Router DOM 7** - Client-side routing and navigation
- **Material-UI (MUI) 6** - Comprehensive React component library
- **Emotion** - CSS-in-JS styling solution

### State Management & Forms

- **React Context API** - Global state management for auth and cart
- **Formik 2.4** - Form handling and validation
- **Yup 1.5** - Schema validation for forms

### HTTP & API

- **Axios 1.7** - HTTP client with interceptors for API calls
- **JWT Authentication** - Token-based authentication system

### UI/UX Enhancements

- **React Toastify** - Toast notifications for user feedback
- **Material-UI Icons** - Comprehensive icon library
- **Roboto Font** - Google's Material Design font
- **Date-fns** - Date utility library

### Development Tools

- **Create React App** - Zero-configuration React setup
- **Babel** - JavaScript compiler for modern syntax
- **ESLint** - Code linting and formatting

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Backend API server running on port 8080

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd pizzeria-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   - Ensure your backend API is running on `http://localhost:8080`
   - Update the API URL in `src/services/api.js` if needed

4. **Start the development server**

   ```bash
   npm start
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The application will automatically reload on code changes

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (not recommended)
npm run eject
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Navigation header
│   ├── Footer.js       # Page footer
│   ├── PizzaCard.js    # Pizza display card
│   ├── PizzaModal.js   # Pizza customization modal
│   ├── Cart.js         # Shopping cart component
│   ├── LoginForm.js    # Login form
│   ├── RegisterForm.js # Registration form
│   └── ProtectedRoute.js # Route protection wrapper
├── contexts/           # React Context providers
│   ├── AuthContext.js  # Authentication state
│   └── CartContext.js  # Shopping cart state
├── pages/              # Page components
│   ├── HomePage.js     # Main pizza catalog
│   ├── CartPage.js     # Shopping cart page
│   ├── LocationPage.js # Restaurant locations
│   ├── LoginPage.js    # User login
│   ├── RegisterPage.js # User registration
│   └── UserPage.js     # User profile
├── services/           # API and external services
│   └── api.js          # HTTP client and API calls
├── validation/         # Form validation schemas
│   └── validation.js   # Yup validation schemas
├── App.js              # Main application component
└── index.js            # Application entry point
```

## 🔌 API Integration

The application integrates with a RESTful backend API with the following endpoints:

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### User Management

- `GET /api/users/me` - Get user profile
- `PUT /api/users/me` - Update user profile
- `PUT /api/users/me/password` - Change password

### Pizza Management

- `GET /api/pizzas` - Get pizzas with pagination and filtering

### Order Management

- `POST /api/orders` - Create new order
- `GET /api/orders/my` - Get user's order history
- `PUT /api/orders/:id/cancel` - Cancel order

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory for environment-specific configuration:

```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_ENVIRONMENT=development
```

## 📦 Build and Deployment

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `build/` directory, ready for deployment to any static hosting service.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

_This frontend application demonstrates modern React development practices and serves as a comprehensive example of building scalable, user-friendly web applications with contemporary technologies and design patterns. This is the frontend portion of a full-stack pizzeria application that works in conjunction with the [Pizzeria Backend Server](https://github.com/levsemyvolos/Pizzeria_server) to provide a complete pizza ordering solution._

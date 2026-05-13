# BookMernISM - Book Store Management System

A full-stack book store application built with the MERN stack (MongoDB, Express, React, Node.js) with additional features for modern web development.

## 🚀 Features

- **Book Management**: Browse, search, and manage book inventory
- **User Authentication**: Secure user registration and login system
- **Order Processing**: Complete order management workflow
- **Modern UI**: Responsive design using Tailwind CSS
- **State Management**: Redux Toolkit for efficient state handling
- **File Uploads**: Multer for handling book cover images
- **Real-time Updates**: Fast and responsive user experience

## 🛠 Technology Stack

### Backend (Node.js/Express)
- **Express.js**: Web framework for REST API
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **Multer**: File upload handling
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Frontend (React/Vite)
- **React 19**: Modern React with latest features
- **Vite**: Fast build tool and development server
- **Redux Toolkit**: State management
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **Tailwind CSS**: Utility-first CSS framework
- **React Hook Form**: Form handling
- **React Icons**: Icon library
- **Swiper**: Modern carousel/slider

## 📁 Project Structure

```
BookMernISM/
├── Backend/
│   ├── src/
│   │   ├── books/          # Book-related routes and models
│   │   └── orders/         # Order-related routes and models
│   ├── index.js            # Main server file
│   └── package.json
├── Frontent/
│   └── my-project/
│       ├── src/            # React application source
│       └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
```bash
cd Backend
npm install
npm run start:dev
```

### Frontend Setup
```bash
cd Frontent/my-project
npm install
npm run dev
```

### Environment Variables
Create a `.env` file in the Backend directory:
```
DB_URL=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

## 📡 API Endpoints

### Books
- `GET /api/books` - Get all books
- `POST /api/books` - Add a new book
- `GET /api/books/:id` - Get book by ID
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id` - Update order status

## 🎨 UI Features
- Responsive design for all devices
- Modern, clean interface with Tailwind CSS
- Interactive components with smooth transitions
- Book carousel with Swiper
- Form validation with React Hook Form
- Redux-powered state management

## 🔐 Security Features
- JWT-based authentication
- Password hashing with bcryptjs
- CORS protection
- Input validation and sanitization

## 📦 Deployment Ready
The application is structured for easy deployment to platforms like:
- Vercel (Frontend)
- Heroku/Render (Backend)
- MongoDB Atlas (Database)

## 👤 Author
**Sugesh JR**
- Full-stack developer
- MERN stack specialist
- Modern web development enthusiast

## 📄 License
ISC License

---

**Note**: This project demonstrates modern full-stack development practices with the MERN stack, incorporating the latest React features and best practices for scalable web applications.

# Ripple Chat Application

## Overview

Ripple is a modern real-time chat application built with React and Node.js, enabling users to communicate seamlessly in a secure environment.
## Features

-   **Real-time Messaging**: Instant message delivery using WebSocket technology
-   **User Authentication**: Secure login and registration system
-   **Responsive Design**: Fully responsive UI that works on desktop and mobile devices
-   **Dark Mode**: Built-in dark mode support for better user experience
-   **Online Status**: Real-time user online/offline status indicators
-   **Message History**: Persistent chat history with lazy loading
-   **Profile Management**: User profile customization options
## Tech Stack

### Frontend

-   React.js
-   Redux Toolkit (State Management)
-   TailwindCSS (Styling)
-   Socket.io-client (Real-time Communication)
-   React Router (Navigation)
-   Axios (HTTP Client)

### Backend

-   Node.js
-   Express.js
-   MongoDB (Database)
-   Socket.io (WebSocket Server)
-   JWT (Authentication)
-   Bcrypt (Password Hashing)# API Reference

Let me create an API reference for your backend endpoints.

## API Reference

### Authentication Endpoints

#### Register User
```http
POST /user/register
```
| Body Parameter | Type     | Description                |
| :--------      | :------- | :------------------------- |
| `username`     | `string` | **Required**. Username for new account |
| `password`     | `string` | **Required**. Password for new account |

#### Login
```http
POST /user/login
```
| Body Parameter | Type     | Description                |
| :--------      | :------- | :------------------------- |
| `username`     | `string` | **Required**. Your username |
| `password`     | `string` | **Required**. Your password |

#### Logout
```http
POST /user/logout
```
| Cookie         | Type     | Description                |
| :--------      | :------- | :------------------------- |
| `accessToken`  | `string` | **Required**. JWT access token |
| `refreshToken` | `string` | **Required**. JWT refresh token |

#### Refresh Token
```http
POST /user/refresh-token
```
| Cookie         | Type     | Description                |
| :--------      | :------- | :------------------------- |
| `refreshToken` | `string` | **Required**. JWT refresh token |

#### Check Authentication Status
```http
GET /user/check-auth
```
| Cookie         | Type     | Description                |
| :--------      | :------- | :------------------------- |
| `accessToken`  | `string` | **Required**. JWT access token |

#### Change Password
```http
POST /user/change-password
```
| Parameter      | Type     | Description                |
| :--------      | :------- | :------------------------- |
| `oldPassword`  | `string` | **Required**. Current password |
| `newPassword`  | `string` | **Required**. New password |
| Cookie         | Type     | Description                |
| `accessToken`  | `string` | **Required**. JWT access token |

#### Get Other Users
```http
GET /user/other-users
```
| Cookie         | Type     | Description                |
| :--------      | :------- | :------------------------- |
| `accessToken`  | `string` | **Required**. JWT access token |

### Message Endpoints

#### Send Message
```http
POST /message/send/:senderId/:receiverId
```
| Parameter      | Type     | Description                |
| :--------      | :------- | :------------------------- |
| `senderId`     | `string` | **Required**. ID of message sender |
| `receiverId`   | `string` | **Required**. ID of message receiver |
| `message`      | `string` | **Required**. Message content |
| Cookie         | Type     | Description                |
| `accessToken`  | `string` | **Required**. JWT access token |

#### Get Messages
```http
GET /message/get/:senderId/:receiverId
```
| Parameter      | Type     | Description                |
| :--------      | :------- | :------------------------- |
| `senderId`     | `string` | **Required**. ID of message sender |
| `receiverId`   | `string` | **Required**. ID of message receiver |
| Cookie         | Type     | Description                |
| `accessToken`  | `string` | **Required**. JWT access token |

### Authentication Notes
- All endpoints except `/user/register` and `/user/login` require authentication via JWT tokens
- Tokens are handled via HTTP-only cookies
- Access token is used for regular authentication
- Refresh token is used to obtain new access tokens when they expire
- Both tokens are automatically managed by the authentication middleware

### Socket.IO Integration
The backend includes Socket.IO support for real-time messaging and user status:

#### Connection Setup
- **Connection URL**: Same as REST API base URL
- **Authentication**: Connect with userId in query parameters
- **Connection Options**:
  ```javascript
  {
    withCredentials: true,
    query: {
      userId: "your_user_id"
    }
  }
  ```

#### Events

##### Client to Server Events
1. **setup**
   - Emitted when user connects
   - Payload: `userId` (string)
   ```javascript
   socket.emit('setup', userId)
   ```

2. **sendMessage**
   - Emitted when sending a new message
   ```javascript
   socket.emit('sendMessage', {
     senderId: 'string',
     receiverId: 'string',
     message: 'string'
   })
   ```

##### Server to Client Events
1. **newMessage**
   - Received when a new message arrives
   ```javascript
   {
     _id: 'string',
     senderId: 'string',
     receiverId: 'string',
     message: 'string',
     createdAt: Date,
     updatedAt: Date
   }
   ```

2. **messageError**
   - Received when there's an error with message delivery
   ```javascript
   {
     tempId: 'string',
     error: 'string'
   }
   ```

#### Message Flow
1. Client emits `sendMessage`
2. Server immediately sends acknowledgment
3. Server saves message to database
4. Server emits `newMessage` to receiver if online
5. If database save fails, server emits `messageError`

#### Error Handling
- Socket connection errors return error events
- Message delivery failures trigger messageError events
- Database operation failures are handled gracefully with error notifications

### CORS Configuration
- API supports CORS with credentials
- Allowed origins configured via CORS_ORIGIN environment variable
- Supports both HTTP and Socket.IO connections
- Same-site cookie policy set to 'None' for cross-origin requests
## Environment Variables

### Backend

```
PORT=8000
MONGODB_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=10d
```

### Frontend

```
VITE_BACKEND_URL=http://localhost:8000
```


## Run Locally
To run this project locally, follow these steps:

### Installation
1. Clone the repository:

```bash
git clone <https://github.com/heyswayam/Ripple-chat-app>
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd frontend
npm install
```

4. Set up environment variables:
   Create `.env` files in both backend and frontend directories using the provided `.env.sample` files.

### Running the Application

1. Start the backend server:

```bash
cd backend
npm run dev
```

2. Start the frontend development server:

```bash
cd frontend
npm run dev
```
## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
## Acknowledgments

-   TailwindCSS for the excellent styling framework
-   Socket.io for real-time communication capabilities
-   MongoDB for the reliable database solution









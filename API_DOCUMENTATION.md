# API Documentation

This document describes the API endpoints that need to be implemented by the backend server at `http://127.0.0.1:3001`.

## Base URL
```
http://127.0.0.1:3001
```

## Response Format

All API responses should follow this format:

```typescript
{
  "success": boolean,
  "data": <ResponseData>,
  "error"?: string  // Optional, only present if success is false
}
```

## Endpoints

### 1. Get Site Data
**Endpoint:** `GET /api/site`

**Description:** Retrieves general site information including name, title, bio, and social links.

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "title": "Senior Frontend Engineer",
    "bio": [
      "Bio paragraph 1...",
      "Bio paragraph 2..."
    ],
    "username": "admin",
    "password": "password",
    "socials": [
      {
        "name": "GitHub",
        "url": "https://github.com/username",
        "phone": ""
      },
      {
        "name": "LinkedIn",
        "url": "https://linkedin.com/in/username",
        "phone": ""
      },
      {
        "name": "Email",
        "url": "mailto:user@email.com",
        "phone": "+1234567890"
      }
    ]
  }
}
```

### 2. Update Site Data
**Endpoint:** `PUT /api/site`

**Description:** Updates general site information.

**Request Body:**
```json
{
  "name": "John Doe",
  "title": "Senior Frontend Engineer",
  "bio": ["Bio paragraph 1...", "Bio paragraph 2..."],
  "username": "admin",
  "password": "password",
  "socials": [...]
}
```

**Response:**
```json
{
  "success": true,
  "data": null
}
```

### 3. Get Experience Data
**Endpoint:** `GET /api/experience`

**Description:** Retrieves work experience information.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "role": "Senior Frontend Engineer",
      "company": "TechCorp Inc.",
      "startPeriod": "2020",
      "endPeriod": "Present",
      "description": [
        "Achievement 1...",
        "Achievement 2..."
      ],
      "achievements": [
        "Achievement A...",
        "Achievement B..."
      ]
    }
  ]
}
```

### 4. Update Experience Data
**Endpoint:** `PUT /api/experience`

**Description:** Updates work experience information.

**Request Body:**
```json
[
  {
    "role": "Senior Frontend Engineer",
    "company": "TechCorp Inc.",
    "startPeriod": "2020",
    "endPeriod": "Present",
    "description": [...],
    "achievements": [...]
  }
]
```

**Response:**
```json
{
  "success": true,
  "data": null
}
```

### 5. Get Projects Data
**Endpoint:** `GET /api/projects`

**Description:** Retrieves portfolio projects information.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "pro-analyzer",
      "name": "Pro-Analyzer",
      "description": "An AI-powered text analysis tool...",
      "tech": [
        {
          "id": "react",
          "name": "React",
          "image": ""
        }
      ],
      "demo": "https://demo-url.com",
      "repo": "https://github.com/username/repo",
      "year": 2023
    }
  ]
}
```

### 6. Update Projects Data
**Endpoint:** `PUT /api/projects`

**Description:** Updates portfolio projects information.

**Request Body:**
```json
[
  {
    "id": "pro-analyzer",
    "name": "Pro-Analyzer",
    "description": "An AI-powered text analysis tool...",
    "tech": [
      {
        "id": "react",
        "name": "React",
        "image": ""
      }
    ],
    "demo": "https://demo-url.com",
    "repo": "https://github.com/username/repo",
    "year": 2023
  }
]
```

**Response:**
```json
{
  "success": true,
  "data": null
}
```

## Error Handling

When an error occurs, the API should return an appropriate HTTP status code and error message:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

Common HTTP status codes:
- `200 OK` - Successful GET request
- `201 Created` - Successful POST request
- `204 No Content` - Successful PUT/DELETE request
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## CORS Configuration

The backend must enable CORS to allow requests from the frontend. Example configuration:

```javascript
// Express.js example
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  credentials: true
}));
```

## Testing the API

You can test the API endpoints using tools like:
- Postman
- cURL
- Thunder Client (VS Code extension)

Example cURL command:
```bash
curl -X GET http://127.0.0.1:3001/api/site
```

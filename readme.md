# Ticket Management System API

This API provides endpoints to manage tickets.

## Endpoints

### 1. API for admin to Seed ticket for first time in DB or reset the server (opens up all the tickets)

Endpoint: `PUT /api/tickets/resetTickets`

Generate 40 tickets in DB or open status of all tickets in server

Schema of the tickets genreated

```javascript
[
  {
    id: "60927a305f0318b3a0e1f81b",
    seatNumber: "1",
    status: "open",
    owner: null,
    createdAt: "2022-05-03T10:30:26.361Z",
    updatedAt: "2022-05-03T10:30:26.361Z",
  },
  ...
];
```

This API uses Bearer token authentication. To authenticate, include an `Authorization` header in your requests with a valid token. This token should match to ACCESS_TOKEN in present in .env file:

```http
Authorization: Bearer GDVFHAED83567YHRIF2975YRUIFH283RUOE2
```

**Response Body**

```javascript
{
    "message": "Successfully generated/reset all tickets"
}
```

### 2. Update the ticket status (open/close + adding user details)

Endpoint: `PATCH /api/tickets/:ticketId`

Creates a new ticket and returns the newly created ticket object.

**Request Body**

```javascript
{
  "status": "open/close",
  "owner": {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "phone": "1234567890"
  }
}
```

**Response Body**

```javascript
{
    "message": "Ticket updated successfully"
}
```

### 3. View ticket status

Endpoint: `GET /api/tickets/:ticketId`

Returns the status of the specified ticket.

**Response Body**

```javascript
{
  "status": "open/close",
}
```

### 4. View all closed tickets

Endpoint: `GET /api/tickets/closed`

Returns a list of all closed tickets.

**Response Body**

```javascript
[
  {
    "id": "60927a305f0318b3a0e1f81d",
    "seatNumber": "5",
    "status": "close",
    "owner": {
      "name": "Bob Smith",
      "email": "bobsmith@example.com",
      "phone": "5555555555"
    },
    "createdAt": "2022-05-03T10:30:26.361Z",
    "updatedAt": "2022-05-03T10:30:26.361Z"
  }
  ...
]
```

### 5. View all open tickets

Endpoint: `GET /api/tickets/open`

Returns a list of all open tickets.

**Response Body**

```javascript
[
  {
    "id": "60927a305f0318b3a0e1f81b",
    "seatNumber": "1",
    "status": "open",
    "owner": null
    "createdAt": "2022-05-03T10:30:26.361Z",
    "updatedAt": "2022-05-03T10:30:26.361Z"
  },
  ...
]
```

### 6. View details of the person owning the ticket

Endpoint: `GET /api/tickets/:ticketId/user`

Returns the user details of the person owning the specified ticket.

**Response Body**

```javascript
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phone": "1234567890"
}
```

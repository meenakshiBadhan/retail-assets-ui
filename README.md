# Retail Asset Management System

A web application for managing retail stores, warehouses, and device inventory.

## Features

- **Dashboard**: Quick access to main sections
- **Store Management**: List, create, edit and view store locations
- **Warehouse Operations**: Track and assign devices to stores

## Tech Stack

- React 19
- Vite
- Ant Design (UI components)
- React Router v7
- Axios
- Zustand (state management)

## Getting Started

### Installation

```bash
npm install
npm run dev
```

### Environment Setup

Create a `.env` file:

```
VITE_API_BASE_URL = http://localhost:8000
VITE_DEFAULT_PAGE_SIZE = 10
```

## What I Would Improve With More Time

### Authentication & Authorization

- User login system
- Role-based permissions for stores and warehouses

### Audit Logging

- Track user actions (create, update, delete)
- Log who made changes and when

### Store Status Management

- Update store statuses
- Better filtering

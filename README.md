# Project Exam 2 - Holidaze

## Brief
The API used for this brief is: https://v2.api.noroff.dev/holidaze

## Description
Holidaze is a venue booking platform that connects property owners with potential guests. The application provides an experience for browsing venues, managing bookings, and handling user profiles.

## Table of Contents
* [Delivery](#delivery)
* [Links](#links)
* [Features](#features)
* [Technical stack](#technical_stack)
* [Project structure](#project_structure)
* [Getting started](#getting_started)
* [Development guidelines](#development_guidelines)
* [Testing](#testing)
* [Building for production](#building_for_production)
* [Contributing](#contributing)

 ## Delivery

### Links
* GitHub - Repository link - https://github.com/rikke-dishington/project-exam-2
* Netlify - Hosted application demo link - stupendous-bienenstitch-f24aa0.netlify.app

## Features

### For Visitors
- Browse a wide selection of venues
- View detailed venue information including:
  - Image galleries
  - Descriptions
  - Facilities
  - Location details
  - Pricing
  - Guest capacity
- Create user accounts
- Login functionality

### For Registered Users
- Book venues with an intuitive booking process
- View upcoming and past bookings
- Edit and cancel bookings
- View booking summaries with pricing details

### For Venue Managers
- List new venues
- Manage venue details
- View booking requests
- Handle venue availability

## Technical Stack

### Core Technologies
- React 18
- Styled Components for styling
- Zustand for state management
- React Router for navigation

### Key Libraries
- react-datepicker for calendar functionality
- react-icons for UI icons
- Other dependencies listed in package.json

## Project Structure
```
src/
├── components/        # Shared/common components
│   ├── common/       # Reusable UI components
│   └── layout/       # Layout components
├── features/         # Feature-based modules
│   ├── bookings/     # Booking feature
│   ├── venues/       # Venue management
│   └── profile/      # User profile
├── context/          # React context providers
├── styles/           # Global styles
└── api/             # API integration
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Development Guidelines

### Code Style
- Follow React best practices
- Use functional components with hooks
- Implement proper error handling
- Maintain consistent naming conventions

### State Management
- Use Zustand for global state
- Organize stores by feature
- Keep actions and selectors separate

### Component Structure
- Organize by feature
- Maintain separation of concerns
- Use common components for reusability

## Testing
Run tests with:
```bash
npm test
```

## Building for Production
Build the project with:
```bash
npm run build
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

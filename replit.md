# Flashcard Quiz Web App

## Overview

A simple, interactive flashcard quiz application built with vanilla HTML, CSS, and JavaScript. The app allows users to study by flipping through flashcards, viewing questions and answers with smooth animations, and optionally tracking their performance. The application focuses on web development concepts and includes 10 pre-loaded flashcards covering HTML, CSS, and JavaScript fundamentals.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: Built entirely with vanilla web technologies without any frameworks or libraries
- **Component-based structure**: Organized into logical sections (header, flashcard display, controls) using semantic HTML
- **CSS-only animations**: Uses CSS transforms and transitions for flashcard flip effects with 3D perspective
- **Responsive design**: Mobile-first approach with flexible layouts that adapt to different screen sizes

### Data Management
- **Static data storage**: Flashcard content stored as JavaScript arrays of objects within the application code
- **Client-side state management**: All application state (current card index, flip state, scores) managed in browser memory
- **No persistence**: User progress and scores are not saved between sessions

### User Interface Design
- **Card-based interface**: Central flashcard with distinct front (question) and back (answer) sides
- **Interactive controls**: Primary buttons for flipping cards and navigation, optional scoring buttons
- **Visual feedback**: Hover effects, smooth transitions, and color-coded buttons for different actions
- **Progressive disclosure**: Answer revealed only when user chooses to flip the card

### Styling Architecture
- **CSS Grid/Flexbox**: Modern layout techniques for responsive positioning and alignment
- **CSS Custom Properties**: Likely uses CSS variables for consistent theming and easy maintenance
- **Gradient backgrounds**: Visual appeal with CSS gradients and shadow effects
- **Typography hierarchy**: Clear font sizing and weight differentiation for readability

## External Dependencies

### Core Technologies
- **HTML5**: Semantic markup structure
- **CSS3**: Styling, animations, and responsive design
- **Vanilla JavaScript**: All interactive functionality and data management

### No External Dependencies
- **No frameworks**: Pure vanilla JavaScript implementation
- **No external libraries**: Self-contained application with no third-party dependencies
- **No backend services**: Entirely client-side application
- **No database**: Static data embedded in JavaScript code
- **No API integrations**: Standalone application with no external service calls

### Browser Requirements
- **Modern browser support**: Requires browsers that support CSS transforms, transitions, and ES6+ JavaScript features
- **No polyfills**: Application likely assumes modern browser environment
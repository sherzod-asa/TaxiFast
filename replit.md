# Overview

This is a Russian intercity taxi booking application built with Flask. The application provides a fare calculator that allows users to calculate trip costs between cities using real-time routing data. It features a modern, responsive web interface with city autocomplete functionality and multiple service tiers (Economy, Comfort, Business, Premium) with different pricing structures.

# User Preferences

Preferred communication style: Simple, everyday language.

## Contact Information
- WhatsApp: +7 952 579-80-13
- Telegram: @Ibragimov_Mehdi  
- Phone: +7 952 579-80-13

## Design Preferences
- Minimalist design with white background and bright accents
- Smaller text sizes for better readability
- Real car background images in hero section
- Footer with contact information

# System Architecture

## Frontend Architecture
- **Single Page Application**: Uses vanilla JavaScript with a class-based calculator component
- **UI Framework**: Bootstrap 5 for responsive design and components
- **Styling**: Custom CSS with CSS variables for theming and modern design patterns
- **JavaScript Architecture**: Modular approach with separate files for calculator logic and general functionality
- **User Experience**: Implements debounced input handling, smooth scrolling, and loading animations
- **Visual Design**: Hero section with car background image, floating contact buttons, and footer with contact information

## Backend Architecture
- **Web Framework**: Flask with a simple route-based structure
- **Application Structure**: Minimal setup with routes separated into a dedicated module
- **Configuration**: Environment-based configuration for API keys and secrets
- **Logging**: Built-in Python logging for debugging and monitoring
- **Pricing Engine**: Static pricing tiers with per-kilometer rates in rubles

## API Integration Strategy
- **City Suggestions**: DaData API for Russian city autocomplete with geolocation
- **Route Calculation**: GraphHopper API for distance and routing calculations
- **API Design**: RESTful endpoints with JSON responses for AJAX interactions

## Data Flow
- **Client-Side**: Real-time city suggestions with dropdown interface
- **Server-Side**: Stateless request processing with external API orchestration
- **Pricing Logic**: Server-side calculation based on distance and selected service tier

# External Dependencies

## Third-Party APIs
- **DaData API**: Russian address and city suggestion service for autocomplete functionality
- **GraphHopper API**: Routing and distance calculation service for trip planning

## Frontend Libraries
- **Bootstrap 5**: CSS framework for responsive design and UI components
- **Font Awesome 6**: Icon library for user interface elements

## Environment Variables
- `GRAPHHOPPER_API_KEY`: Required for route calculation functionality
- `DADATA_API_KEY`: Required for city suggestion features  
- `DADATA_SECRET_KEY`: Authentication secret for DaData API
- `SESSION_SECRET`: Flask session security (falls back to development key)

## Runtime Dependencies
- **Flask**: Python web framework for server-side logic
- **Requests**: HTTP library for external API communication
- **Standard Python Libraries**: os, logging for configuration and monitoring
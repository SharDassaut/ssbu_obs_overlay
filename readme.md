# SSBU Overlay
## Description
A browser-based overlay for OBS that displays Super Smash Bros. Ultimate match information, including player usernames, characters, scores, and current phase sent over a control panel.

## Features
- Real-time match data display
- Player information (usernames, characters)
- Score tracking
- Phase indication
- Control panel for data management

## Setup
### Prerequisites
- Node.js installed
- OBS Studio

### Installation
1. Clone or download this repository
2. Ensure the folder structure is maintained:

/ (root)
├── overlay/
├── img/ (contains overlay display images)
├── chr_pp/ (contains character portraits)
└── server.js

### Run the app
1. Start the server
```bash
node server.js
```
2. Access the components
- Overlay http://localhost:6355/
- Panel http://localhost:6355/panel

## Usage
1. Add the overlay URL as a browser source in OBS
2. Use the control-panel to update match information
3. the overlay will automatically reflect changes in real-time (SSE)

## Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js
- **Compatibility**: Designed for OBS browser sources

## License
This project is licensed under the **CC BY-NC 4.0** license.  
- You may **use, modify, and share** this work.  
- You **must give appropriate credit** to the original author.  
- You **may not use this work for commercial purposes**.    
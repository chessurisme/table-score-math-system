<img height="100px" src="./logo.png" alt="A yellow emoji wearing black-rimmed glasses with a thoughtful expression, resting its hand on its chin.">

# Table Scoring System

A dynamic, interactive web-based scoring system for tracking points and rankings across multiple players. Perfect for math competitions, quiz games, or any point-based scoring scenarios.

## Features

- 🎮 Dynamic player management with real-time score tracking
- 📊 Multiple point categories (2, 3, and 5 points)
- 🏆 Automatic rank calculation with medal-style visualization
- ✏️ Editable player names and headers
- 🎯 Interactive scoring cells with double-click activation
- 🎨 Visual feedback with color-coded scoring sections

## Usage

### Basic Controls

1. Click the "+" button to add a new player row
2. Click on player name cells to edit names
3. Double-click on score cells to toggle points (or long press in mobile)
4. Headers are editable to customize category names

### Scoring System

- **2 Points Section**: 10 questions (blue when active)
- **3 Points Section**: 5 questions (red when active)
- **5 Points Section**: 5 questions (green when active)

### Rankings

- 🥇 First place: Gold background
- 🥈 Second place: Silver background
- 🥉 Third place: Bronze background
- Other places: White background

## Technical Details

### Components

- **GameState**: Manages player count and ID assignment
- **GameConfig**: Contains game settings (scores, colors, medals)
- **ScoreUtils**: Handles score calculations
- **ScoreManager**: Manages scoring logic and rank updates
- **CellFactory**: Creates grid cells and event listeners

## Browser Compatibility

Tested and working in:

- Chrome
- Firefox
- Safari
- Edge

## Development

### Prerequisites

- Modern web browser
- Basic text editor or IDE

### Extending the System

The modular design allows for easy extensions:

1. Modify `GameConfig` to adjust points and colors
2. Update CSS classes for visual changes
3. Extend `ScoreManager` for new scoring rules

## License

MIT License - feel free to use and modify for your needs.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

# About

- 👨🏼‍💻 Developer: Chessurisme
- ⌛ Created: November 24, 2024
- 🎟️ License: MIT License

All Rights Reserved 2024

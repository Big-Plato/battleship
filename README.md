# Battleship Game
![Battleship Game](https://imgur.com/mtOveDv)

## Description

A web implementation of the classic Battleship game, developed with vanilla JavaScript, HTML, and CSS. The game features a human player against CPU in a strategic battle to sink all opponent's ships first.

## Key Features

- 🎮 **Human vs CPU mode**
- 🚢 **Random ship placement**
- 💥 **Turn-based gameplay**
- 🏆 **Automatic win detection**
- 🌊 **Visual attack feedback (hits/misses)**
- 🔄 **Restart and reposition ships option**

## Technologies Used

- Vanilla JavaScript (ES6+)
- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Webpack (for bundling)

## How to Run

### Option 1: GitHub Pages
Available online at: [GitHub Pages Link](http://demiurgos.me/battleship/) <!-- Add actual link later -->

### Option 2: Locally
1. Clone the repository:
```bash
git clone https://github.com/Big-Plato/battleship.git
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm start
```

4. Open in browser:

```bash
http://localhost:8080
```

## Game Rules
Each player has a fleet of 5 ships:

1 Carrier (5 cells)
1 Battleship (4 cells)
1 Cruiser (3 cells)
1 Submarine (3 cells)
1 Patrol Boat (2 cells)

Ships are randomly placed at game start
Players alternate turns attacking enemy coordinates
Hitting all cells of a ship sinks it
First player to sink the entire enemy fleet wins

```Code Structure
src/
├── modules/
│   ├── checkCoord.js       # Ship placement logic
│   ├── collision.js        # Collision detection
│   ├── domManipulation.js  # UI handling
│   ├── game.js             # Core game logic
│   ├── gameBoard.js        # Board and ships
│   ├── gameState.js        # State management
│   ├── player.js           # Player classes
│   ├── ship.js             # Ship class
│   └── utils/
│       └── pubSub.js       # Event system
├── styles/
│   └── styles.css          # Main styles
└── index.js                # Entry point
```
## Future Improvements
- [ ] Add local multiplayer mode
- [ ] Implement different CPU difficulty levels
- [ ] Add ship sinking animations
- [ ] Create scoring system
- [ ] Add sound effects

## Contributing
Contributions are welcome! Follow these steps:

1. Fork the project
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## License
Distributed under the MIT License. 

## Contact
Luis Octávio - luisoctavius.sc@gmail.com

Project Link: https://github.com/Big-Plato/battleship

> :bulb: **Tip:** For best experience, play on a desktop browser with minimum 1024x768 resolution.

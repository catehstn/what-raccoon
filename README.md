# Which Raccoon Are You?

A personality quiz for tech workers in 2025. Find out which iconic raccoon represents your current tech worker experience.

## About

Are you thriving despite the chaos? Burnt out and self-sabotaging? Riding the capitalist alligator? This quiz maps your responses to 8 different raccoon archetypes based on real raccoon incidents:

- 🥃 **Drunk Liquor Store Raccoon** - The Burnt Out Self-Saboteur
- 🏢 **MPR Raccoon** - The Overcommitted
- 🕯️ **Dead Toronto Raccoon (Conrad)** - The Martyr / Cautionary Tale
- 🏛️ **White House Raccoon (Rebecca)** - The Misplaced Fancy
- 🎪 **Trike Riding Melanie / Painting Piper** - The Performer
- 🗑️ **Toronto Raccoon** - The Unkillable
- 🚪 **Stuck Raccoon** - The Compromised
- 🐊 **Alligator-Riding Raccoon** - The Precarious Opportunist

## Features

- 12 questions exploring your relationship with work, values, sustainability, and more
- Clean, simple design with automatic dark mode detection
- Mobile-friendly responsive layout
- Shows multiple results if you're tied between raccoons

## File Structure
```
what-raccoon/
├── index.html       # Main HTML structure
├── styles.css       # All styling including dark mode
├── questions.js     # Quiz questions and answer mappings
├── results.js       # Raccoon descriptions and details
├── quiz.js          # Quiz logic and functionality
└── README.md        # This file
```

## Usage

This is a static HTML/CSS/JS site that can be hosted anywhere:

1. Clone this repository
2. Open `index.html` in a browser, or
3. Host on GitHub Pages, Netlify, Vercel, etc.

## Customization

### Adding Images

Replace the image placeholders in `index.html`:
```html
<div class="image-placeholder">[Add quiz intro image here]</div>
```

With actual images:
```html
<img src="your-image.jpg" alt="Description" style="width: 100%; border-radius: 8px;">
```

### Modifying Questions

Edit `questions.js` to change questions or answer options. Each answer maps to 2 raccoons.

### Updating Raccoon Descriptions

Edit `results.js` to modify the raccoon profiles.

### Changing Colors

The primary color is pink (`#e91e63`). To change it, search and replace in `styles.css`:
- `#e91e63` - primary pink
- `#c2185b` - darker pink (hover states)
- `#ff4081` - lighter pink (dark mode)

## Dark Mode

The quiz automatically detects and honors your system's dark mode preference. No toggle needed!

## Credits

Made by [Cate](https://cate.blog)

Follow me on [LinkedIn](https://www.linkedin.com/in/catehuston/) / [Mastodon](https://hachyderm.io/@cate) / [Bluesky](https://bsky.app/profile/catehstn.bsky.social)

## License

The quiz concept, content, and design are original creative work.
Code implementation generated with assistance from Claude (Anthropic).

Free for personal, educational, and non-commercial use with attribution.

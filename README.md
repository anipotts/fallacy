# Fallacy Slideshow

A modern Next.js web app featuring an immersive slideshow experience with typing effects and fade transitions.

## Features

- 🎨 Black background with pixelated gaming font (Press Start 2P)
- 🖼️ 5 image slideshow with fade in/out transitions (6.2s per slide)
- ⌨️ Typewriter effect for text with red keyword highlighting
- 🎵 Click-to-start background music with mute/unmute control
- ⏱️ Perfectly timed to sync with 31-second beat drop at 138 BPM
- 📱 Fully responsive design for mobile, tablet, and desktop
- 🎭 Final "FALLACY" screen after all slides

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Adding Your Images

Place your 5 images in the `public/images/` directory with the following names:

- `slide1.jpg`
- `slide2.jpg`
- `slide3.jpg`
- `slide4.jpg`
- `slide5.jpg`

### Adding Your Soundtrack

Place your soundtrack in the `public/audio/` directory:

- Name it: `soundtrack.m4a` (or `soundtrack.mp3`)
- The audio will auto-play when the page loads
- Use the mute/unmute button in the top-right corner to control sound
- The timing is optimized for a 31-second beat drop at 138 BPM

### Customizing Text

Edit the `slides` array in `app/page.tsx` to customize the text for each slide. Use `[[keyword]]` syntax to mark words that should appear in red:

```typescript
{
  image: '/images/slide1.jpg',
  text: 'This is [[highlighted]] text with [[red]] keywords.'
}
```

## How It Works

1. Click START button to begin music and slideshow
2. Each slide fades in over 0.7 seconds
3. Text types out character by character (40ms per character)
4. After typing completes, there's a 0.5s pause
5. Both image and text fade out simultaneously over 1 second
6. Next slide begins automatically
7. Timing is synchronized: 5 slides × 6.2 seconds = 31 seconds
8. "FALLACY" appears exactly at the 31-second beat drop at 138 BPM

## Build for Production

```bash
npm run build
npm start
```

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Google Fonts (Press Start 2P)
- CSS Animations

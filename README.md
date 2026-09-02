# Pop Cola - Premium Scrollytelling Experience

A world-class, Awwwards-level beverage website featuring cinematic scroll-controlled product animation. Experience the dramatic carbonation explosion of Pop Cola through an immersive 240-frame image sequence.

## 🎬 Features

### Cinematic Scrollytelling
- **240-frame image sequence** showing the dramatic Pop Cola bottle explosion
- **Scroll-driven animation** with smooth frame interpolation
- **Story beats** that fade in and out at precise scroll positions
- **Premium loading experience** with progress indicator

### Visual Excellence
- Deep black (#050505) studio background matching the image sequence
- Sophisticated Pop Cola red (#e61c24) accent color
- Ultra-minimal premium navigation that fades in on scroll
- Smooth 60fps scrolling with hardware acceleration
- Responsive design optimized for all screen sizes

### Animation Progression
1. **Hero (0-15%)**: Fully intact Pop Cola bottle with dramatic lighting
2. **Pressure Builds (15-35%)**: Subtle carbonation and anticipation
3. **The Pop (35-60%)**: Explosive carbonation with flying droplets and separated cap
4. **Flavor Moment (60-80%)**: Suspended droplets and cinematic detail
5. **Hero Return (80-100%)**: Visual return to premium product composition

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern browser with JavaScript enabled

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server
The app will be available at `http://localhost:5173` (or the next available port)

## 🎨 Design Philosophy

### Brand Direction
- **Premium beverage advertising** aesthetic
- **Cinematic product reveal** with high-energy carbonation
- **Modern editorial web design** with bold typography
- **Luxury black studio environment** for maximum drama

### Color Palette
- Primary: Deep Black `#050505`
- Pop Cola Red: `#e61c24`
- Secondary Red: `#b5151c`
- Text: White with subtle gray variants

### Typography
- **Inter** for clean, modern grotesque styling
- Large headlines with tight tracking (-0.02em)
- Light body text (300-400 weight) for elegance
- Bold uppercase for impact moments

## 📁 Project Structure

```
pop-cola/
├── ExplodedView/          # 240 frames of bottle explosion sequence
├── public/
│   ├── assets/            # Videos and reference images
│   └── ExplodedView/      # Symlink to explosion frames
├── src/
│   ├── components/
│   │   ├── canvas/        # 3D components (legacy)
│   │   ├── layout/        # Navigation
│   │   └── sections/      # Page sections
│   │       ├── ScrollytellingHero.jsx  # Main scroll animation
│   │       └── ProductCTA.jsx          # Purchase section
│   ├── App.jsx            # Main application
│   ├── index.css          # Global styles
│   └── main.jsx           # Entry point
└── package.json
```

## 🛠 Technical Implementation

### Scroll-Linked Image Sequence
- Canvas-based rendering for optimal performance
- Progressive image preloading with visual feedback
- Smooth frame interpolation prevents judder
- Responsive scaling maintains aspect ratio
- GSAP ScrollTrigger for precise scroll control

### Performance Optimizations
- Hardware-accelerated rendering
- Efficient frame caching in memory
- Debounced resize handlers
- Lazy-loaded section content
- Optimized image dimensions

### Key Dependencies
- **React 19.2.8** - UI framework
- **GSAP 3.15.0** - Animation and scroll control
- **Vite 8.2.2** - Build tool and dev server
- **Tailwind CSS 4.3.3** - Utility-first styling

## 🎯 Scroll Story Beats

### Beat 1: Introduction (0-15%)
> "Pop into something refreshing."
> Bold cola. Crisp refreshment. Pure Pop.

### Beat 2: Anticipation (15-35%)
> "Feel the fizz."
> Every bottle holds a little anticipation. Then comes the Pop.

### Beat 3: The Explosion (35-60%)
> "Then everything changes."
> One twist. One release. One unforgettable Pop.

### Beat 4: The Flavor (60-80%)
> "Bold. Refreshing. Unmistakably Pop."
> Rich cola flavor, crisp carbonation, and a refreshingly bold finish.

### Beat 5: Call to Action (80-100%)
> "Ready for another Pop?"
> Pop Cola. Open. Refresh. Repeat.

## 🎬 Animation Details

The explosion sequence features:
- **Realistic fluid simulation** with viscosity and surface tension
- **Individual droplet separation** in varying sizes
- **Carbonation mist** and fine bubble details
- **Displaced cap** floating naturally
- **Intact bottle** throughout the entire sequence
- **Professional lighting** with red rim highlights

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## 📝 License

This project is proprietary. All rights reserved.

## 🎨 Credits

**Creative Direction**: World-class beverage commercial aesthetic  
**Animation**: 240-frame explosion sequence  
**Development**: React + GSAP scrollytelling experience  
**Typography**: Inter font family

---

**Pop Cola** - Bold refreshment. Nigerian pride.
# mamuda-beverages

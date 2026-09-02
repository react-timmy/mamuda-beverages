# Pop Cola - Implementation Guide

## 🎯 What Was Built

A premium, cinematic scrollytelling landing page for Pop Cola featuring:

- **240-frame scroll-controlled explosion sequence** of the Pop Cola bottle
- **5 narrative story beats** synchronized with scroll position
- **Canvas-based rendering** for smooth 60fps performance
- **Progressive image loading** with visual feedback
- **Premium brand aesthetic** with deep black backgrounds and Pop Cola red accents
- **Fully responsive** design optimized for all devices

## 🏗 Architecture Overview

### Core Components

#### 1. ScrollytellingHero.jsx
The main hero section that drives the entire experience:
- **Canvas rendering**: Displays the 240-frame image sequence
- **Scroll-linked animation**: Maps scroll progress to frame index
- **Progressive loading**: Preloads images with priority system
- **Story beats**: Text overlays that fade in/out at specific scroll positions
- **Scroll indicator**: Animated prompt that fades out as user scrolls

**Key Features:**
- 500vh tall section for extended scroll duration
- Sticky canvas that remains fixed while scrolling
- GSAP ScrollTrigger for precise scroll control
- Responsive image scaling maintains aspect ratio

#### 2. App.jsx
Main application structure:
- Imports and registers GSAP ScrollTrigger
- Orchestrates all page sections
- Sets deep black background (#050505)
- Contains product features, experience details, quality section, and CTA

#### 3. Navigation.jsx
Premium minimal navigation:
- Transparent initially, fades to translucent black on scroll
- Ultra-clean center navigation links
- "Get Pop" CTA button in brand red
- Smooth transitions and hover states

#### 4. ProductCTA.jsx
Purchase section with pricing tiers:
- Three pricing options (Single, 6-Pack, 12-Pack)
- Glassmorphic card designs
- Featured "Most Popular" badge
- Atmospheric red glow effect
- Store availability information

### Styling System

#### Color Palette
```css
--color-pop-red: #e61c24          /* Primary brand red */
--color-pop-red-dark: #b5151c     /* Hover/active states */
--color-black-deep: #050505       /* Primary background */
--color-black-secondary: #0A0505  /* Section alternates */
```

#### Typography
- **Font**: Inter (300-900 weights)
- **Headlines**: Black weight (900), tight tracking (-0.02em), uppercase
- **Body**: Light weight (300), relaxed leading
- **Scale**: Responsive from 16px to 128px+

## 🎨 Animation Timeline

### Scroll Progression (500vh)

**0-15% (Hero Intro)**
- Fully intact sealed bottle
- Centered composition
- Text: "Pop into something refreshing"

**15-35% (Pressure Builds)**
- Subtle carbonation visible
- Cap begins to lift slightly
- Text: "Feel the fizz"

**35-60% (The Pop - Climax)**
- Cap separates from bottle
- Explosive cola burst through opening
- Dramatic droplet formation
- Text: "Then everything changes"

**60-80% (Flavor Moment)**
- Suspended droplets around bottle
- Carbonation mist visible
- Text: "Bold. Refreshing. Unmistakably Pop."

**80-100% (Return/CTA)**
- Visual return to hero composition
- Call-to-action buttons appear
- Text: "Ready for another Pop?"

## 🔧 Technical Implementation

### Image Sequence System

**Frame Management:**
```javascript
- 240 frames stored in /ExplodedView/
- Loaded via Canvas 2D API
- Frame index calculated: floor(scrollProgress × 239)
- Cached in memory for instant access
```

**Loading Strategy:**
1. Priority load: First and last frames
2. Progressive load: Remaining frames in sequence
3. Progress indicator updates in real-time
4. Smooth transition to interactive state

**Rendering Pipeline:**
```javascript
1. Clear canvas with #000000 background
2. Calculate aspect-ratio-preserving dimensions
3. Center image on canvas
4. Draw current frame
5. Update frame reference
```

### Scroll Control

**GSAP ScrollTrigger Configuration:**
```javascript
ScrollTrigger.create({
  trigger: containerRef.current,
  start: 'top top',           // Pin when section reaches top
  end: 'bottom bottom',       // Unpin at section end
  scrub: 0.5,                 // Smooth scrubbing with 0.5s lag
  onUpdate: (self) => {
    // Map progress to frame index
    const frameIndex = floor(self.progress × 239);
    renderFrame(frameIndex);
  }
});
```

### Story Beat System

Each `ScrollyBeat` component:
- Positioned absolutely within the canvas overlay
- Fades in/out based on scroll progress
- Controlled via GSAP timeline
- Configurable start/end percentages
- Independent text positioning (left, center, right)

## 📱 Responsive Behavior

### Breakpoints
- **Mobile**: < 768px - Single column, reduced text sizes
- **Tablet**: 768px - 1024px - Adjusted spacing, medium text
- **Desktop**: > 1024px - Full experience, large text

### Canvas Adaptation
- Automatically resizes to window dimensions
- Maintains image aspect ratio
- Centers content on all screen sizes
- Touch-friendly on mobile devices

## 🚀 Performance Optimizations

### Image Loading
- **Progressive loading** prevents blocking
- **Priority system** loads key frames first
- **Memory caching** avoids redundant fetches
- **Lazy sections** below fold

### Rendering
- **Canvas 2D API** for hardware acceleration
- **Frame skipping** prevents redundant draws
- **Debounced resize** handlers
- **Will-change** hints for GPU layers

### Scroll Performance
- **RequestAnimationFrame** for smooth updates
- **GSAP's optimized scrubbing**
- **Minimal DOM manipulation**
- **CSS transforms** over position changes

## 🎯 Brand Consistency

### Visual Language
- Deep black backgrounds (#050505) match image sequence
- No visible canvas edges - seamless integration
- Pop Cola red used sparingly for maximum impact
- Professional studio lighting aesthetic

### Typography Rules
- Headlines: UPPERCASE, black weight, tight tracking
- Body: Sentence case, light weight, relaxed leading
- CTAs: UPPERCASE, medium tracking, bold weight
- Never use gradient text - let product provide color

### Interaction Design
- Smooth, cinematic motion (no sudden jumps)
- Confident, premium hover states
- Subtle micro-interactions
- Clear visual hierarchy

## 🛠 Development Workflow

### Local Development
```bash
npm run dev
# Open http://localhost:5173
```

### Production Build
```bash
npm run build
npm run preview  # Test production build
```

### File Structure
```
src/
├── components/
│   ├── sections/
│   │   ├── ScrollytellingHero.jsx  ← Main scrolly component
│   │   └── ProductCTA.jsx          ← Purchase section
│   └── layout/
│       └── Navigation.jsx          ← Top navigation
├── App.jsx                         ← Main app
├── index.css                       ← Global styles
└── main.jsx                        ← Entry point
```

## 🎨 Customization Guide

### Adjusting Story Beats
Edit `ScrollytellingHero.jsx`:
```javascript
<ScrollyBeat 
  start="15%"    // When beat starts appearing
  end="35%"      // When beat finishes fading out
  className="items-start justify-center pl-8"  // Positioning
>
  <h2>Your Headline</h2>
  <p>Your body text</p>
</ScrollyBeat>
```

### Changing Colors
Edit `src/index.css`:
```css
--color-pop-red: #your-brand-color;
--color-black-deep: #your-background;
```

### Modifying Scroll Duration
Edit `ScrollytellingHero.jsx`:
```javascript
<section style={{ height: '500vh' }}>  // Change 500vh to adjust
```

### Adding New Sections
Edit `App.jsx`:
```javascript
<section id="new-section" className="min-h-screen...">
  {/* Your content */}
</section>
```

## 🐛 Troubleshooting

### Images Not Loading
- Verify symlink: `ls -la public/ExplodedView`
- Check console for 404 errors
- Ensure all 240 frames present in /ExplodedView/

### Scroll Not Smooth
- Check browser console for ScrollTrigger errors
- Verify GSAP is registered: `gsap.registerPlugin(ScrollTrigger)`
- Clear browser cache

### Performance Issues
- Reduce image dimensions if possible
- Lower frame count (adjust frameCount variable)
- Increase scrub value for less frequent updates

### Layout Issues
- Clear browser cache
- Check Tailwind is compiling correctly
- Verify viewport meta tag in index.html

## 📦 Dependencies

Core:
- React 19.2.8
- GSAP 3.15.0 (with ScrollTrigger)
- Vite 8.2.2
- Tailwind CSS 4.3.3

Dev:
- @vitejs/plugin-react 6.1.0
- ESLint 10.9.0

## 🎓 Key Learnings

1. **Canvas is faster than DOM** for image sequences
2. **Progressive loading** improves perceived performance
3. **GSAP ScrollTrigger** provides precise scroll control
4. **Deep black backgrounds** (#050505) create premium feel
5. **Minimal navigation** keeps focus on product
6. **Story beats** guide users through the experience
7. **Priority loading** shows content faster

## 🚀 Future Enhancements

Potential additions:
- WebGL for more advanced effects
- Sound design on scroll milestones
- Horizontal scroll sections
- Parallax background elements
- Mobile-specific interactions
- Analytics integration
- A/B testing framework

---

Built with precision and attention to detail for a world-class beverage experience.

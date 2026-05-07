
# NEMI — Scroll-Animated Landing Page (Updated)

## Assets & Brand
- **Logo**: The uploaded `infintiy_nemi_logo.png` (white infinity-style NEMI logo) — used directly as a 2D image rotating in 3D space on the Y-axis
- **Color Theme**: Deep black/dark navy background with **purple/violet nebula glow** accents, inspired by the uploaded `BNC_AI_new.jpg`
- **Background particles**: Subtle constellation-style floating dots connected by thin lines (matching the reference image), rendered with canvas or CSS

---

## Section 1: Hero — Rotating NEMI Logo
- The uploaded NEMI infinity logo displayed center-screen, **auto-rotating on its Y-axis** at a fixed RPM using CSS 3D transforms (no Three.js needed since it's a 2D logo spinning in 3D)
- Dark background with a **purple/violet nebula glow** effect behind the logo (radial gradient matching the reference)
- Subtle floating constellation particles in the background
- "NEMI" text below the logo (or integrated if already part of the logo)

## Section 2: NEMI Tile — Scroll-Away Parallax
- As user scrolls, the logo + name **stays fixed** while content scrolls past, creating a receding/zoom-away illusion
- The purple glow fades slightly as the section transitions

## Section 3: Reaching Hands — Michelangelo Scroll Animation
- Two Michelangelo "Creation of Adam"-style hands, rendered as SVG silhouettes in a desaturated/muted style against the dark background
- Scroll-driven: hands **scale up and move toward the viewer**, fingers reaching closer
- Hands eventually move off-screen past the viewer

## Section 4: Tagline Reveal — Glass Shine
- Black glassy panel appears center-screen
- Text: **"Accelerating the Manufacturing Renaissance with Physical AI"**
- A **glass shine streak** sweeps left-to-right at ~70-80° angle
- Purple glow subtly returns behind the glass panel

## Technical Approach
- Scroll position tracked via JS to drive all animations (CSS transforms + opacity)
- Background: CSS radial gradients for the purple nebula glow + canvas/CSS animated constellation particles
- Logo rotation: CSS `@keyframes` with `rotateY` and `perspective` for 3D spin effect
- No Three.js/R3F needed — the logo is a flat image with 3D CSS rotation, keeping it lightweight

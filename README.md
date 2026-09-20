# FrameFlow — Responsive & Accessible Image Gallery

A modern, responsive image gallery featuring category filtering, hover effects, smooth transitions, and an accessible full-screen lightbox dialog.

---

## 🚀 Quick Start

Open `index.html` directly in any modern web browser — no build tools, web servers, or external dependencies required.

---

## ✨ Features

- **Responsive Grid**: Adaptive layouts with tailored breakpoints for desktop, tablet (`800px`), and mobile (`520px`).
- **Smooth Filter Animations**: Subtle exit transitions when filtering categories with staggered entry animations.
- **Keyboard Accessible**: Full <kbd>Tab</kbd> sequence navigation across cards and controls with visible focus indicators (`:focus-visible`).
- **Full-Screen Lightbox**: Complete with image caption, title, and dynamic counter.
- **Accessible Focus Management**: Focus automatically moves to the close button on open, traps inside the dialog while active, and returns to the triggering card on close.
- **Background Inactivity**: Applies `inert` to the background while the lightbox is active to prevent accidental background interaction.
- **Keyboard Shortcuts**: Full support for <kbd>Esc</kbd>, <kbd>Enter</kbd>, <kbd>Space</kbd>, and Arrow keys.
- **Touch Gestures**: Left and right swipe gestures supported for mobile devices.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Navigate between category buttons and visible gallery cards |
| <kbd>Enter</kbd> or <kbd>Space</kbd> | Open the lightbox for the focused card, or activate a filter button |
| <kbd>Escape</kbd> | Close the lightbox and return focus to the card |
| <kbd>←</kbd> (Arrow Left) | Navigate to the previous image in the lightbox |
| <kbd>→</kbd> (Arrow Right) | Navigate to the next image in the lightbox |

---

## 🖼️ Adding Your Own Images

Inside `index.html`, find the `<article class="card">` elements and update the `src` and `alt` attributes:

```html
<!-- Replace external URL -->
<img src="https://images.unsplash.com/..." alt="...">

<!-- With your local image -->
<img src="images/my-photo.jpg" alt="A descriptive description of my photo">
```

> **Tip**: Create an `images/` directory in the same folder as `index.html` to store local image assets.

---

## ➕ Adding a New Gallery Card

To add another photo, copy an `<article class="card">` block in `index.html` and customize the data attributes and accessibility tags:

```html
<article class="card" role="button" tabindex="0" data-category="nature"
  data-title="Mountain Sunrise"
  data-subtitle="Nature / Morning"
  aria-haspopup="dialog"
  aria-label="View Mountain Sunrise, Nature / Morning">
  <img src="images/mountain.jpg" alt="Sunrise over snow-capped mountains">
  <div class="card-info">
    <span class="category">Nature</span>
    <div class="card-title">Mountain Sunrise</div>
    <div class="card-subtitle">Nature / Morning</div>
  </div>
</article>
```

### Supported Categories:
- `nature`
- `urban`
- `abstract`

To add a new category:
1. Add a button in `<nav class="filters">`:
   ```html
   <button class="filter-btn" data-filter="architecture" aria-pressed="false">Architecture</button>
   ```
2. Set `data-category="architecture"` on the corresponding cards.

---

## 📁 File Structure

```text
├── index.html     # Semantic HTML with accessibility & ARIA attributes
├── style.css      # Design tokens, responsive grid, focus rings & animations
├── script.js       # Gallery logic, focus trap, transitions & touch swipe
└── README.md      # Project documentation
```

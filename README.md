# Fish Volume Riemann Sum Calculator

An interactive web application that calculates and visualizes Riemann sums for the fish volume model from the AP Calculus AB project.

## Overview

This calculator demonstrates how Riemann sums approximate the volume of a 3D fish model created by rotating cross-sections around the x-axis. The cross-sections are semicircles whose diameters are determined by the difference between two functions:

- f(x) = (¼x - 2)²
- g(x) = -(¼x - 2)² + 4

## Features

- **Interactive Controls**: Adjust the number of rectangles and choose between different Riemann sum methods
- **Real-time Visualization**: See how the approximation changes with different parameters
- **Multiple Sections**: Calculate volumes for the tail, body, or entire fish
- **Error Analysis**: Compare Riemann sum approximations with actual integration values
- **Beautiful Graphs**: Interactive plots using Plotly.js

## How to Use

1. **Open the Application**: Simply open `index.html` in a modern web browser
2. **Select a Section**: Choose whether to calculate the tail, body, or both sections
3. **Adjust Parameters**:
   - Use the slider to change the number of rectangles (1-100)
   - Select the Riemann sum method (Left, Right, or Midpoint)
4. **Calculate**: Click the "Calculate Riemann Sum" button
5. **View Results**: See the approximation, actual value, error, and visualizations

## Mathematical Background

The volume is calculated using the formula:
```
V = π/8 × ∫(upper function - lower function)² dx
```

Where:
- For the tail section (0 to 2.34315): f(x) > g(x)
- For the body section (2.34315 to 13.65685): g(x) > f(x)

## Files

- `index.html` - Main HTML structure
- `styles.css` - Styling and responsive design
- `script.js` - Riemann sum calculations and visualizations
- `README.md` - This file

## Browser Compatibility

Works best in modern browsers that support:
- ES6 JavaScript
- CSS Grid and Flexbox
- HTML5

## Educational Purpose

This calculator is designed for AP Calculus AB students to:
- Understand how Riemann sums approximate definite integrals
- Visualize the relationship between number of rectangles and accuracy
- Compare different Riemann sum methods
- Apply calculus concepts to real-world volume calculations

## Authors

Based on the Physical Design Project by Liu Zuheng (Harry) and Zhu Yuelin (Cindy) 
# Reminder
*AI is involved in this project*

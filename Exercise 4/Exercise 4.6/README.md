# Exercise 4.6

## Aim 
- Make the TV brand count bar chart adaptable to dynamic data dimensions and prevent visual overflow by implementing D3 scales:

- d3.scaleLinear(): Continuous scale mapping raw numerical values (count domain [0, maxCount]) to SVG pixel dimensions (range [0, 800]).
- d3.scaleBand(): Categorical / ordinal scale mapping TV brand categories evenly across the vertical canvas height with inner padding (.paddingInner(0.25)) to space the bars proportionally.

## Changes Implemented

### 1.SVG Canvas Dimensions:
Configured viewBox in assets/js/scriptjs.js to 0 0 1200 1000, ensuring high-resolution rendering and flexible responsiveness within .responsive-svg-container.

### 2.Linear Scale (xScale):
- domain([0, maxCount]): Dynamically derived using d3.max(data, d => d.count) to adapt cleanly to maximum dataset counts (~1096).
- range([0, 800]): Scales bar widths within an 800px boundary while reserving ample margins for text labels.

### 3.Band Scale (yScale):
- domain(data.map(d => d.brand)): Maps all 25 unique television brand entries to distinct vertical bands.
- range([50, 950]): Allocates vertical canvas space from 50px to 950px.
- paddingInner(0.25): Adds an explicit 25% gap between adjacent bars to eliminate overlap.

### 4.Dynamic Data Attributes:
- Vertical position y: Updated from index-based arithmetic to d => yScale(d.brand).
- Bar width: Dynamically mapped via d => xScale(d.count).
- Bar thickness: Managed automatically via yScale.bandwidth().

### 5.Code Cleanup: 
- Removed legacy hardcoded bar heights and manual vertical offsets.
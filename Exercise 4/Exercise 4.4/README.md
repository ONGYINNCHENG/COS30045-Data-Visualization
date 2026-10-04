# Exercise 4.4

# Load Data from CSV

## Aim
I wanted to get comfortable loading a CSV with D3, turning the text into real numbers, and getting the data ready for a chart.

---

## What I Did

1. **Getting the data ready**
   - The television dataset was processed using KNIME (aggregating brand occurrences).
   - Exported as a clean CSV without extra quoting (`Never` option in KNIME).
   - Saved to `assets/Data/Exercise4.4.csv`.

2. **Loading the CSV (`d3.csv`)**
   - I loaded it with `d3.csv()`. Everything comes in as text, so I put a `+` in front of `d.count` to make it a number:
```javascript
     d3.csv("assets/Data/Exercise4.4.csv", d => {
         return {
             brand: d.brand,
             count: +d.count
         };
     })
```

3. **Checking the data**
   - Inside `.then(data => { ... })` I looked at the array to make sure it came through fine, then tried a few D3 helpers on it:
     - `data.length` gave 25, so there are 25 brands.
     - `d3.max(data, d => d.count)` gave 1096, which is Samsung.
     - `d3.min(data, d => d.count)` gave 24, and that's Skyworth and Walton.
     - `d3.extent(data, d => d.count)` gives both in one go, `[24, 1096]`.

4. **Sorting**
   - I sorted it from biggest to smallest by `count`, so the bars will look tidy later:
```javascript
     data.sort((a, b) => b.count - a.count);
```

5. **Passing it on**
   - Last step is sending the sorted data to `drawBarChart(data)`. The actual bar chart gets built in Exercise 4.5.

---

## File Structure
- `index.html`: has the chart container (`.responsive-svg-container`) and the script imports.
- `assets/Data/Exercise4.4.csv`: the TV brand counts.
- `assets/js/scriptjs.js`: loads the CSV, converts the numbers, checks the data, then calls `drawBarChart(data)`.
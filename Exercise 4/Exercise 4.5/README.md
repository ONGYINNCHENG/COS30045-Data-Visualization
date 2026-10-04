# Exercise 4.5

D3 Binding and Drawing with Data

## Aim
In this one I bind the data to SVG elements with D3 and draw horizontal bars, one for each TV brand.

## What I Did

### 1. Binding the data
- I wrote the `drawBarChart` function in [scriptjs.js](file:///assets/js/scriptjs.js).
- To create the bars I used `.selectAll("rect").data(data).join("rect")`, so every brand gets its own `<rect>`.
- Each bar also gets a class based on its count (`bar-${d.count}`), which makes it easier to spot and style later.

### 2. Width, height and fill
- I set a fixed `barHeight` of 20px.
- The width of each bar is just the brand's count (`d.count`), so a bigger count gives a longer bar.
- I filled them with `steelblue` because without a colour you can't see anything.

### 3. Spacing the bars out
- `x` is `0`, so all the bars start from the left edge.
- For `y` I used the index, `i * (barHeight + 5)`, which leaves a 5px gap so the bars don't sit on top of each other.

## What's Still Missing
- **Scaling**: right now the width is the raw count in pixels, not a D3 scale like `d3.scaleLinear()`. So if a count is bigger than the SVG is wide, the bar just runs off the canvas.
- **Labels and axes**: there are no brand names, counts or axes yet. I'll add those in the next exercises with D3 scales and axis generators.
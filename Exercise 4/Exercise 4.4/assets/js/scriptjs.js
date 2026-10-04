// Wait for the web page DOM to fully load before executing JS
document.addEventListener("DOMContentLoaded", function () {

  // 1. Accordion Header Toggle Logic
  const headers = document.querySelectorAll(".accordion-header");

  headers.forEach(function (header) {
    header.addEventListener("click", function () {
      const currentItem = header.parentElement;
      const isActive = currentItem.classList.contains("active");

      // Turn off all other items
      document.querySelectorAll(".accordion-item").forEach(function (item) {
        item.classList.remove("active");
      });

      // If current item is not active, open it
      if (!isActive) {
        currentItem.classList.add("active");
      }
    });
  });

  // 2. Exercise 4.3: Create Responsive D3 SVG Canvas & Test Bar
  const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid #ddd")
    .style("border-radius", "8px");

  svg.append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "#2563eb");

  // ==========================================
  // 3. Exercise 4.4: Load data from CSV & Parse
  // ==========================================
  
  
  d3.csv("Data/tvBrandCount.csv", d => {
    return {
      brand: d.brand,
      count: +d.count
    };
  }).then(data => {
    
    console.log("Converted TV Brand Data:", data);

    
    const maxCount = d3.max(data, d => d.count);
    const minCount = d3.min(data, d => d.count);
    const countExtent = d3.extent(data, d => d.count);

    console.log("Max Count:", maxCount);
    console.log("Min Count:", minCount);
    console.log("Count Extent [min, max]:", countExtent);
  }).catch(error => {
    console.error("Error loading CSV:", error);
  });

});
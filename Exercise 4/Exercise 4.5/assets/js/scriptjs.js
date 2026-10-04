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

  // 2. Exercise 4.3: Create Responsive D3 SVG Canvas
  const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 1600")
    .style("border", "1px solid #ddd")
    .style("border-radius", "8px");

  // ==========================================
  // 3. Exercise 4.4 & 4.5: Load Data & Draw Bars
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

    // === Exercise 4.5：必须写在 then 的大括号里面，这样才能获取到 data ===
    svg.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", 100)                     
      .attr("y", (d, i) => i * 25 + 10)   
      .attr("width", d => d.count)        
      .attr("height", 16)                 
      .attr("fill", "#2563eb");           

  }).catch(error => {
    console.error("Error loading CSV:", error);
  });

});
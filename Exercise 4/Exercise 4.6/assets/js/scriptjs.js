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

  // 2. Exercise 4.3 & 4.6: Create Responsive D3 SVG Canvas
  const svg = d3.select(".responsive-svg-container")
    .append("svg")
    .attr("viewBox", "0 0 1200 1000")
    .style("border", "1px solid #ddd")
    .style("border-radius", "8px");

  // ==============================================================
  // 3. Exercise 4.4, 4.5 & 4.6: Load Data & Apply Scales
  // ==============================================================
  d3.csv("Data/tvBrandCount.csv", d => {
    return {
      brand: d.brand,
      count: +d.count
    };
  }).then(data => {
    
    console.log("Converted TV Brand Data:", data);

    // 计算数据最大值
    const maxCount = d3.max(data, d => d.count);
    console.log("Max Count:", maxCount);

    
    const xScale = d3.scaleLinear()
      .domain([0, maxCount])
      .range([0, 800]); 

    
    const yScale = d3.scaleBand()
      .domain(data.map(d => d.brand)) 
      .range([50, 950])               
      .paddingInner(0.25);            

    // Step 2 & 3: 绘制应用了比例尺的柱子
    svg.selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", 120)                             
      .attr("y", d => yScale(d.brand))            
      .attr("width", d => xScale(d.count))        
      .attr("height", yScale.bandwidth())         
      .attr("fill", "#2563eb");                  

  }).catch(error => {
    console.error("Error loading CSV:", error);
  });

});
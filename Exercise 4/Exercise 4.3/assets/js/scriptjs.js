// Wait for the web page DOM to fully load before executing JS
document.addEventListener("DOMContentLoaded", function () {
  
  // 1. Select all accordion title buttons
  const headers = document.querySelectorAll(".accordion-header");

  headers.forEach(function (header) {
    header.addEventListener("click", function () {
      const currentItem = header.parentElement;
      const isActive = currentItem.classList.contains("active");

      //Turn off all other items.
      document.querySelectorAll(".accordion-item").forEach(function (item) {
        item.classList.remove("active");
      });

      // If the current item is not already open, open it.
      if (!isActive) {
        currentItem.classList.add("active");
      }
    });
  });

const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1200 1600")
  .style("border", "1px solid black");


svg
  .append("rect")
  .attr("x", 10)
  .attr("y", 10)
  .attr("width", 414)
  .attr("height", 16)
  .attr("fill", "blue");

});

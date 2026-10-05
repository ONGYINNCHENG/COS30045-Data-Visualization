document.addEventListener("DOMContentLoaded", function () {

  const drawDonutChart = data => {
    const width = 600;
    const height = 400;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select("#donut-chart")
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("border", "1px solid #ccc")
      .style("border-radius", "8px");

    const innerChart = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.category))
      .range(["#60a5fa", "#34d399", "#fb923c"]);

    const pie = d3.pie()
      .value(d => d.count)
      .sort(null);

    const arc = d3.arc()
      .innerRadius(radius * 0.55)
      .outerRadius(radius);

    const labelArc = d3.arc()
      .innerRadius(radius * 0.75)
      .outerRadius(radius * 0.75);

    const arcs = innerChart.selectAll(".arc")
      .data(pie(data))
      .join("g")
      .attr("class", "arc");

    arcs.append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.category))
      .attr("stroke", "white")
      .style("stroke-width", "2px");

    arcs.append("text")
      .attr("transform", d => `translate(${labelArc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "central")
      .text(d => d.data.category.toUpperCase())
      .style("font-size", "13px")
      .style("font-weight", "600")
      .style("fill", "#1f2937");
  };

  d3.csv("Data/tvdata5.3.csv", d => {
    return {
      category: d["Screensize_Category"],
      count: +d["Count"]
    };
  }).then(data => {
    drawDonutChart(data);
  }).catch(error => {
    console.error("Error loading CSV:", error);
  });

});
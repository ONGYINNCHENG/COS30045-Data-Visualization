document.addEventListener("DOMContentLoaded", function () {

  const drawLineChart = data => {
    const margin = { top: 40, right: 60, bottom: 40, left: 60 };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select("#line-chart")
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .style("border", "1px solid #ccc")
      .style("border-radius", "8px");

    const innerChart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xExtent = d3.extent(data, d => d.year);
    const xScale = d3.scaleLinear()
      .domain(xExtent)
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.averagePrice)])
      .nice()
      .range([innerHeight, 0]);

    innerChart
      .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

    innerChart
      .append("g")
      .call(d3.axisLeft(yScale));

    const lineGenerator = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.averagePrice));

    innerChart
      .append("path")
      .attr("d", lineGenerator(data))
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1.5);

    innerChart
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", 4)
      .attr("cx", d => xScale(d.year))
      .attr("cy", d => yScale(d.averagePrice))
      .attr("fill", "black");
  };

  d3.csv("Data/ARE_Spot_Prices.csv", d => {
    return {
      year: +d["Year"],
      averagePrice: +d["Average Price (notTas-Snowy)"]
    };
  }).then(data => {
    const cleanData = data.filter(d => !isNaN(d.year) && !isNaN(d.averagePrice));
    cleanData.sort((a, b) => a.year - b.year);
    drawLineChart(cleanData);
  }).catch(error => {
    console.error("Error loading CSV:", error);
  });

});
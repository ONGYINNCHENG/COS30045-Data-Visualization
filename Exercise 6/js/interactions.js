const populateFilters = (data) => {

  const updateHistogram = (filterId, data) => {
    const updatedData = filterId === "all"
      ? data
      : data.filter(tv => tv.screenTech === filterId);

    const updatedBins = binGenerator(updatedData);

    d3.selectAll("#histogram rect")
      .data(updatedBins)
      .transition()
      .duration(500)
      .ease(d3.easeCubicInOut)
      .attr("y", d => yScale(d.length))
      .attr("height", d => innerHeight - yScale(d.length));
  };

  d3.select("#filters_screen")
    .selectAll(".filter")
    .data(filters_screen)
    .join("button")
    .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
    .text(d => d.label)
    .on("click", (e, d) => {
      if (!d.isActive) {
        filters_screen.forEach(filter => {
          filter.isActive = d.id === filter.id ? true : false;
        });

        d3.selectAll("#filters_screen .filter")
          .classed("active", filter => filter.id === d.id ? true : false);

        updateHistogram(d.id, data);
      }
    });

};

const createTooltip = () => {
  const tooltip = innerChartS
    .append("g")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("pointer-events", "none");

  tooltip
    .append("rect")
    .attr("width", tooltipWidth)
    .attr("height", tooltipHeight)
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("fill", barColor)
    .attr("fill-opacity", 0.75);

  tooltip
    .append("text")
    .text("")
    .attr("x", tooltipWidth / 2)
    .attr("y", tooltipHeight / 2 + 1)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .style("fill", "white")
    .style("font-weight", "bold")
    .style("font-size", "12px");
};

const handleMouseEvents = () => {
  innerChartS
    .selectAll("circle")
    .on("mouseenter", (e, d) => {
      const tooltip = d3.select(".tooltip");
      const cx = xScaleS(d.star);
      const cy = yScaleS(d.energyConsumption);

      const x = cx - tooltipWidth / 2;
      const y = cy - tooltipHeight - 8;

      tooltip
        .attr("transform", `translate(${x}, ${y})`)
        .transition()
        .duration(200)
        .style("opacity", 1);

      tooltip.select("text").text(d.energyConsumption);

      d3.select(e.target)
        .attr("r", 7)
        .style("opacity", 1);
    })
    .on("mouseleave", (e, d) => {
      d3.select(".tooltip")
        .transition()
        .duration(200)
        .style("opacity", 0);

      d3.select(e.target)
        .attr("r", 4)
        .style("opacity", 0.5);
    });
};
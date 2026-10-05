let tvData = [];

d3.csv("data/W6_TVdata.csv", d => {
  return {
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption,
    star: +d.star
  };
}).then(data => {
  tvData = data;
  console.log("Loaded TV Data:", tvData);

  drawHistogram(tvData);
  populateFilters(tvData);

  drawScatterplot(tvData);

  createTooltip();
  handleMouseEvents();
}).catch(error => {
  console.error("Error loading CSV:", error);
});
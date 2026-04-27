const width = 500, height = 500, margin = 40;
const radius = Math.min(width, height) / 2 - margin;

const svg = d3.select("#speciesPie")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

d3.csv("./data/speciescount.csv").then(data => {
  data.forEach(d => {
    d.Sightings = +d.Sightings;
  });

  //colors
  const color = d3.scaleOrdinal()
    .domain(data.map(d => d["Species (Common Name)"]))
    .range(d3.schemeTableau10);

  //pie creation
  const pie = d3.pie()
    .value(d => d.Sightings);

  //making arc
  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

  //adding data to pie
  svg.selectAll("path")
    .data(pie(data))
    .enter()
    .append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data["Species (Common Name)"]));

  // legend
  const legend = d3.select("#speciesPie svg")
    .append("g")
    .attr("transform", `translate(${width - 20}, 40)`); // Position it on the right

  const speciesNames = data.map(d => d["Species (Common Name)"]);

  const legendItem = legend.selectAll(".legend-item")
    .data(speciesNames)
    .enter()
    .append("g")
    .attr("class", "legend-item")
    .attr("transform", (d, i) => `translate(0, ${i * 20})`);

  legendItem.append("rect")
    .attr("width", 12)
    .attr("height", 12)
    .attr("fill", d => color(d));


  legendItem.append("text")
    .attr("x", 20)
    .attr("y", 10)
    .style("font-size", "15px")
    .text(d => d);
});




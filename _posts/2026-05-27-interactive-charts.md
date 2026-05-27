---
layout: post
title: "Interactive charts with D3"
date: 2026-05-27
d3: true
---

This post is a working reference for the chart system. Any post can opt in by
adding `d3: true` to its front matter, dropping in a chart section with the
`chart.html` include, and drawing into it with the shared `ChartTheme` helpers.

{% include chart.html id="demo-bars" title="Sample scores by group" caption="Placeholder data for demonstration. Hover the bars for values; whiskers show ± one standard deviation." %}

The section above is the reusable pattern: the include renders the titled card
and a mount point, and the script below draws into it using the theme palette,
responsive SVG, gridlines, tooltip, and legend helpers — so every chart on the
site shares one look.

<script>
document.addEventListener('DOMContentLoaded', function () {
  var t = ChartTheme;

  var series = ['Series A', 'Series B', 'Series C'];
  var data = [
    { group: 'Alpha', values: [{ s: 'Series A', v: 0.23, e: 0.03 }, { s: 'Series B', v: 0.17, e: 0.025 }, { s: 'Series C', v: 0.21, e: 0.03 }] },
    { group: 'Beta',  values: [{ s: 'Series A', v: 0.06, e: 0.018 }, { s: 'Series B', v: 0.04, e: 0.015 }, { s: 'Series C', v: 0.05, e: 0.016 }] },
    { group: 'Gamma', values: [{ s: 'Series A', v: 0.03, e: 0.012 }, { s: 'Series B', v: 0.013, e: 0.009 }, { s: 'Series C', v: 0.024, e: 0.011 }] },
    { group: 'Delta', values: [{ s: 'Series A', v: 0.057, e: 0.02 }, { s: 'Series B', v: 0.037, e: 0.015 }, { s: 'Series C', v: 0.05, e: 0.017 }] }
  ];

  var layout = t.responsiveSvg('[data-chart="demo-bars"]', { height: 360 });
  var g = layout.g, innerWidth = layout.innerWidth, innerHeight = layout.innerHeight;
  var svg = d3.select('[data-chart="demo-bars"] svg');

  var x0 = d3.scaleBand().domain(data.map(function (d) { return d.group; }))
    .range([0, innerWidth]).paddingInner(0.28);
  var x1 = d3.scaleBand().domain(series).range([0, x0.bandwidth()]).padding(0.08);
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) { return d3.max(d.values, function (v) { return v.v + v.e; }); })])
    .nice().range([innerHeight, 0]);
  var color = d3.scaleOrdinal().domain(series).range(t.palette);

  t.yGrid(g, y, innerWidth, 5);

  g.append('g').attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + innerHeight + ')')
    .call(d3.axisBottom(x0).tickSize(0)).call(function (s) { s.select('.domain').attr('stroke', t.border); });
  g.append('g').attr('class', 'axis y-axis')
    .call(d3.axisLeft(y).ticks(5)).call(function (s) { s.select('.domain').remove(); });

  var tip = t.tooltip();

  var groups = g.selectAll('.group').data(data).join('g')
    .attr('class', 'group')
    .attr('transform', function (d) { return 'translate(' + x0(d.group) + ',0)'; });

  groups.selectAll('rect').data(function (d) { return d.values; }).join('rect')
    .attr('x', function (v) { return x1(v.s); })
    .attr('width', x1.bandwidth())
    .attr('y', function (v) { return y(v.v); })
    .attr('height', function (v) { return innerHeight - y(v.v); })
    .attr('rx', 2)
    .attr('fill', function (v) { return color(v.s); })
    .on('mousemove', function (event, v) { tip.show('<strong>' + v.s + '</strong><br>' + v.v.toFixed(2) + ' ± ' + v.e.toFixed(2), event); })
    .on('mouseleave', function () { tip.hide(); });

  groups.selectAll('.err').data(function (d) { return d.values; }).join('line')
    .attr('class', 'err')
    .attr('x1', function (v) { return x1(v.s) + x1.bandwidth() / 2; })
    .attr('x2', function (v) { return x1(v.s) + x1.bandwidth() / 2; })
    .attr('y1', function (v) { return y(v.v - v.e); })
    .attr('y2', function (v) { return y(v.v + v.e); })
    .attr('stroke', t.text).attr('stroke-width', 1.2).attr('stroke-opacity', 0.6);

  t.legend(svg, series.map(function (s) { return { label: s, color: color(s) }; }), { x: layout.width - 118, y: 26 });
});
</script>

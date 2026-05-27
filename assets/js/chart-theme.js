// Shared D3 chart theme. Loaded (deferred) on pages with `d3: true`.
// Exposes window.ChartTheme: palette, color tokens, and helpers so every
// chart shares one look. Structural fonts/colors live in assets/css/chart.css;
// this module owns the categorical series palette and reusable D3 plumbing.
(function () {
  function cssVar(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name);
    return (v && v.trim()) || fallback;
  }

  var ChartTheme = {
    // Categorical series palette: terracotta accent + warm neutrals.
    palette: ['#d47f2a', '#e8c9ad', '#6f6f67', '#c7c3b6'],

    text: cssVar('--text', '#141413'),
    muted: cssVar('--muted', '#7c7c74'),
    border: cssVar('--border', '#e7e2d6'),
    accent: cssVar('--accent', '#d47f2a'),

    // Create a responsive SVG (scales via viewBox) inside `container`.
    // Returns { svg, g, innerWidth, innerHeight, width, height, margin }.
    responsiveSvg: function (container, opts) {
      var o = Object.assign(
        { width: 680, height: 380, margin: { top: 18, right: 18, bottom: 48, left: 48 } },
        opts || {}
      );
      var sel = typeof container === 'string' ? d3.select(container) : container;
      sel.selectAll('svg').remove();
      var svg = sel
        .append('svg')
        .attr('class', 'chart-svg')
        .attr('viewBox', '0 0 ' + o.width + ' ' + o.height)
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('role', 'img');
      var g = svg
        .append('g')
        .attr('transform', 'translate(' + o.margin.left + ',' + o.margin.top + ')');
      return {
        svg: svg,
        g: g,
        margin: o.margin,
        width: o.width,
        height: o.height,
        innerWidth: o.width - o.margin.left - o.margin.right,
        innerHeight: o.height - o.margin.top - o.margin.bottom
      };
    },

    // Light horizontal gridlines for a linear y-scale.
    yGrid: function (g, yScale, innerWidth, ticks) {
      g.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(yScale).ticks(ticks || 5).tickSize(-innerWidth).tickFormat(''))
        .call(function (s) { s.select('.domain').remove(); })
        .call(function (s) {
          s.selectAll('line').attr('stroke', ChartTheme.border).attr('stroke-opacity', 0.6);
        });
    },

    // Singleton tooltip; returns { show, move, hide }.
    tooltip: function () {
      var el = d3.select('body').select('.chart-tooltip');
      if (el.empty()) el = d3.select('body').append('div').attr('class', 'chart-tooltip');
      return {
        show: function (html, event) { el.html(html).style('opacity', 1); this.move(event); },
        move: function (event) {
          el.style('left', event.pageX + 14 + 'px').style('top', event.pageY - 10 + 'px');
        },
        hide: function () { el.style('opacity', 0); }
      };
    },

    // Swatch + label legend. `items` = [{ label, color }]. Positioned in svg coords.
    legend: function (svg, items, pos) {
      var g = svg
        .append('g')
        .attr('class', 'legend')
        .attr('transform', 'translate(' + pos.x + ',' + pos.y + ')');
      var rows = g
        .selectAll('g')
        .data(items)
        .join('g')
        .attr('transform', function (d, i) { return 'translate(0,' + i * 18 + ')'; });
      rows
        .append('rect')
        .attr('width', 11)
        .attr('height', 11)
        .attr('rx', 2)
        .attr('y', -9)
        .attr('fill', function (d) { return d.color; });
      rows
        .append('text')
        .attr('x', 17)
        .attr('y', 0)
        .text(function (d) { return d.label; });
      return g;
    }
  };

  window.ChartTheme = ChartTheme;
})();

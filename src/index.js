import * as d3 from 'd3'
import './pieradar.css'
import {
  toDegree,
  calcPercent,
  calcRotateDegree
} from './utils'

// Size of the pie
const pieRadius = 200
const innerRadius = 3.5

// We need to preserve some space for labels
const svgSize = pieRadius * 2 + 250

// Align the root <g> element to center
const rootTranslate = `translate(${svgSize / 2}, ${svgSize / 2})`

const strokeWidth = 1
const rotateDuration = 560
const offDegree = 35
const colorScheme = d3.scaleOrdinal().range([
  '#0674A0', '#99d5eb', '#4cb5db', '#33abd6', '#0096cc', '#0382b0'
])

const data = [
  { label: 'Edge', value: 20, score: 65 },
  { label: 'Chrome', value: 35, score: 85 },
  { label: 'Opera', value: 10, score: 70 },
  { label: 'Firefox', value: 22, score: 90 },
  { label: 'Safari', value: 6, score: 95 },
  { label: 'IE', value: 10, score: 40 },
]
// This is used for calculating percentage
const sum = data.reduce((sum, d) => sum + d.value, 0)

// Step 1 ==========
const svg = d3.select('#pieradar')
  .append('svg')
  .attr('width', svgSize)
  .attr('height', svgSize)

const root = svg.append('g')
  .attr('transform', rootTranslate)

/*
// Step 2 ==========
function drawCircle (r) {
  root.append('circle')
    .attr('r', r - strokeWidth / 2)
    .attr('fill', 'none')
    .attr('stroke', '#bbb')
    .attr('stroke-width', strokeWidth)
}

drawCircle(pieRadius)
drawCircle(pieRadius / 5 * 4)
drawCircle(pieRadius / 5 * 3)
drawCircle(pieRadius / 5 * 2)
drawCircle(pieRadius / 5)

/*
// Step 3 ==========
const arc = d3.arc()
  .innerRadius(innerRadius)
  .outerRadius(d => d.data.score * pieRadius / 100)

const pie = d3.pie()
  .sort(null)
  .value(d => d.value)

// Draw the pie
root.append('g')
  .selectAll('path')
  .data(pie(data))
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', d => colorScheme(d.data.label))

/*
// Step 4 ==========
// Arc with full radius
const fullArc = d3.arc()
  .innerRadius(innerRadius)
  .outerRadius(pieRadius)

// A group contains a hover layer, a label and a blue dot
const hoverG = root.selectAll('g.hover-g')
  .data(pie(data))
  .enter()
  .append('g')
  .attr('class', 'hover-g')

const hoverLayer = hoverG.append('path')
  .attr('d', fullArc)
  .attr('fill', 'rgba(0, 0, 0, .06)')
  .attr('class', 'hide hover-layer')

/*
// Step 5 ==========
// Append the blue dots
hoverG.append('circle')
  .attr('cx', d => fullArc.centroid(d)[0] * 1.96)
  .attr('cy', d => fullArc.centroid(d)[1] * 1.96)
  .attr('r', 2.8)
  .attr('fill', '#33abd6')

// Append the labels
hoverG.append('text')
  .html(d =>
    d.data.label + 
    '<tspan class="label-percent"> ' +
      calcPercent(d.data.value, sum) +
    '%</tspan>'
  )
  .attr('class', 'label')
  .attr('dy', '.35em')
  .attr('text-anchor', d =>
    (d.endAngle + d.startAngle) / 2 > Math.PI ? 'end' : 'start'
  )
  .attr('transform', d => {
    const c = fullArc.centroid(d)
    const x = c[0] * 2.1
    const y = c[1] * 2.1
    return `translate(${x}, ${y})`
  })

/*
// Step 6 ==========
function rotate (el, degree, orgTransform = '') {
  el.transition()
    .duration(rotateDuration)
    .ease(d3.easeBackOut)
    .attr('transform', () => `${orgTransform} rotate(${degree})`)
}

function updateTextAnchor (el, orgDegree, rotateDegree) {
  let finalDegree = orgDegree + rotateDegree
  if (finalDegree > 360) {
    finalDegree -= 360
  }
  if (finalDegree < 180) {
    el.attr('text-anchor', 'start')
  } else {
    el.attr('text-anchor', 'end')
  }
}

function hoverLayerClicked (d) {
  if (!this.classList.contains('hide')) return

  // Hide all the hover layers
  hoverLayer.attr('class', 'hide hover-layer')

  // Display the clicked one
  this.classList.remove('hide')

  const midAngle = (d.startAngle + d.endAngle) / 2
  const rotateDegree = calcRotateDegree(midAngle, offDegree)
  rotate(root, rotateDegree, rootTranslate, rotateDuration)
  // rotateLabels(rotateDegree)
}

hoverLayer.on('click', hoverLayerClicked)

/*
// Step 7 ==========
function rotateLabels (rotateDegree) {
  d3.selectAll('.label').each(function (d) {
    const label = d3.select(this)

    // Hide all the labels when rotating
    this.classList.add('hide')
    setTimeout(() => this.classList.remove('hide'), rotateDuration)

    // Find the original translate
    const orgTransform = label.attr('transform')
    const orgTranslate = orgTransform.substring(
      orgTransform.indexOf('(') + 1,
      orgTransform.indexOf(')')
    ).split(',')

    rotate(
      label,
      rotateDegree * -1,
      `translate(${orgTranslate[0]}, ${orgTranslate[1]})`,
      rotateDuration
    )
    const orgDegree = toDegree((d.endAngle + d.startAngle) / 2)
    updateTextAnchor(label, orgDegree, rotateDegree)
  })
}

// Execute click handler to init state
hoverLayerClicked.bind(
  d3.select('.hover-layer').node()
)(d3.select('.hover-layer').data()[0])

// */

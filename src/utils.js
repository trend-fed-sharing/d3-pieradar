export function toDegree(rad) {
  return rad * (180 / Math.PI)
}

export function calcPercent(value, total) {
  return Math.round(value / total * 100)
}

export function calcRotateDegree(angle, offDegree) {
  return 360 - toDegree(angle) + offDegree
}

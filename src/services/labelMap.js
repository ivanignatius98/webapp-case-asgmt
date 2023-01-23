export const LABEL_MAP = new Map()

addMapping([0], "Clear sky")
addMapping([1], "Mainly clear")
addMapping([2], "Partly cloudy")
addMapping([3], "Overcast")
addMapping([45, 48], "Smog")
addMapping(
  [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
  "Rain"
)
addMapping([71, 73, 75, 77, 85, 86], "Snow")
addMapping([95, 96, 99], "Storm")

function addMapping(values, icon) {
  values.forEach(value => {
    LABEL_MAP.set(value, icon)
  })
}
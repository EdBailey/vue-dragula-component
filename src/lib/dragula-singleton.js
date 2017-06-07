import dragula from 'dragula'
let drakes = {}

const makeDrake = function (container, options = {}, group = 'defaultGroup') {
  if (drakes[group]) {
    drakes[group].containers.push(container)
  } else {
    drakes[group] = dragula([container], options)
  }
  console.log(drakes)
  return drakes[group]
}

export default makeDrake

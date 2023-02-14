export const REPLACE_ANIMALS = 'REPLACE_ANIMALS'

export function replaceAnimals(animals) {
  return {
    type: 'REPLACE_ANIMALS',
    payload: animals,
  }
}

export function updateAnimals(animals) {
  return (dispatch) => {
    return dispatch(replaceAnimals(animals))
  }
}

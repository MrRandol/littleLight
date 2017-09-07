export const SET_USER = 'SET_USER';
export const SET_CHARACTERS = 'SET_CHARACTERS';

export function setUser (user) {
  return {
    type: SET_USER,
    user: user
  }
}

export function setCharacters (characters) {
  return {
    type: SET_CHARACTERS,
    characters: characters
  }
}
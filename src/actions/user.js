export const SET_USER = 'SET_USER';
export const SET_GUARDIANS = 'SET_GUARDIANS';

export function setUser (user) {
  return {
    type: SET_USER,
    user: user
  }
}

export function setGuardians (guardians) {
  return {
    type: SET_GUARDIANS,
    guardians: guardians
  }
}

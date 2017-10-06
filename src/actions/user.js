export const SET_USER = 'SET_USER';
export const SET_GUARDIANS = 'SET_GUARDIANS';
export const SET_LOCALE = 'SET_LOCALE';

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

export function setLocale (locale) {
  return {
    type: SET_LOCALE,
    locale: locale
  }
}

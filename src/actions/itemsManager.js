export const SET_ITEMS = 'SET_ITEMS';
export const SWITCH_GUARDIAN = 'SWITCH_GUARDIAN';

export function setItems (items) {
  return {
    type: SET_ITEMS,
    items: items
  }
}

export function switchGuardian (guardianId) {
  return {
    type: SWITCH_GUARDIAN,
    guardianId: guardianId
  }
}
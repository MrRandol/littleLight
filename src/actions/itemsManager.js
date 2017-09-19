export const SET_ITEMS = 'SET_ITEMS';
export const SWITCH_GUARDIAN = 'SWITCH_GUARDIAN';
export const SWITCH_VIEW = 'SWITCH_VIEW';
export const TRANSFER_TO_VAULT = 'TRANSFER_TO_VAULT';
export const TRANSFER_FROM_VAULT = 'TRANSFER_FROM_VAULT';



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

export function switchView (viewName, additionalParams) {
  return {
    type: SWITCH_VIEW,
    viewName: viewName,
    additionalParams: additionalParams
  }
}

export function transferToVault (item, guardianId) {
  return {
    type: TRANSFER_TO_VAULT,
    item: item,
    guardianId: guardianId
  }
}

export function transferFromVault (item, guardianId) {
  return {
    type: TRANSFER_FROM_VAULT,
    item: item,
    guardianId: guardianId
  }
}
export const SET_LOADING = 'SET_LOADING';

export function setLoadingState (loading) {
  return {
    type: SET_LOADING,
    loading: loading
  }
}
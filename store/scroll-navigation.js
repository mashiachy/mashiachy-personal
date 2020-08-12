export const state = () => ({
  activeMode: false,
  value: 0,
  limit: 1000,
  curPath: '',
  paths: ['index', 'who', 'what', 'why', 'how'],
});

export const mutations = {
  setActiveMode: (state, mode) => {
    state.activeMode = mode;
  },
  setZeroValue: (state) => {
    state.value = 0;
  },
  addValue: (state, value) => {
    if (Math.abs(state.value) < state.limit || state.value * value < 0) state.value += value;
  },
  setLimit: (state, limit) => {
    state.limit = limit;
  },
  setPage: (state, path) => {
    state.curPath = path;
  },
};

let foo = null;

export const actions = {
  manageListener ({ commit, state }, add) {
    if (add && foo) {
      window.addEventListener('wheel', foo, { passive: true });
    } else if (add && !foo) {
      foo = ({ deltaY }) => commit('addValue', deltaY);
      window.addEventListener('wheel', foo, { passive: true });
    } else if (!add && foo) {
      window.removeEventListener('wheel', foo, { passive: true });
    } else {
      return;
    }
  },
  modeOn: ({ commit, state, dispatch }) => {
    if (!state.activeMode) {
      commit('setZeroValue');
      commit('setActiveMode', true);
      dispatch('manageListener', true);
    }
  },
  modeOff: ({ commit, state, dispatch }) => {
    if (state.activeMode) {
      commit('setActiveMode', false);
      dispatch('manageListener', false);
    }
  },
  toPage: ({ commit }, path) => {
    commit('setPage', path);
    commit('setZeroValue');
  },
};

export const getters = {
  value: ({value, limit}) => value / limit * 100,
  curPath: ({curPath}) => curPath,
  nextPath: ({curPath, paths}) => {
    const cur = paths.indexOf(curPath);
    if (cur === paths.length)
      return null;
    return paths[cur + 1];
  },
  prevPath: ({curPath, paths}) => {
    const cur = paths.indexOf(curPath);
    if (cur === 0)
      return null;
    return paths[cur - 1];
  },
  isActive: ({isActiveMode}) => isActiveMode,
};

export const state = () => ({
  name: '',
});

export const mutations = {
  setName (state, v) {
    state.name = v;
  },
};

export const actions = {
  setNewName ({commit}, {fromN, toN}) {
    if (fromN === -1 || toN === -1)
      commit('setName', 'myPage');
    else
      commit('setName', toN > fromN ? 'myPage-right' : 'myPage-left');
  }
};

export const getters = {
  name: ({name}) => name,
};

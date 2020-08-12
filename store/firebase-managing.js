export const state = () => ({
  sentCommentResult: null,
  sentFileResult: null,
  loading: false,
  works: [],
});

export const mutations = {
  setSentCommentResult (state, v) {
    state.sentCommentResult = v;
  },
  setFileResult (state, v) {
    state.sentFileResult = v;
  },
  setLoading (state, v) {
    state.loading = v;
  },
  pushWork (state, v) {
    state.works.push(v);
  },
  clearWorks (state) {
    state.works = [];
  },
};

export const actions = {
  putWorks ({commit}, works) {
    works.forEach(work => commit('pushWork', work));
  },
  pushWork ({commit}, work) {
    commit('pushWork', work);
  },
  clearWorks ({commit}) {
    commit('clearWorks');
  },
};

export const getters = {
  works: ({works}) => works,
};

import SceneManaging from '~/three-api';

const model = '/Male-model.glb';

let thd = null;
let inited = false;

export const state = () => ({
  process: 0,
  loaded: false,
  visible: false,
});

export const mutations = {
  setLoaded: (state, loaded) => {
    state.loaded = loaded;
  },
  setProcess: (state, process) => {
    state.process = process;
  },
  setVisible: (state, visible) => {
    state.visible = visible;
  },
};

export const actions = {
  init ({commit}) {
    return new Promise((resolve, reject) => {
      if (!thd) thd = new SceneManaging(model);
      thd.init(
        process => commit('setProcess', process),
        loaded => {
          commit('setLoaded', loaded);
          resolve(loaded);
        },
        error => reject(error)
      );
      inited = true;
    });
  },
  show ({commit, state}, { key, domElement }) {
    thd.initRenderer(domElement);
    thd.show(key);
    commit('setVisible', true);
  },
  hide ({ commit, state }) {
    if (state.visible) {
      thd.hide();
      commit('setVisible', false);
    }
  },
  goToState ({dispatch, state}, payload) {
    if (!state.visible) {
      return;
    }
    thd.goToKey(payload);
  },
};

export const getters = {
  loaded: ({loaded}) => loaded,
  progress: ({process}) => process,
  visible: ({visible}) => visible,
};

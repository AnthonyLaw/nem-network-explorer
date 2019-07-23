import Vue from 'vue';
import Vuex from 'vuex';
import blocks from './blocks';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    blocks,
  },
  strict: false,
});

import Vue from 'vue';
import Vuex from 'vuex';
import blocks from './blocks';
import blockdetail from './blockdetail';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    blocks,
    blockdetail
  },
  strict: false,
});

import { Listener, ChainHttp, BlockHttp } from 'nem2-sdk';

const nodeEndPoint = '52.194.207.217:3000';

const endpoint = 'http://' + nodeEndPoint;
const wsEndpoint = 'ws://' + nodeEndPoint;

const chainHttp = new ChainHttp(endpoint);
const blockHttp = new BlockHttp(endpoint);

const state = {
  currentPage: 1,
  currentBlockHeight: 0,
  blockList: [],
  listener: false,
};

const getters = {
  GET_LISTENER() {
    return state.listener;
  },
};

const mutations = {
  setLatestBlockHeight(state, blockNumber){
    state.currentBlockHeight = blockNumber
  },
  createListener(state, listener) {
    state.listener = listener;
  },
  addBlock(state, formattedBlock) {
    if (state.blockList.length >= 25) state.blockList.pop();
    state.blockList.unshift(formattedBlock);
  },
  setListenerStatus(state, status, text) {
    console.log("Listener status: " + status);
    console.log("Listener text: " + text);
  },
  setBlockList(state, blocklist) {
    state.blockList = blocklist
  }
};

const actions = {

  SET_LISTENER_STATUS({ commit }, { status, text }) {
    commit('setListenerStatus', status, text);
  },

  SET_BLOCK_NUMBER({ commit }, blockNumber) {
    commit('setLatestBlockHeight', blockNumber);
  },

  ADD_BLOCK({ commit, dispatch, state }, block) {
    const timestampNemesisBlock = 1459468800;
    block.height = block.height.compact();
    block.timestamp = block.timestamp.compact() / 1000 + timestampNemesisBlock;
    block.totalFee = block.totalFee.compact()

    dispatch('SET_BLOCK_NUMBER', block.height);

    if(state.currentPage == 1) commit('addBlock', block);
  },

  FORMAT_BLOCK({ commit },blockList) {
    const timestampNemesisBlock = 1459468800;

    blockList.map((block) => {
      block.height = block.height.compact();
      block.timestamp = block.timestamp.compact() / 1000 + timestampNemesisBlock
      block.totalFee = block.totalFee.compact()
    });
    commit('setBlockList',blockList);
  },

  async FETCH_LATEST_BLOCKS({dispatch,getters,commit}){
    const oldListener = getters.GET_LISTENER;
    if (oldListener) oldListener.close();

    commit('createListener', new Listener(wsEndpoint, WebSocket));
    const listener = getters.GET_LISTENER;

    listener.open().then(() => {
      listener
        .newBlock()
        .subscribe(
          (block) => {
            dispatch(
              'ADD_BLOCK',
              block,
              { root: true },
            );
          },
          err => dispatch(
            'SET_LISTENER_STATUS',
            { status: 'error', text: err },
            { root: true },
          ),
        );
    });
  },

  async FETCH_BLOCKS_LIST({dispatch,getters,commit}){
    const blockHeight = (await chainHttp.getBlockchainHeight().toPromise()).compact()

    blockHttp.getBlocksByHeightWithLimit(blockHeight,25).subscribe(
      (blocklist) =>{
        dispatch('FORMAT_BLOCK',blocklist,{ root: true });
        dispatch('SET_BLOCK_NUMBER', blockHeight);
        dispatch('FETCH_LATEST_BLOCKS',{ root: true });
      }
    );
  },

  FETCH_BLOCKS_LIST_BY_HEIGHT({dispatch}, blockHeight) {

    blockHttp.getBlocksByHeightWithLimit(blockHeight,25).subscribe(
      (blocklist) =>{
        dispatch('FORMAT_BLOCK',blocklist,{ root: true });
      }
    );
  }
};

export default {
    state,
    getters,
    actions,
    mutations,
};

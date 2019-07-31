import { ChainHttp, BlockHttp } from 'nem2-sdk';
import getTransactionsList from '../infrastructure/getTransactionList';

const nodeEndPoint = '52.194.207.217:3000';

const endpoint = 'http://' + nodeEndPoint;

const blockHttp = new BlockHttp(endpoint);

const state = {
	transactionList: [],
	blockInfo: {
		height: 0,
		timeStamp: 0,
		diffculty: 0,
		txes: 0,
		fees: 0,
		harvester: '',
		blockHash: '',
		stateHash: '',
	},
};

const getters = {
	blockInfo(state) {
		return state.blockInfo;
	},
	transactionList(state) {
		return state.transactionList;
	},
};

const mutations = {
	setBlockInfo(state, blockDetail) {
		const { blockInfo } = state;
		const timestampNemesisBlock = 1459468800;

		blockInfo.height = blockDetail.height.compact();
		blockInfo.timeStamp =
			blockDetail.timestamp.compact() / 1000 + timestampNemesisBlock;
		blockInfo.diffculty = blockDetail.difficulty.compact();
		blockInfo.txes = blockDetail.numTransactions;
		blockInfo.fees = blockDetail.totalFee.compact();
		blockInfo.harvester = blockDetail.signer.address.address;
		blockInfo.blockHash = blockDetail.hash;
		blockInfo.stateHash = blockDetail.stateHash;
	},

	setTransactionList(state, txList) {
		state.transactionList = txList;
	},
};

const actions = {
	FETCH_BLOCK_INFO_BY_HEIGHT({ commit, dispatch }, blockHeight) {
		dispatch('FETCH_TransactionList_BY_BLOCK_HEIGHT', blockHeight);
		blockHttp.getBlockByHeight(blockHeight).subscribe(blockInfo => {
			commit('setBlockInfo', blockInfo);
		});
	},

	async FETCH_TransactionList_BY_BLOCK_HEIGHT({ commit }, blockHeight) {
		let list = await getTransactionsList(blockHeight);
		commit('setTransactionList', list);
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};

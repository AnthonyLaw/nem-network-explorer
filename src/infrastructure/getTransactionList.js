import { BlockHttp, QueryParams, TransactionType } from 'nem2-sdk';

const nodeEndPoint = '52.194.207.217:3000';

const endpoint = 'http://' + nodeEndPoint;

const blockHttp = new BlockHttp(endpoint);

const getTransactionsByBlockHeight = (blockHeight, id = '') =>
	new Promise(async (resolve, reject) => {
		const pageSize = 10;
		blockHttp
			.getBlockTransactions(blockHeight, new QueryParams(pageSize, id))
			.subscribe(tx => {
				resolve(tx);
			});
	});

const getTransactionsList = async (blockHeight, id) => {
	let list = await getTransactionsByBlockHeight(blockHeight, id);

	list.map((tx) => {
		tx.recipient = tx.recipient ? tx.recipient : '';
		tx.maxFee = tx.maxFee.compact();
		tx.type = retrunType(tx.type);
	});

	if (list.length > 0) {
		id = list[list.length - 1].transactionInfo.id;
		return list.concat(await getTransactionsList(blockHeight, id));
	} else {
		return list;
	}
};

const retrunType = typeId => {
	switch (typeId) {
		case TransactionType.TRANSFER:
			return 'Transfer';
		case TransactionType.REGISTER_NAMESPACE:
			return 'Register namespace';
		case TransactionType.ADDRESS_ALIAS:
			return 'Address alias';
		case TransactionType.MOSAIC_ALIAS:
			return 'Mosaic alias';
		case TransactionType.MOSAIC_DEFINITION:
			return 'Mosaic definition';
		case TransactionType.MOSAIC_SUPPLY_CHANGE:
			return 'Mosaic supply change';
		case TransactionType.MODIFY_MULTISIG_ACCOUNT:
			return 'Modify multisig account';
		case TransactionType.AGGREGATE_COMPLETE:
			return 'Aggregate complete';
		case TransactionType.AGGREGATE_BONDED:
			return 'Aggregate bonded';
		case TransactionType.LOCK:
			return 'Lock';
		case TransactionType.SECRET_LOCK:
			return 'Secrxwet lock';
		case TransactionType.SECRET_PROOF:
			return 'Secret proof';
		case TransactionType.MODIFY_ACCOUNT_PROPERTY_ADDRESS:
			return 'Mod. account address';
		case TransactionType.MODIFY_ACCOUNT_PROPERTY_MOSAIC:
			return 'Mod. account mosaic';
		case TransactionType.MODIFY_ACCOUNT_PROPERTY_ENTITY_TYPE:
			return 'Mod. account entity type';
		case TransactionType.LINK_ACCOUNT:
			return 'Link account';
	}
};
export default getTransactionsList;

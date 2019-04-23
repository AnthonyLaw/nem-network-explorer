import { Address } from '../account/Address';
import { PublicAccount } from '../account/PublicAccount';
import { NetworkType } from '../blockchain/NetworkType';
import { Mosaic } from '../mosaic/Mosaic';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { Message } from './Message';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
/**
 * Transfer transactions contain data about transfers of mosaics and message to another account.
 */
export declare class TransferTransaction extends Transaction {
    /**
     * The address of the recipient.
     */
    readonly recipient: Address;
    /**
     * The array of Mosaic objects.
     */
    readonly mosaics: Mosaic[];
    /**
     * The transaction message of 2048 characters.
     */
    readonly message: Message;
    /**
     * Create a transfer transaction object
     * @param deadline - The deadline to include the transaction.
     * @param recipient - The recipient of the transaction.
     * @param mosaics - The array of mosaics.
     * @param message - The transaction message.
     * @param networkType - The network type.
     * @returns {TransferTransaction}
     */
    static create(deadline: Deadline, recipient: Address, mosaics: Mosaic[], message: Message, networkType: NetworkType): TransferTransaction;
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param fee
     * @param recipient
     * @param mosaics
     * @param message
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType, version: number, deadline: Deadline, fee: UInt64, 
        /**
         * The address of the recipient.
         */
        recipient: Address, 
        /**
         * The array of Mosaic objects.
         */
        mosaics: Mosaic[], 
        /**
         * The transaction message of 2048 characters.
         */
        message: Message, signature?: string, signer?: PublicAccount, transactionInfo?: TransactionInfo);
}

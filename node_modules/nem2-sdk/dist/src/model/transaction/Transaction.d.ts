import { PublicAccount } from '../account/PublicAccount';
import { NetworkType } from '../blockchain/NetworkType';
import { UInt64 } from '../UInt64';
import { AggregateTransactionInfo } from './AggregateTransactionInfo';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { TransactionInfo } from './TransactionInfo';
/**
 * An abstract transaction class that serves as the base class of all NEM transactions.
 */
export declare abstract class Transaction {
    /**
                 * The transaction type.
                 */ readonly type: number;
    /**
     * The network type.
     */
    readonly networkType: NetworkType;
    /**
     * The transaction version number.
     */
    readonly version: number;
    /**
     * The deadline to include the transaction.
     */
    readonly deadline: Deadline;
    /**
     * The fee for the transaction. The higher the fee, the higher the priority of the transaction.
     * Transactions with high priority get included in a block before transactions with lower priority.
     */
    readonly fee: UInt64;
    /**
     * The transaction signature (missing if part of an aggregate transaction).
     */
    readonly signature: string | undefined;
    /**
     * The account of the transaction creator.
     */
    readonly signer: PublicAccount | undefined;
    /**
     * Transactions meta data object contains additional information about the transaction.
     */
    readonly transactionInfo: TransactionInfo | AggregateTransactionInfo | undefined;
    /**
     * @constructor
     * @param type
     * @param networkType
     * @param version
     * @param deadline
     * @param fee
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(/**
                     * The transaction type.
                     */ type: number, 
        /**
         * The network type.
         */
        networkType: NetworkType, 
        /**
         * The transaction version number.
         */
        version: number, 
        /**
         * The deadline to include the transaction.
         */
        deadline: Deadline, 
        /**
         * The fee for the transaction. The higher the fee, the higher the priority of the transaction.
         * Transactions with high priority get included in a block before transactions with lower priority.
         */
        fee: UInt64, 
        /**
         * The transaction signature (missing if part of an aggregate transaction).
         */
        signature?: string | undefined, 
        /**
         * The account of the transaction creator.
         */
        signer?: PublicAccount | undefined, 
        /**
         * Transactions meta data object contains additional information about the transaction.
         */
        transactionInfo?: TransactionInfo | AggregateTransactionInfo | undefined);
    /**
     * Convert an aggregate transaction to an inner transaction including transaction signer.
     * @param signer - Transaction signer.
     * @returns InnerTransaction
     */
    toAggregate(signer: PublicAccount): InnerTransaction;
    /**
     * Transaction pending to be included in a block
     * @returns {boolean}
     */
    isUnconfirmed(): boolean;
    /**
     * Transaction included in a block
     * @returns {boolean}
     */
    isConfirmed(): boolean;
    /**
     * Returns if a transaction has missing signatures.
     * @returns {boolean}
     */
    hasMissingSignatures(): boolean;
    /**
     * Transaction is not known by the network
     * @return {boolean}
     */
    isUnannounced(): boolean;
    /**
     * @description reapply a given value to the transaction in an immutable way
     * @param {Deadline} deadline
     * @returns {Transaction}
     * @memberof Transaction
     */
    reapplyGiven(deadline?: Deadline): Transaction;
}

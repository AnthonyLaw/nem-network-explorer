"use strict";
/*
 * Copyright 2018 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Deadline_1 = require("./Deadline");
const SignedTransaction_1 = require("./SignedTransaction");
/**
 * An abstract transaction class that serves as the base class of all NEM transactions.
 */
class Transaction {
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
                 */ type, 
    /**
     * The network type.
     */
    networkType, 
    /**
     * The transaction version number.
     */
    version, 
    /**
     * The deadline to include the transaction.
     */
    deadline, 
    /**
     * The fee for the transaction. The higher the fee, the higher the priority of the transaction.
     * Transactions with high priority get included in a block before transactions with lower priority.
     */
    fee, 
    /**
     * The transaction signature (missing if part of an aggregate transaction).
     */
    signature, 
    /**
     * The account of the transaction creator.
     */
    signer, 
    /**
     * Transactions meta data object contains additional information about the transaction.
     */
    transactionInfo) {
        this.type = type;
        this.networkType = networkType;
        this.version = version;
        this.deadline = deadline;
        this.fee = fee;
        this.signature = signature;
        this.signer = signer;
        this.transactionInfo = transactionInfo;
    }
    /**
     * @internal
     * Serialize and sign transaction creating a new SignedTransaction
     * @param account - The account to sign the transaction
     * @returns {SignedTransaction}
     */
    signWith(account) {
        const transaction = this.buildTransaction();
        const signedTransactionRaw = transaction.signTransaction(account);
        return new SignedTransaction_1.SignedTransaction(signedTransactionRaw.payload, signedTransactionRaw.hash, account.publicKey, this.type, this.networkType);
    }
    /**
     * @internal
     * @returns {Array<number>}
     */
    aggregateTransaction() {
        return this.buildTransaction().toAggregateTransaction(this.signer.publicKey);
    }
    /**
     * Convert an aggregate transaction to an inner transaction including transaction signer.
     * @param signer - Transaction signer.
     * @returns InnerTransaction
     */
    toAggregate(signer) {
        return Object.assign({ __proto__: Object.getPrototypeOf(this) }, this, { signer });
    }
    /**
     * Transaction pending to be included in a block
     * @returns {boolean}
     */
    isUnconfirmed() {
        return this.transactionInfo != null && this.transactionInfo.height.compact() === 0
            && this.transactionInfo.hash === this.transactionInfo.merkleComponentHash;
    }
    /**
     * Transaction included in a block
     * @returns {boolean}
     */
    isConfirmed() {
        return this.transactionInfo != null && this.transactionInfo.height.compact() > 0;
    }
    /**
     * Returns if a transaction has missing signatures.
     * @returns {boolean}
     */
    hasMissingSignatures() {
        return this.transactionInfo != null && this.transactionInfo.height.compact() === 0 &&
            this.transactionInfo.hash !== this.transactionInfo.merkleComponentHash;
    }
    /**
     * Transaction is not known by the network
     * @return {boolean}
     */
    isUnannounced() {
        return this.transactionInfo == null;
    }
    /**
     * @internal
     */
    versionToDTO() {
        const versionDTO = this.networkType.toString(16) + '0' + this.version.toString(16);
        return parseInt(versionDTO, 16);
    }
    /**
     * @description reapply a given value to the transaction in an immutable way
     * @param {Deadline} deadline
     * @returns {Transaction}
     * @memberof Transaction
     */
    reapplyGiven(deadline = Deadline_1.Deadline.create()) {
        if (this.isUnannounced()) {
            return Object.assign({ __proto__: Object.getPrototypeOf(this) }, this, { deadline });
        }
        throw new Error('an Announced transaction can\'t be modified');
    }
}
exports.Transaction = Transaction;
//# sourceMappingURL=Transaction.js.map
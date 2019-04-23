import { PublicAccount } from '../account/PublicAccount';
import { NetworkType } from '../blockchain/NetworkType';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { HashType } from './HashType';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
export declare class SecretProofTransaction extends Transaction {
    readonly hashType: HashType;
    readonly secret: string;
    readonly proof: string;
    /**
     * Create a secret proof transaction object.
     *
     * @param deadline - The deadline to include the transaction.
     * @param hashType - The hash algorithm secret is generated with.
     * @param secret - The seed proof hashed.
     * @param proof - The seed proof.
     * @param networkType - The network type.
     *
     * @return a SecretProofTransaction instance
     */
    static create(deadline: Deadline, hashType: HashType, secret: string, proof: string, networkType: NetworkType): SecretProofTransaction;
    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param fee
     * @param hashType
     * @param secret
     * @param proof
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType, version: number, deadline: Deadline, fee: UInt64, hashType: HashType, secret: string, proof: string, signature?: string, signer?: PublicAccount, transactionInfo?: TransactionInfo);
}

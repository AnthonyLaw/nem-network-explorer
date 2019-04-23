import { Id } from '../Id';
/**
 * The mosaic id structure describes mosaic id
 *
 * @since 1.0
 */
export declare class MosaicId {
    /**
     * Mosaic id
     */
    readonly id: Id;
    /**
     * Mosaic full name
     */
    readonly fullName?: string;
    /**
     * Create MosaicId from mosaic and namespace string id (ex: nem:xem or domain.subdom.subdome:token)
     * or id in form of array number (ex: [3646934825, 3576016193])
     *
     * @param id
     */
    constructor(id: string | number[]);
    /**
     * Get string value of id
     * @returns {string}
     */
    toHex(): string;
    /**
     * Compares mosaicIds for equality.
     *
     * @return boolean
     */
    equals(other: any): boolean;
}

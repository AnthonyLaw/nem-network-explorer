/**
 * UInt64 data model
 */
export declare class UInt64 {
    /**
     * uint64 lower part
     */
    readonly lower: number;
    /**
     * uint64 higher part
     */
    readonly higher: number;
    /**
     * Create from uint value
     * @param value
     * @returns {UInt64}
     */
    static fromUint(value: number): UInt64;
    /**
     * Constructor
     * @param uintArray
     */
    constructor(uintArray: number[]);
    /**
     * Compact higher and lower uint parts into a uint
     * @returns {number}
     */
    compact(): number;
    /**
     * Compares for equality
     * @param other
     * @returns {boolean}
     */
    equals(other: UInt64): boolean;
}

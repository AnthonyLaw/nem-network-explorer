/**
 * The query params structure describes pagination params for requests.
 *
 * @since 1.0
 */
export declare class QueryParams {
    /**
     * Page size between 10 and 100, otherwise 10
     */
    readonly pageSize: number;
    /**
     * Id after which we want objects to be returned
     */
    readonly id: string | undefined;
    /**
     * Constructor
     * @param pageSize
     * @param id
     */
    constructor(
        /**
         * Page size between 10 and 100, otherwise 10
         */
        pageSize: number, 
        /**
         * Id after which we want objects to be returned
         */
        id?: string | undefined);
}

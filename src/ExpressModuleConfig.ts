/**
 * Configuration for mf-express module.
 */
export interface ExpressModuleConfig {

    /**
     * Port to be used by express application.
     */
    port?: number;

    /**
     * If set then expresses body parser will be enabled.
     */
    bodyParser?: {

        /**
         * Must specify type of body parser to be used.
         * Available values are in the MFExpressBodyParserTypes class.
         */
        type: string;

        /**
         * Options to be passed to the body parser if body parser is enabled.
         */
        options: Object;
    };

    /**
     * Options for compression middleware.
     *
     * See https://github.com/expressjs/compression for more information.
     */
    compression?: {

        /**
         * If set to true, compression middleware will be enabled.
         */
        enabled?: boolean;

        /**
         * See https://github.com/expressjs/compression#chunksize regarding the usage.
         */
        chunkSize?: number;

        /**
         * See https://github.com/expressjs/compression#level regarding the usage.
         */
        level?: number;

        /**
         * See https://github.com/expressjs/compression#memlevel regarding the usage.
         */
        memLevel?: number;

        /**
         * See https://github.com/expressjs/compression#strategy regarding the usage.
         */
        strategy?: number;

        /**
         * See https://github.com/expressjs/compression#threshold regarding the usage.
         */
        threshold?: number; /*|string;*/

        /**
         * See https://github.com/expressjs/compression#windowbits regarding the usage.
         */
        windowBits?: number;

        /**
         * See https://nodejs.org/api/zlib.html#zlib_class_options regarding the usage.
         */
        flush?: number;

        /**
         * See https://nodejs.org/api/zlib.html#zlib_class_options regarding the usage.
         */
        finishFlush?: number;
    };

    /**
     * List of directories that will be serving static files in Express.
     *
     * @see http://expressjs.com/starter/static-files.html
     */
    statics?: Array<string|{
        prefix?: string,
        directory: string
    }>;

    /**
     * "set" data that will be used to call expressApp.set(name, value) method
     */
    sets?: { name: string, value: any }[];

    /**
     * "use" data that will be used to call expressApp.use(name, value) method
     */
    uses?: { name: string, value: any }[];

}

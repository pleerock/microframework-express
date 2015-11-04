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
     * List of directories that will be serving static files in Express.
     *
     * @see http://expressjs.com/starter/static-files.html
     */
    statics: Array<string|{
        prefix?: string,
        directory: string
    }>;

}

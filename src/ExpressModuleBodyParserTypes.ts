/**
 * Types that are supported by body parser type in the MFExpress configuration.
 */
export class ExpressModuleBodyParserTypes {
    public static RAW = 'raw';
    public static TEXT = 'text';
    public static URLENCODED = 'urlencoded';
    public static JSON = 'json';

    /**
     * Checks if given type is supported or not.
     */
    static isSupported(type: string) {
        return this.getAll().indexOf(type) !== -1;
    }

    /**
     * Gets all supported types.
     */
    private static getAll(): string[] {
        return [
            ExpressModuleBodyParserTypes.RAW,
            ExpressModuleBodyParserTypes.TEXT,
            ExpressModuleBodyParserTypes.URLENCODED,
            ExpressModuleBodyParserTypes.JSON
        ];
    }
}
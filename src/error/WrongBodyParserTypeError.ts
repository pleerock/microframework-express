export class WrongBodyParserTypeError extends Error {
    name = 'WrongBodyParserTypeError';

    constructor(bodyParserType: string) {
        super();
        this.message = 'Given body parser type (' + bodyParserType + ') is not supported';
    }

}
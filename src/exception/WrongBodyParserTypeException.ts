export class WrongBodyParserTypeException extends Error {
    name = 'WrongBodyParserTypeException';

    constructor(bodyParserType: string) {
        super();
        this.message = 'Given body parser type (' + bodyParserType + ') is not supported';
    }

}
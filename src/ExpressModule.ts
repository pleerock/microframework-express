import * as bodyParser from "body-parser";
import * as compression from "compression";
import {Express} from "express";
import {Module, ModuleInitOptions} from "microframework/Module";
import {ExpressModuleConfig} from "./ExpressModuleConfig";
import {ExpressModuleBodyParserTypes} from "./ExpressModuleBodyParserTypes";
import {Server} from "http";
import {WrongBodyParserTypeError} from "./error/WrongBodyParserTypeError";

/**
 * Express module integration with microframework.
 */
export class ExpressModule implements Module {

    // -------------------------------------------------------------------------
    // Constants
    // -------------------------------------------------------------------------

    public static DEFAULT_PORT = 3000;

    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------

    private options: ModuleInitOptions;
    private configuration: ExpressModuleConfig;
    private _express: Express;
    private _expressServer: Server;

    // -------------------------------------------------------------------------
    // Accessors
    // -------------------------------------------------------------------------

    getName(): string {
        return "ExpressModule";
    }

    getConfigurationName(): string {
        return "express";
    }

    isConfigurationRequired(): boolean {
        return false;
    }

    init(options: ModuleInitOptions, configuration: ExpressModuleConfig): void {
        this.options = options;
        this.configuration = configuration;
    }

    onBootstrap(): Promise<any> {
        this.setupExpress();
        return Promise.resolve();
    }

    onShutdown(): Promise<any> {
        if (this._expressServer)
            this._expressServer.close();
        return Promise.resolve();
    }

    // -------------------------------------------------------------------------
    // Accessors
    // -------------------------------------------------------------------------

    /**
     * Gets the Express application of the express module
     */
    get express(): Express {
        return this._express;
    }

    /**
     * Gets the running express server instance.
     */
    get expressServer(): Server {
        return this._expressServer;
    }

    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------

    private setupExpress() {
        const express = require("express");
        this._express = express(); // todo: try to change to new Express()?
        this.useCompression();
        this.useBodyParser();
        this.setupStatics();
        this.setupSets();
        this.setupUses();
        this._expressServer = this._express.listen(this.getPortFromConfiguration());
    }

    private useCompression() {
        if (!this.configuration.compression)
            return;

        this.express.use(compression(this.configuration.compression));
    }

    private useBodyParser() {
        const bodyParserType = this.getBodyParserTypeFromConfiguration();
        const bodyParserOptions = this.getBodyParserOptionsFromConfiguration();
        if (!bodyParserType) return;

        switch (bodyParserType) {
            case ExpressModuleBodyParserTypes.JSON:
                this.express.use(bodyParser.json(bodyParserOptions));
                break;
            case ExpressModuleBodyParserTypes.TEXT:
                this.express.use(bodyParser.text(bodyParserOptions));
                break;
            case ExpressModuleBodyParserTypes.RAW:
                this.express.use(bodyParser.raw(bodyParserOptions));
                break;
            case ExpressModuleBodyParserTypes.URLENCODED:
                this.express.use(bodyParser.urlencoded(<any>bodyParserOptions));
                break;
            default:
                throw new WrongBodyParserTypeError(bodyParserType);
        }
    }

    private setupUses() {
        const uses = this.getUsesFromConfiguration();
        if (!uses) return;

        uses.forEach(use => this.express.use(use.name, use.value));
    }

    private setupSets() {
        const sets = this.getSetsFromConfiguration();
        if (!sets) return;

        sets.forEach(set => {
            if (set.name) {
                this.express.use(set.name, set.value);
            } else {
                this.express.use(set.value);
            }
        });
    }

    private setupStatics() {
        const express = require("express");
        const statics = this.getStaticsFromConfiguration();
        if (statics) {
            statics.forEach(statics => {
                const path = this.options.frameworkSettings.baseDirectory + "/" + statics.directory;
                if (statics.prefix) {
                    this.express.use(statics.prefix, express.static(path));
                } else {
                    this.express.use(express.static(path));
                }
            });
        }
    }

    private getPortFromConfiguration(): number {
        if (!this.configuration || !this.configuration.port) return ExpressModule.DEFAULT_PORT;
        return this.configuration.port ;
    }

    private getBodyParserTypeFromConfiguration(): string {
        if (!this.configuration || !this.configuration.bodyParser ||  !this.configuration.bodyParser.type) return undefined;
        return this.configuration.bodyParser.type;
    }

    private getBodyParserOptionsFromConfiguration(): Object {
        if (!this.configuration || !this.configuration.bodyParser ||  !this.configuration.bodyParser.options) return undefined;
        return this.configuration.bodyParser.options;
    }

    private getStaticsFromConfiguration(): { directory: string, prefix: string }[] {
        if (!this.configuration || !this.configuration.statics) return undefined;
        return this.configuration.statics.map(statics => {
            return { directory: typeof statics === "string" ? statics : statics.directory, prefix: (<{ prefix?: string, directory: string }>statics).prefix };
        });
    }

    private getSetsFromConfiguration(): { name: string, value: any }[] {
        if (!this.configuration || !this.configuration.sets) return undefined;
        return this.configuration.sets;
    }

    private getUsesFromConfiguration(): { name: string, value: any }[] {
        if (!this.configuration || !this.configuration.uses) return undefined;
        return this.configuration.uses;
    }

}
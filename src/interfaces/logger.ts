export interface LoggerAbstract {
    log: (message?: string) => void;
    debug: (message?: string) => void;
    warn: (message?: string) => void;
    error: (message?: string) => void;
}

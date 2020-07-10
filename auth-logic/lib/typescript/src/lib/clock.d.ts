export declare const Clock: {
    now: () => Date;
    Testing: {
        timeTravel: (time: Date | string) => Promise<void>;
        restoreTime: () => Promise<void>;
        freezeTime: (time: Date | string | undefined) => Promise<void>;
        unfreezeTime: () => Promise<void>;
    };
};

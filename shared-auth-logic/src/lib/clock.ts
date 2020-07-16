import { subMilliseconds, differenceInMilliseconds } from 'date-fns';

let timeTravelOffset = 0;
let frozenTime: Date | undefined;

const internalNow = (): Date => {
    if (frozenTime) {
        return frozenTime;
    }

    return subMilliseconds(new Date(), timeTravelOffset);
};

const now = (): Date => {
    return internalNow();
};

const assertInTest = (): void => {
    if (process.env.NODE_ENV !== 'test') {
        throw new Error('Time travel is only allowed in tests!');
    }
};

const timeTravel = async (time: Date | string): Promise<void> => {
    assertInTest();
    timeTravelOffset = differenceInMilliseconds(new Date(), typeof time === 'string' ? new Date(time) : time);
    frozenTime = undefined;
};

const restoreTime = async (): Promise<void> => {
    assertInTest();
    timeTravelOffset = 0;
    frozenTime = undefined;
};

const freezeTime = async (time: Date | string | undefined): Promise<void> => {
    assertInTest();
    if (time) {
        await timeTravel(time);
    }

    frozenTime = internalNow();
};

const unfreezeTime = async (): Promise<void> => {
    assertInTest();
    frozenTime = undefined;
};

export const Clock = {
    now,
    Testing: {
        timeTravel,
        restoreTime,
        freezeTime,
        unfreezeTime,
    },
};

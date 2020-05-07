/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable require-await */
import { subMilliseconds, differenceInMilliseconds } from 'date-fns';

let timeTravelOffset = 0;
let frozenTime: Date | undefined;

function internalNow(): Date {
    if (frozenTime) {
        return frozenTime;
    }

    return subMilliseconds(new Date(), timeTravelOffset);
}

function now(): Date {
    return internalNow();
}

function assertInTest(): void {
    if (process.env.NODE_ENV !== 'test') {
        throw new Error('Time travel is only allowed in tests!');
    }
}

async function timeTravel(time: Date | string): Promise<void> {
    assertInTest();
    timeTravelOffset = differenceInMilliseconds(new Date(), typeof time === 'string' ? new Date(time) : time);
    frozenTime = undefined;
}

async function restoreTime(): Promise<void> {
    assertInTest();
    timeTravelOffset = 0;
    frozenTime = undefined;
}

async function freezeTime(time: Date | string | undefined): Promise<void> {
    assertInTest();
    if (time) {
        await timeTravel(time);
    }

    frozenTime = internalNow();
}

async function unfreezeTime(): Promise<void> {
    assertInTest();
    frozenTime = undefined;
}

export const Clock = {
    now,

    Testing: {
        timeTravel,
        restoreTime,
        freezeTime,
        unfreezeTime,
    },
};

declare enum CountdownState {
    Pennding = 0,
    Running = 1,
    Paused = 2,
    Finished = 3
}
export interface CountdownOptions {
    countdown: number;
    finishedCallback?: () => void;
    tick?: () => void;
}
export default class Countdown {
    private countdown;
    private passTime;
    private countingPoint;
    private _state;
    private timer;
    private finishedCallback;
    private tick;
    constructor({ countdown, finishedCallback, tick }: CountdownOptions);
    get restTime(): number;
    get state(): CountdownState;
    get time(): {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
        milliseconds: number;
    };
    private counting;
    private stopCounting;
    start(): Promise<void>;
    pause(): Promise<void>;
    resume(): Promise<void>;
    end(): Promise<void>;
    reset(countdown?: number): Promise<void>;
}
export {};

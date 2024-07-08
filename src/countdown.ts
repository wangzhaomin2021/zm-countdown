enum CountdownState {
    Pennding,
    Running,
    Paused,
    Finished
}

export interface CountdownOptions {
    countdown: number
    finishedCallback?: () => void
    tick?: () => void
}

export default class Countdown {
    private countdown: number // 倒计时时间
    private passTime: number // 过去时间
    private countingPoint: number // 计时点
    private _state: CountdownState // 倒计时状态
    private timer: number | null = null
    private finishedCallback: () => void
    private tick: () => void

    constructor({ countdown, finishedCallback = () => { }, tick = () => { } }: CountdownOptions) {
        this.countdown = countdown
        this.passTime = 0
        this.countingPoint = 0
        this._state = CountdownState.Pennding
        this.timer = null
        this.finishedCallback = finishedCallback
        this.tick = tick
    }

    get restTime() {
        return this.countdown - this.passTime
    }

    get state() {
        return this._state
    }

    get time() {
        const milliseconds = Math.abs(this.restTime)
        const seconds = Math.floor(milliseconds / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)
        return {
            days,
            hours: hours % 24,
            minutes: minutes % 60,
            seconds: seconds % 60,
            milliseconds: milliseconds % 1000
        }
    }

    private counting() {
        const now = Date.now()
        this.passTime += now - this.countingPoint
        this.countingPoint = now
        if (this.restTime <= 0) {
            this._state = CountdownState.Finished
            this.passTime = this.countdown
            this.timer = null
            if (this.tick) this.tick()
            if (this.finishedCallback) this.finishedCallback()
            return
        }

        if (this.tick) this.tick()
        this.timer = requestAnimationFrame(() => this.counting())
    }

    private stopCounting() {
        if (this.timer) cancelAnimationFrame(this.timer)
    }

    // 开始
    public async start() {
        this.stopCounting()
        this._state = CountdownState.Running
        this.passTime = 0
        this.countingPoint = Date.now()
        this.counting()
    }

    // 暂停
    public async pause() {
        if (this._state === CountdownState.Running) {
            this._state = CountdownState.Paused
            this.passTime += Date.now() - this.countingPoint
            this.stopCounting()
        }
    }

    // 恢复
    public async resume() {
        if (this._state === CountdownState.Paused) {
            this._state = CountdownState.Running
            this.countingPoint = Date.now()
            this.counting()
        }
    }

    // 结束
    public async end() {
        this._state = CountdownState.Pennding
        this.passTime = 0
        this.stopCounting()
    }

    // 重置
    public async reset(countdown: number = this.countdown) {
        this.countdown = countdown
        this.passTime = 0
        this._state = CountdownState.Pennding
        this.stopCounting()
    }
}

<script setup lang="ts">
import { ref } from 'vue'
import Countdown from './countdown'
const countdown = new Countdown({ countdown: 6 * 60 * 1000, finishedCallback: done, tick: tonbu })
function done() {
  console.log('done')
}
function tonbu() {
  restTime.value = getTimeDes(countdown.time)
}

const units: Record<keyof typeof countdown.time, string> = {
  days: '天',
  hours: '时',
  minutes: '分',
  seconds: '秒',
  milliseconds: '毫秒'
}
const restTime = ref(getTimeDes(countdown.time))
function getTimeDes(timer: typeof countdown.time) {
  return Object.keys(units).map(key => timer[key as keyof typeof countdown.time] > 0 ? `${timer[key as keyof typeof countdown.time]}${units[key as keyof typeof countdown.time]}` : '').join('')
}

const start = () => {
  console.log('===> start', countdown)
  countdown.start()
}

const pause = () => countdown.pause()
const resume = () => countdown.resume()
const end = () => countdown.end()
const reset = () => countdown.reset().then(tonbu)
</script>

<template>
  <div>
    {{ restTime }}
  </div>
  <button @click="start">开始</button>
  <button @click="pause">暂停</button>
  <button @click="resume">继续</button>
  <button @click="end">结束</button>
  <button @click="reset">重置</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

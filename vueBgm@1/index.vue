<template>
<div class="vue-bgm" v-if="$data.isSupported" 
  @click="turnOnOrOff" :class="{'vue-bgm-off': $data.on}">
  <audio ref="audio" autoplay="autoplay" 
    controls="controls" loop="loop" preload="auto" :src="$props.src"></audio>
</div>
</template>

<script>
const isSupported = () => {
  const TEST = document.createElement('audio')
  try {
    // IE9 with no Media Player is a LIAR
    TEST.volume = 0.5
  } catch (e) {
    return false
  }
  return !!(TEST && TEST.canPlayType)
}
module.exports = {
  props: ['src'],
  data () {
    return {
      on: true,
      isSupported : isSupported
    }
  },
  motheds: {
    turnOnOrOff () {
      this.$data.on = !this.$data.on
      this.$refs.audio.mouted = this.$data.on
    }
  }
}
</script>

<style lang="scss">
.vue-bgm {
}
</style>


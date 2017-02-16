<template>
  <div class="ui-vue-spinner">
    <div class="ui-vue-spinner-text">Loading</div>
  </div>
</template>

<script>
  module.exports = {
    data: function () {
      return {
        text: ''
      }
    }
  };
</script>

<style>
  @import "~mixins";

  .ui-vue-spinner {
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    font-size: 16px;
    background-color: rgba(0,0,0,.85);
    @include border-radius(10px);
    @include translate(-50%, -50%);

    > .ui-vue-spinner-text {
      display: block;
      position: absolute;
      top: 50%;
      width: 100%;
      padding-top: 45px;
      color: rgba(255,255,255,.9);
      @include translate(0, -50%);

      &:before, &:after {
        display: block;
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        width: 36px;
        height: 36px;
        margin-left: -18px;
        border: 1px solid rgba(0,0,0,.1);
        @include border-radius(50%);
      }
    }
  }
</style>

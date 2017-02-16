<template>
  <transition name="fade">
    <div class="ui-vue-modal">
      <div class="ui-vue-modal-dialog">
        <div class="ui-vue-modal-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  module.exports = {
    name: 'uiVueModal',
    data: function () {
      return {
        display: false
      }
    },
    methods: {
      setDisplay: function(display) {
        this.display = display;
      }
    }
  };
</script>

<style>
  @import "~mixins";

  .ui-vue-modal {
    display: table; 
    position: fixed; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%; 
    font-size: 14px;
    background: rgba(0,0,0,.5);

    .ui-vue-modal-dialog {
      display: table-cell; 
      vertical-align: middle; 
      text-align: center;
    }
  }
  .ui-vue-modal-content {
    display: inline-block;
    position: relative;
    width: 350px;
    height: 200px;
    background-color: #fff; 
    border: 1px solid #808080; 
    text-align: left;
  }
</style>

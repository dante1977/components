<template>
  <div v-transfer-dom="isTransferDom">
    <popup v-model="showValue" class="vux-popup-picker" :id="'vux-popup-picker-'+uuid" @on-hide="onPopupHide" @on-show="$emit('on-show')">
      <div class="vux-popup-picker-container">
        <div class="vux-popup-picker-header">
          <flexbox>
            <flexbox-item class="vux-popup-picker-header-menu vux-popup-picker-cancel" @click.native="onHide(false)">{{cancelText || '取消'}}</flexbox-item>
            <flexbox-item class="vux-popup-picker-header-menu vux-popup-picker-header-menu-right" @click.native="onHide(true)">{{confirmText || '完成'}}</flexbox-item>
          </flexbox>
        </div>
        <picker
                :data="data"
                v-model="tempValue"
                @on-change="onPickerChange"
                :columns="columns"
                :fixed-columns="fixedColumns"
                :container="'#vux-popup-picker-'+uuid"></picker>
      </div>
    </popup>
  </div>
</template>

<script>
import Picker from 'vuxPicker'
import Popup from 'vuxPopup'
import InlineDesc from 'vuxInlineDesc'
import vuxFlexbox from 'vuxFlexbox'
import array2string from 'weuiVux/array2String'
import value2name from 'weuiVux/value2name'
import uuidMixin from 'weuiVux/mixin_uuid'
import TransferDom from 'weuiVux/transferDom'

var getObject = function (obj) {
  return JSON.parse(JSON.stringify(obj))
};

export default {
  directives: {
    TransferDom: TransferDom
  },
  created: function created() {
    if (typeof this.show !== 'undefined') {
      this.showValue = this.show;
    }
  },

  mixins: [uuidMixin],
  components: {
    Picker: Picker,
    Popup: Popup,
    Flexbox: vuxFlexbox.Flexbox,
    FlexboxItem: vuxFlexbox.FlexboxItem,
    InlineDesc: InlineDesc
  },
  filters: {
    array2string: array2string,
    value2name: value2name
  },
  props: {
    valueTextAlign: {
      type: String,
      default: 'right'
    },
    title: String,
    cancelText: String,
    confirmText: String,
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    placeholder: String,
    columns: {
      type: Number,
      default: 0
    },
    fixedColumns: {
      type: Number,
      default: 0
    },
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    showName: Boolean,
    inlineDesc: [String, Number, Array, Object, Boolean],
    showCell: {
      type: Boolean,
      default: true
    },
    show: Boolean,
    displayFormat: Function,
    isTransferDom: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    value2name: value2name,
    getNameValues: function getNameValues() {
      return value2name(this.currentValue, this.data);
    },
    onClick: function onClick() {
      this.showValue = true;
    },
    onHide: function onHide(type) {
      this.showValue = false;
      if (type) {
        this.closeType = true;
        this.currentValue = getObject(this.tempValue);
      }
      if (!type) {
        this.closeType = false;
        if (this.value.length > 0) {
          this.tempValue = getObject(this.currentValue);
        }
      }
    },
    onPopupHide: function onPopupHide(val) {
      if (this.value.length > 0) {
        this.tempValue = getObject(this.currentValue);
      }
      this.$emit('on-hide', this.closeType);
    },
    onPickerChange: function onPickerChange(val) {
      if (JSON.stringify(this.currentValue) !== JSON.stringify(val)) {
        // if has value, replace it
        if (this.value.length) {
          var nowData = JSON.stringify(this.data);
          if (nowData !== this.currentData && this.currentData !== '[]') {
            this.tempValue = getObject(val);
          }
          this.currentData = nowData;
        } else {// if no value, stay quiet
          // if set to auto update, do update the value
        }
      }
      this.$emit('on-shadow-change', getObject(val));
    }
  },
  watch: {
    value: function value(val) {
      if (JSON.stringify(val) !== JSON.stringify(this.tempValue)) {
        this.tempValue = getObject(val);
      }
    },
    currentValue: function currentValue(val) {
      this.$emit('on-change', getObject(val));
      this.$emit('input', getObject(val));
    },
    show: function show(val) {
      this.showValue = val;
    }
  },
  data: function data() {
    return {
      onShowProcess: false,
      tempValue: getObject(this.value),
      closeType: false,
      currentData: JSON.stringify(this.data), // used for detecting if it is after data change
      showValue: false,
      currentValue: this.value
    };
  }
};
</script>

<style >
@import '~weuiVux/variable';
/*@import '../../styles/1px.less';*/

.vux-cell-box {
  position: relative;
}
.vux-cell-box:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  border-top: 1px solid #D9D9D9;
  color: #D9D9D9;
  transform-origin: 0 0;
  transform: scaleY(0.5);
  left: 15px;
}
.vux-popup-picker-header {
  height: 44px;
  color: $popup-picker-header-text-color;
  background-color: $popup-picker-header-bg-color;
  font-size: $popup-picker-header-font-size;
  position: relative;
  &:after {
    /*.setBottomLine(#e5e5e5);*/
  }
}
.vux-popup-picker-value {
  /* display: inline-block; */
}
.vux-popup-picker-header-menu {
  text-align: left;
  padding-left: 15px;
  line-height: 44px;
}
.vux-popup-picker-header-menu-right {
  text-align: right;
  padding-right: 15px;
}
.vux-popup-picker-select {
  width: 100%;
  position: relative;
}
.vux-popup-picker-select span {
  padding-right: 15px;
}
.vux-popup-picker-select-box.weui-cell__bd:after {
  content: " ";
  display: inline-block;
  transform: rotate(45deg);
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #C8C8CD;
  border-style: solid;
  position: relative;
  top: -2px;
  position: absolute;
  top: 50%;
  right: 15px;
  margin-top: -3px;
}
.vux-popup-picker-cancel {
  color: $popup-picker-header-cancel-text-color;
}
</style>

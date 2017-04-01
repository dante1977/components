<template>
  <div class="vux-picker">
    <flexbox :gutter="0">
      <flexbox-item v-for="(one, index) in currentData" :key="index" style="margin-left:0;">
        <div class="vux-picker-item" :id="'vux-picker-' + uuid + '-' + index"></div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import Scroller from './scroller'
import flexbox from 'vuxFlexbox'
import Manager from './chain'


//var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };


export default {
  components: {
    Flexbox: flexbox.Flexbox,
    FlexboxItem: flexbox.FlexboxItem
  },
  created: function created() {
    if (this.columns !== 0) {
      var length = this.columns;
      this.store = new Manager(this.data, length, this.fixedColumns);
      this.currentData = this.store.getColumns(this.value);
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.render(_this2.currentData, _this2.currentValue);
    });
  },

  props: {
    data: [Array],
    columns: {
      type: Number,
      default: 0
    },
    fixedColumns: {
      type: Number,
      default: 0
    },
    value: Array,
    itemClass: {
      type: String,
      default: 'scroller-item'
    }
  },
  methods: {
    getId: function getId(i) {
      return '#vux-picker-' + this.uuid + '-' + i;
    },
    render: function render(data, value) {
      this.count = this.currentData.length;
      var _this = this;
      if (!data || !data.length) {
        return;
      }
      console.log(data)
      var count = this.currentData.length;
      // set first item as value
      if (value.length < count) {
        for (var i = 0; i < count; i++) {
          this.$set(_this.currentValue, i, data[i][0].value || data[i][0]);
        }
      }

      var _loop = function _loop(_i) {
        /**
         * Still don't know why this happens
         */
        if (!document.querySelector(_this.getId(_i))) {
          return {
            v: void 0
          };
        }

        _this.scroller[_i] && _this.scroller[_i].destroy();
        _this.scroller[_i] = new Scroller(_this.getId(_i), {
          data: data[_i],
          defaultValue: value[_i] || data[_i][0].value,
          itemClass: _this.item_class,
          onSelect: function onSelect(value) {
            _this.$set(_this.currentValue, _i, value);
            if (!this.columns || this.columns && _this.getValue().length === _this.store.count) {
              _this.$emit('on-change', _this.getValue());
            }
            if (_this.columns !== 0) {
              _this.renderChain(_i + 1);
            }
          }
        });
        if (_this.currentValue) {
          _this.scroller[_i].select(value[_i]);
        }
      };

      for (var _i = 0; _i < data.length; _i++) {
        var _ret = _loop(_i);

        if (typeof _ret === "object") return _ret.v;
      }
    },
    renderChain: function renderChain(i) {
      if (!this.columns) {
        return;
      }

      // do not render for last scroller
      if (i > this.count - 1) {
        return;
      }

      var _this = this;
      var ID = this.getId(i);
      // destroy old one
      this.scroller[i].destroy();
      var list = this.store.getChildren(_this.getValue()[i - 1]);
      this.scroller[i] = new Scroller(ID, {
        data: list,
        itemClass: _this.item_class,
        onSelect: function onSelect(value) {
          _this.$set(_this.currentValue, i, value);
          _this.$emit('on-change', _this.getValue());
          _this.renderChain(i + 1);
        }
      });
      this.$set(this.currentValue, i, list[0].value);
      this.renderChain(i + 1);
    },
    getValue: function getValue() {
      var data = [];
      for (var i = 0; i < this.currentData.length; i++) {
        if (this.scroller[i]) {
          data.push(this.scroller[i].value);
        } else {
          return [];
        }
      }
      return data;
    },
    emitValueChange: function emitValueChange(val) {
      if (!this.columns || this.columns && val.length === this.store.count) {
        this.$emit('on-change', val);
      }
    }
  },
  data: function data() {
    return {
      scroller: [],
      count: 0,
      uuid: Math.random().toString(36).substring(3, 8),
      currentData: this.data,
      currentValue: this.value
    };
  },

  watch: {
    value: function value(val) {
      if (JSON.stringify(val) !== JSON.stringify(this.currentValue)) {
        this.currentValue = val;
      }
    },
    currentValue: function currentValue(val, oldVal) {
      this.$emit('input', val);
      // render all the scroller for chain datas
      if (this.columns !== 0) {
        if (val.length > 0) {
          if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
            this.currentData = this.store.getColumns(val);
            this.$nextTick(function () {
              this.render(this.currentData, val);
            });
          }
        }
      } else {
        for (var i = 0; i < val.length; i++) {
          if (this.scroller[i] && this.scroller[i].value !== val[i]) {
            this.scroller[i].select(val[i]);
          }
        }
      }
    },
    data: function data(val) {
      if (JSON.stringify(val) !== JSON.stringify(this.currentData)) {
        this.currentData = val;
      }
    },
    currentData: function currentData(newData) {
      var _this3 = this;

      if (Object.prototype.toString.call(newData[0]) === '[object Array]') {
        this.$nextTick(function () {
          _this3.render(newData, _this3.currentValue);
          // emit on-change after rerender
          _this3.$nextTick(function () {
            _this3.emitValueChange(_this3.getValue());

            if (JSON.stringify(_this3.getValue()) !== JSON.stringify(_this3.currentValue)) {
              if (!_this3.columns || _this3.columns && _this3.getValue().length === _this3.store.count) {
                _this3.currentValue = _this3.getValue();
              }
            }
          });
        });
      } else {
        if (this.columns !== 0) {
          if (!newData.length) {
            return;
          }
          var length = this.columns;
          this.store = new Manager(newData, length, this.fixedColumns);
          this.currentData = this.store.getColumns(this.currentValue);
        }
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    for (var i = 0; i < this.count; i++) {
      this.scroller[i].destroy();
      this.scroller[i] = null;
    }
  }
}
</script>

<style>
@import './scroller.css';
</style>


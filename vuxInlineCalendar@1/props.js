export default function () {
  return {
    value: {
      type: String,
      default: ''
    },
    renderMonth: {
      type: Array, // [2018, 8]
      default: function _default() {
        return [null, null];
      }
    },
    startDate: {
      type: String
    },
    endDate: {
      type: String
    },
    showLastMonth: {
      type: Boolean,
      default: true
    },
    showNextMonth: {
      type: Boolean,
      default: true
    },
    highlightWeekend: {
      type: Boolean,
      default: false
    },
    returnSixRows: {
      type: Boolean,
      default: true
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    hideWeekList: {
      type: Boolean,
      default: false
    },
    replaceTextList: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    weeks: {
      type: Array,
      default: function _default() {
        return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      }
    },
    weeksList: {
      type: Array,
      default: function _default() {
        return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      }
    },
    renderFunction: {
      type: Function,
      default: function _default() {
        return '';
      }
    },
    renderOnValueChange: {
      type: Boolean,
      default: true
    },
    disablePast: {
      type: Boolean,
      default: false
    },
    disableFuture: {
      type: Boolean,
      default: false
    }
  };
}

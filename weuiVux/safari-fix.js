module.exports = {
  mounted: function mounted() {
    this.$overflowScrollingList = document.querySelectorAll('.vux-fix-safari-overflow-scrolling');
  },

  methods: {
    fixSafariOverflowScrolling: function fixSafariOverflowScrolling(type) {
      if (!this.$overflowScrollingList.length) return;
      // if (!/iphone/i.test(navigator.userAgent)) return
      for (var i = 0; i < this.$overflowScrollingList.length; i++) {
        this.$overflowScrollingList[i].style.webkitOverflowScrolling = type;
      }
    }
  }
};
export default {
  created: function created() {
    this.uuid = Math.random().toString(36).substring(3, 8);
  }
};

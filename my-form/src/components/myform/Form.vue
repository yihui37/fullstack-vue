<template>
  <div class="my-form">
    <form>
      <slot></slot>
    </form>
  </div>
</template>
<script>
export default {
  name: "my-form",
  provide() {
    return {
      // 将表单实例传递给后代
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  created() {
    // 缓存需要校验的表单项
    this.fields = [];
    this.$on("formItemAdd", item => this.fields.push(item));
  },
  methods: {
    // 回调
    // 验证所有formitem
    async validate(callback) {
      const tasks = this.fields.map(item => item.validate());
      const results = await Promise.all(tasks);
      let flag = results.filter(valid => valid == false).length == 0;
      // eslint-disable-next-line no-console
      console.log("flag", flag, results);
      callback(flag);
    }
  }
};
</script>

<style scoped>
</style>
<template>
  <div>
    <input :type="type" :value="inputValue" @blur="validate">
  </div>
</template>

<script>
export default {
  name: "my-input",
  props: {
    value: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    }
  },
  data() {
    return {
      inputValue: this.value // 单向数据流,接受父组件传过来的默认值
    };
  },
  methods: {
    validate(e) {
      this.inputValue = e.target.value;
      // eslint-disable-next-line no-console
      console.log("input blur", this.inputValue);

      this.$emit("input", this.inputValue);
      // 通知父组件校验
      // tip: 不自己校验是因为
      // form整体校验的时候，并不一定就是input，还可能会是复杂组件
      // 因此在formitem层级进行校验

      // 方法一：错误
      //   this.$emit("validate", this.inputValue);
      // 因为input以插槽的形式插入formitem中，并不能直接$emit

      // 方法二：当用户不按预定方式编写代码时，$parent不是formitem,因此不完善
      // eslint-disable-next-line no-debugger
      this.$parent.$emit("validate", this.inputValue);
    }
  }
};
</script>

<style scoped>
</style>
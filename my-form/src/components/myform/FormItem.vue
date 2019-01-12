<template>
  <div class="my-form-item">
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="isError" class="errormsg">{{errormsg}}</p>
  </div>
</template>

<script>
import schema from "async-validator";
export default {
  name: "my-form-item",
  inject: ["form"], // 注入form，获取model和rules
  props: ["label", "prop"],
  data() {
    return {
      errormsg: "",
      isError: false
    };
  },
  created() {
    this.$on("validate", this.validate);
  },
  mounted() {
    // DOM渲染完成后，添加事件
    this.prop && this.$parent.$emit("formItemAdd", this);
  },
  methods: {
    // 验证单个formitem
    validate() {
      // promise作用为 在整体校验时提供状态
      return new Promise(res => {
        // eslint-disable-next-line no-debugger
        // 校验规则
        const descriptor = {
          // 此处this.form为父组件provider提供
          [this.prop]: this.form.rules[this.prop]
        };
        const validator = new schema(descriptor);
        // 执行校验
        // 校验参数 param
        // { prop : propValue}  propValue由父组件的provider
        // eslint-disable-next-line no-console
        console.log({ [this.prop]: this.form.model[this.prop] });

        validator.validate(
          { [this.prop]: this.form.model[this.prop] },
          errors => {
            if (errors) {
              this.isError = true;
              this.errormsg = errors[0].message;
              res(false);
            } else {
              this.isError = false;
              this.errormsg = "";
              res(true);
            }
          }
        );
      });
    }
  }
};
</script>

<style scoped>
p.errormsg {
  color: #f63;
}
</style>
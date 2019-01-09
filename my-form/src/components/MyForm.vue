<template>
  <div class="my-form-demo">
    <h3>MY-FORM</h3>
    <my-form :model="formInfo" :rules="formRules" ref="myForm" class="my-form">
      <my-form-item label="用户名" prop="username">
        <my-input v-model="formInfo.username" placeholder="用户名"></my-input>
      </my-form-item>
      <my-form-item label="密码" prop="password">
        <my-input type="password" v-model="formInfo.password" placeholder="密码"></my-input>
      </my-form-item>
      <my-form-item>
        <el-button type="primary" @click="onSubmit">登 录</el-button>
      </my-form-item>
    </my-form>
  </div>
</template>
<script>
import myForm from "./myform/Form";
import myFormItem from "./myform/FormItem";
import myInput from "./myform/Input";
export default {
  name: "my-form-demo",
  components: {
    myForm,
    myFormItem,
    myInput
  },
  data() {
    return {
      formInfo: {
        username: "",
        password: ""
      },
      formRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.myForm.validate(valid => {
        valid
          ? this.$message({
              message: "登录成功",
              type: "success"
            })
          : this.$message({
              message: "用户名密码错误",
              type: "error"
            });
      });
    }
  }
};
</script>

<style scoped>
</style>
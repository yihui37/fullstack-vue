<template>
  <div class="hello">
    <h3>EL-FORM</h3>
    <el-form :model="formInfo" :rules="formRules" ref="demoForm" class="demo-form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formInfo.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formInfo.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "demo-form",
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
      this.$refs.elform.vaidate(valid => {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

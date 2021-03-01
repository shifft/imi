<template>
  <a-row type="flex" justify="center">
    <a-col type="flex" :span="12" :xs="22" :sm="18" :lg="12">
      <a-input-password
        size="large"
        placeholder="old password"
        v-model="oldpassword"
        autoFocus
      >
      </a-input-password>

      <a-input size="large" placeholder="salt domain" v-model="salt"> </a-input>

      <a-input-password
        size="large"
        placeholder="new password"
        v-model="newpassword"
      >
        <a-icon
          slot="addonAfter"
          type="copy"
          id="newpassword"
          :data-clipboard-text="newpassword"
        />
      </a-input-password>
    </a-col>
  </a-row>
</template>

<script>
import md5 from "blueimp-md5";
import Clipboard from "clipboard";

function generate(password, salt) {
  if (!password || !salt) {
    return;
  }

  const md5one = md5(password, salt);
  const md5two = md5(md5one, "isayme");
  const md5three = md5(md5one, "heaven");

  const rule = md5three.split("");
  const source = md5two.split("");

  let str = "";
  for (let i = 0; i <= 31; i++) {
    if (isNaN(source[i])) {
      str = "zsedcftgbhujmko13579";
      if (str.search(rule[i]) > -1) {
        source[i] = source[i].toUpperCase();
      }
    }
  }
  const code32 = source.join("");
  const code1 = code32.slice(0, 1);

  if (isNaN(code1)) {
    return code32.slice(0, 16);
  } else {
    return "H" + code32.slice(1, 16);
  }
}

export default {
  data() {
    return {
      oldpassword: "",
      salt: "",
    };
  },
  created() {
    const self = this;
    let clipboard = new Clipboard("#newpassword");
    clipboard.on("success", function () {
      self.$message.success("复制成功");
    });

    clipboard.on("error", (err) => {
      self.$message.error(`复制失败: ${err}`);
    });
  },
  computed: {
    newpassword() {
      return generate(this.oldpassword, this.salt);
    },
  },
};
</script>

<style scoped>
span {
  margin: 0.67em auto;
}
</style>
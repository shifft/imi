<template>
  <el-row>
    <el-col
      :span="12" :offset="6"
      :xs={span:24,offset:0}
    >
      <el-input type="password" placeholder="old password" v-model="oldpassword" clearable autofocus >
      </el-input>

      <el-input type="text" placeholder="salt domain" v-model="salt" clearable >
      </el-input>

      <el-input :type="newPasswordType" placeholder="new password" v-model="newpassword" >
        <el-button slot="append" @click="showNewPassword = !showNewPassword" :icon="viewNewPasswordIcon" ></el-button>
        <el-button slot="append" icon="fa fa-copy fa-lg" id="newpassword" :data-clipboard-text="newpassword" ></el-button>
      </el-input>
    </el-col>
  </el-row>
</template>

<script>
import md5 from 'blueimp-md5'
import Clipboard from 'clipboard'

function generate (password, salt) {
  if (!password || !salt) {
    return
  }

  const md5one = md5(password, salt)
  const md5two = md5(md5one, 'isayme')
  const md5three = md5(md5one, 'heaven')

  const rule = md5three.split('')
  const source = md5two.split('')

  let str = ''
  for (let i = 0; i <= 31; i++) {
    if (isNaN(source[i])) {
      str = 'zsedcftgbhujmko13579'
      if (str.search(rule[i]) > -1) {
        source[i] = source[i].toUpperCase()
      }
    }
  }
  const code32 = source.join('')
  const code1 = code32.slice(0, 1)

  if (isNaN(code1)) {
    return code32.slice(0, 16)
  } else {
    return 'H' + code32.slice(1, 16)
  }
}

export default {
  data () {
    return {
      oldpassword: '',
      salt: '',
      newpassword: '',
      showNewPassword: false
    }
  },
  created () {
    const self = this
    let clipboard = new Clipboard('#newpassword')
    clipboard.on('success', function () {
      self.$message({
        message: '复制成功',
        type: 'success',
        showClose: true
      })
    })

    clipboard.on('error', (err) => {
      self.$message({
        message: `复制失败: ${err}`,
        type: 'error',
        showClose: true
      })
    })
  },
  computed: {
    newPasswordType () {
      if (this.showNewPassword) {
        return 'text'
      } else {
        return 'password'
      }
    },
    viewNewPasswordIcon () {
      if (this.showNewPassword) {
        return 'fa fa-eye-slash fa-lg'
      } else {
        return 'fa fa-eye fa-lg'
      }
    }
  },
  watch: {
    oldpassword: function () {
      this.newpassword = generate(this.oldpassword, this.salt)
    },
    salt: function () {
      this.newpassword = generate(this.oldpassword, this.salt)
    }
  }
}
</script>

<style>
.el-input {
  margin: 0.5em;
}
</style>

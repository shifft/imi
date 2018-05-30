<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-main>
      <IMI></IMI>
    </el-main>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
import Header from './components/header'
import Footer from './components/footer'
import IMI from './components/imi'

export default {
  components: {
    Header,
    Footer,
    IMI
  }
}
</script>

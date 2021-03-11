<template>
  <div class="hello" style="margin: auto;background: #f0ffff ;padding: 24px;max-width: 700px ">
    <h1>{{ msg }}</h1>
    <div>
      <h2>自动更新日志  ChangeLog</h2>
      <h3>#项目的重要改变会被记录在这个文档中</h3>
      <h3>#All notable changes to this project will be documented in this file.</h3>
      <template>
        <div v-bind:key="version.version" v-for="version in log">
          <h4 v-if="version.projects[0].name !==undefined && version.projects[0].name.length !==0">
            <!--          如果项目名为空则不显示版本号及版本名-->
            版本：[ {{version.name}} ] [ {{version.version}} ]</h4>
          <div v-bind:key="projects.projects" v-for="projects in version.projects">
            <div v-if="projects.changeLogs !== undefined && projects.changeLogs.length !==0">
              <!--            如果更新日志为空则不显示项目名-->
              <h5>项目名：[ {{projects.name}} ]</h5>
              <div v-bind:key="changeLogs.changeLogs" v-for="changeLogs in projects.changeLogs ">
                <li v-if="changeLogs.log !== undefined && changeLogs.log.length !==0">
                  <!--                  只有log种类下有内容才显示log详情-->
                  {{changeLogs.type}}:
                </li>
                <div v-bind:key="message.message" v-for="message in changeLogs.log"  style="margin: 25px 50px">
                  <ul v-if="message.message !== undefined && message.message.length !==0 ">
                    --{{ message.message}}
                  </ul>
                  <p v-if="message.message !== undefined && message.message.length !==0">
                    Created At:{{message.timestamp}}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function() {
    return {
      log: require('@/assets/changelog/changelog.json'),
    }
  },
  methods:{
    compare(a,b){
      const aAttr = a.split('.');
      const bAttr = b.split('.');
      if(aAttr[2]>bAttr[2]) {
        return 1
      }
      if(aAttr[0] == bAttr[0] && aAttr[1] >= bAttr[1]){
        return 1
      }
      if(aAttr[0] == bAttr[0] && aAttr[1] == bAttr[1] && aAttr[2] >= bAttr[2]){
        return 1
      }
      if(aAttr[0] == bAttr[0] && aAttr[1] == bAttr[1] && aAttr[2] == bAttr[2]){
        return 0
      }
      else {
        return -1
      }
    },
  },
  mounted () {
    console.log(this.log)
    this.log= this.log.sort((a,b)=>-this.compare(a.version,b.version))
    document.body.style.backgroundColor= "white"
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  margin: 50px 0px 0;
  font-size: xx-large;
  color: black;
  text-align: left;
}
h3 {
  margin: 40px 0 0;
  color: #2c3e50;
  text-align: left;
}
h4 {
  font-size: 20px;
  color: black;
  text-align: left;
}
h5 {
  font-size: large;
  color: darkslategrey;
  text-align: left;
}
p {
  font-size: small;
  text-align: left;
}

ul {
  list-style-type: none;
  padding: 0;
  text-align: left;
}

li {
  margin: 0 10px;
  text-align: left;
}

a {
  color: azure;
  text-align: -moz-left;
}
</style>

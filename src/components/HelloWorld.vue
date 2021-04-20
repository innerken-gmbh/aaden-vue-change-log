<template>
  <v-container>
    <v-row class="pa-4" justify="space-between">
      <v-col cols="3">
        <v-navigation-drawer permanent>
          <v-list id="nav" rounded dense style="position: absolute; top: 0px;">
            <v-list-item-group v-model="selected" color="primary">
              <v-list-item
                  :href="'#' + version.version"
                  v-for="version in log"
                  :key="version.version"
              >
                <v-list-item-title >
                  {{ version.name }}{{ version.version }}版本
                </v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <!-- <v-col class="d-flex text-center"> -->
      <v-col cols="8">
        <v-card
          :id="version.version"
          class="my-4"
          v-for="version in log"
          :key="version.version"
        >
          <v-card-title>
            Aaden系统
            <v-icon color="light-blue lighten-2">mdi-bird</v-icon>
            {{ version.name }}{{ version.version }}版本
          </v-card-title>
          <v-card-text v-for="project in version.projects" :key="project.name">
            <v-card-subtitle v-if="project.name !== undefined && project.name.length !==0">
              项目名：[ {{ project.name }} ] </v-card-subtitle>
<!--            v-if判断渲染是否成功-->
            <v-treeview dense :items="project.changeLogs"
                        v-if="project.changeLogs !== undefined && project.changeLogs.length !== 0"
            ></v-treeview>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",
  data: () => ({
    rawlog: require("@/assets/changelog/changelog.json"),
    selected: 0,
  }),
  computed: {
    log: function () {
      return this.rawlog
        .filter((v) => {
          return (
            v.projects[0].name !== undefined && v.projects[0].name.length !== 0
          );
        })
        .map((v) => {
          v.projects = v.projects
            .filter((p) => {
              return p.changeLogs !== undefined && p.changeLogs.length !== 0;
            })
            .map((p) => {
              let index = 0;
              p.changeLogs = p.changeLogs
                .filter((l) => {
                  return l.log !== undefined && l.log.length !== 0;
                })
                .map((l) => {
                  return {
                    id: index++,
                    name: l.type,
                    children: l.log.map((l) => {
                      return {
                        id: index++,
                        name: "-- " + l.message,
                      };
                    }),
                  };
                });
              return p;
            });
          return v;
        })
        .sort((left, right) => {
          left = left.version.split(".");
          right = right.version.split(".");
          let n = Math.max(left.length, right.length);
          for (let i = 0; i < n; i++) {
            let code1 = left[i] === undefined ? 0 : parseInt(left[i]);
            let code2 = right[i] === undefined ? 0 : parseInt(right[i]);
            if (code1 > code2) {
              return -1;
            } else if (code1 < code2) {
              return 1;
            }
          }
          return 0;
        });
    },
  },
  methods: {
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const nav = document.getElementById('nav')
      if (scrollTop >= 0 && scrollTop < 5) {
        nav.style.top = '0px'
      } else {
        nav.style.top = scrollTop - 5 + 'px'
      }
    },
    //滚动条监听滚动事件，控制导航栏固定位置
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  }
};
</script>

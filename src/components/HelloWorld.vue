<template>
  <v-container>
    <div class="py-4" v-for="version in log" :key="version.version">
      <v-card>
        <v-card-title>
          Aaden系统
          <v-icon color="light-blue lighten-2">mdi-bird</v-icon>
          {{ version.name }}{{ version.version }}版本
        </v-card-title>

        <!-- 设置 key 为 project.name，假设 project 下条目名字都不一样 -->
        <v-card-text v-for="project in version.projects" :key="project.name">
					<v-card-subtitle> 项目名：[ {{ project.name }} ] </v-card-subtitle>
          <v-treeview dense :items="project.changeLogs"></v-treeview>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    log: require("@/assets/changelog/changelog.json")
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
            var index = 0;
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
      }),
  }),
};
</script>

<template>
  <v-app>
    <v-navigation-drawer permanent app>
      <v-list nav>
        <v-subheader>Versions</v-subheader>
        <v-divider></v-divider>
        <v-list-item
            :href="'#' + version.version"
            v-for="version in log"
            :key="version.version"
        >
          <v-list-item-title>
            {{ version.name }}{{ version.version }}版本
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-row class="pa-4">
        <v-col>
          <v-sheet
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
              <v-card-subtitle> 项目名：[ {{ project.name }} ]</v-card-subtitle>
              <v-treeview dense :items="project.changeLogs"></v-treeview>
            </v-card-text>
          </v-sheet>
        </v-col>
      </v-row>
    </v-main>
  </v-app>

</template>

<script>
const rawLog = require('@/assets/changelog/changelog.json')

export default {
  name: 'HelloWorld',
  data: () => ({
    rawLog,
    indexCounter: 0
  }),
  computed: {
    log: function () {
      return this.rawLog
          .filter((v) => v.projects[0].name !== undefined && v.projects[0].name.length !== 0)
          .map((v) => {
            v.projects = v.projects.filter((p) =>
                p.changeLogs !== undefined && p.changeLogs.length !== 0
                )
                .map((p) => {
                  p.changeLogs = p.changeLogs
                      .filter((l) => {
                        return l.log !== undefined && l.log.length !== 0
                      })
                      .map((l) => {
                        return {
                          id: this.indexCounter++,
                          name: l.type,
                          children: l.log.map((log) => {
                            return {
                              id: this.indexCounter++,
                              name: '-- ' + log.message,
                            }
                          }),
                        }
                      })
                  return p
                })
            return v
          })
          .sort((left, right) => {
            left = left.version.split('.')
            right = right.version.split('.')
            let n = Math.max(left.length, right.length)
            for (let i = 0; i < n; i++) {
              let code1 = left[i] === undefined ? 0 : parseInt(left[i])
              let code2 = right[i] === undefined ? 0 : parseInt(right[i])
              if (code1 > code2) {
                return -1
              } else if (code1 < code2) {
                return 1
              }
            }
            return 0
          })
    },
  },
}
</script>

<template>
  <v-app>
    <v-navigation-drawer permanent app>
      <v-list nav>
        <v-subheader>Versions</v-subheader>
        <v-divider></v-divider>
        <v-list-item-group color="primary">
          <v-list-item
            :href="'#' + version.version"
            v-for="version in log"
            :key="version.version"
          >
            <v-list-item-title>
              {{ version.name }}{{ version.version }}版本
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
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
            <v-card-text
              v-for="project in version.projects"
              :key="project.name"
            >
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
const rawLog = require("@/assets/changelog/changelog.json");

export default {
  name: "HelloWorld",
  data: () => ({
    rawLog,
    // indexCounter: 0
  }),
  computed: {
    log: function () {
      return this.rawLog
        .filter((v) => this.arrayIsNotEmpty(v.projects[0].name))
        .map((v) => this.convertVersion(v))
        .sort(this.compareVersion);
    },
  },
  methods: {
    arrayIsNotEmpty(arr) {
      return arr !== undefined && arr.length !== 0;
    },
    compareVersion(left, right) {
      const [main, sub, patch] = left.version
        .split(".")
        .map((c) => parseInt(c));
      const [main_t, sub_t, patch_t] = right.version
        .split(".")
        .map((c) => parseInt(c));
      return -(
        main === main_t &&
        (sub > sub_t || (sub === sub_t && patch >= patch_t))
      );
    },
    convertProject(p) {
      var indexCounter = 0;
      p.changeLogs = p.changeLogs
        .filter((l) => this.arrayIsNotEmpty(l.log))
        .map((l) => ({
          id: indexCounter++,
          name: l.type,
          children: l.log.map((log) => ({
            id: indexCounter++,
            name: log.message,
          })),
        }));
      return p;
    },
    convertVersion(v) {
      v.projects = v.projects
        .filter((p) => this.arrayIsNotEmpty(p.changeLogs))
        .map((p) => this.convertProject(p));
      return v;
    },
  },
};
</script>

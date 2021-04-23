import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
  zh: {
    added: "增加",
    changed: "修改",
    deprecated: "弃用",
    removed: "移除",
    fixed: "修复",
    yanked: "事故",
    versionchange: "版本变更",
  },
};

export default new VueI18n({
  locale: "zh",
  messages,
});

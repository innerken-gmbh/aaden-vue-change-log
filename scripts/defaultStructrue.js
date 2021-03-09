export const defaultVersion = {
  version: null,
  name: 'name',
  projects: []
}
export const VersionTag = {
  Added: 1,
  Changed: 2,
  Deprecated: 3,
  Removed: 4,
  Fixed: 5,
  Yanked: 6,
  VersionChange: 7
  //big issues happened
}

export const defaultProject = {
  name: '',
  changeLogs: Object.keys(VersionTag).map(k => ({
    k: []
  }))
}

export const defaultChangeLog = {
  message: '',
  timestamp: '',
  ref: ''
}


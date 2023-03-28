export const state = () => ({
  languages: [],
  project: null
})

export const mutations = {
  updateLanguages (state, languages) {
    state.languages = languages
  },
  updateProject (state, project) {
    state.project = project
  }
}

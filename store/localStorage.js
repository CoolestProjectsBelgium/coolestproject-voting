export const state = () => ({
  languages: [],
  current_project: null
})

export const mutations = {
  updateLanguages (state, languages) {
    state.languages = languages
  },
  updateProject (state, project) {
    state.current_project = project
  }
}

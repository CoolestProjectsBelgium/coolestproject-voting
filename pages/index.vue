<template>
  <div>
    <NavBar />
    <b-container fluid>
      <VoteDetails v-if="project" v-model="project" @submit="submitResult" @next="submitNext" />
      <p v-else>
        Error please refresh
      </p>
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  async fetch () {
    await this.submitNext()
  },
  computed: {
    project: {
      set (p) {
        this.$store.commit('localStorage/updateProject', structuredClone(p))
      },
      get () {
        return structuredClone(this.$store.state.localStorage.project)
      }
    }
  },
  methods: {
    async submitResult (event) {
      const votes = []
      for (const vote of event.categories) {
        votes.push({ id: vote.id, value: vote.value })
      }
      await this.$axios.$post('/voting/projects/' + event.project_id, votes)
      this.$toast.success('Vote received', { duration: 2000 })
      await this.submitNext()
    },
    async submitNext () {
      if (!this.$store.state.localStorage.languages || this.$store.state.localStorage.languages.length === 0) {
        this.$router.push({
          path: 'language'
        })
        return
      }
      this.project = await this.$axios.$get('/voting/projects', {
        params: {
          languages: JSON.stringify(this.$store.state.localStorage.languages),
          skipProject: this.project?.project_id
        }
      })
      if (this.project.message === 'finished') {
        this.$router.push({
          path: 'finished'
        })
      }
      window.scrollTo(0, 0)
    }
  }
}
</script>

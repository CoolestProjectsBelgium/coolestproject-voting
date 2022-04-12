<template>
  <div>
    <NavBar />
    <b-container fluid>
      <VoteDetails v-model="project" @submit="submitResult" @next="submitNext" />
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      project: {}
    }
  },
  async fetch () {
    await this.submitNext()
  },
  methods: {
    async submitResult (event) {
      const votes = []
      for (const vote of event.categories) {
        votes.push({ id: vote.id, value: vote.value })
      }
      await this.$axios.$post('/voting/projects/' + event.project_id, votes)
      this.$toast.success('votes recieved', { duration: 2000 })
      await this.submitNext()
    },
    async submitNext () {
      this.project = await this.$axios.$get('/voting/projects', { params: { languages: JSON.stringify(this.$store.state.localStorage.languages) } })
      if (this.project.message === 'finished') {
        this.$router.push({
          path: 'finished'
        })
      }
    }
  }
}
</script>

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
    this.project = await this.$axios.$get('/voting/projects')
  },
  methods: {
    async submitResult (event) {
      const votes = []
      for (const vote of event.categories) {
        votes.push({ id: vote.id, value: vote.value })
      }
      await this.$axios.$post('/voting/projects/' + event.project_id, votes)
    },
    async submitNext () {
      this.project = await this.$axios.$get('/voting/projects')
    }
  }
}
</script>

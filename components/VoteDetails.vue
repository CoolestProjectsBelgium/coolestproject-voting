<template>
  <div>
    <div class="pt-3 pb-3">
      <b-button variant="info" block @click="$emit('next')">
        Next Project
      </b-button>
    </div>
    <b-overlay rounded="sm">
      <b-card :title="value.title">
        <b-card-text>{{ value.description }}</b-card-text>
      </b-card>
    </b-overlay>
    <b-form class="p-3" @submit.prevent="submitResult" @reset="resetResult">
      <b-form-group v-for="cat in value.categories" id="input-group-1" :key="cat.id + ''" :label="cat.title">
        <b-form-rating :id="cat.id + ''" v-model="cat.value" :stars="cat.max" />
      </b-form-group>
      <div>
        <b-button type="submit" variant="primary" block>
          Submit
        </b-button>
        <b-button type="reset" variant="danger" block>
          Reset
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  props: {
    value: Object
  },
  emits: ['submit'],
  data () {
    return {
      result: {}
    }
  },
  methods: {
    submitResult () {
      const data = { ...this.value }
      this.$emit('submit', data)
    },
    resetResult () {
      const data = { ...this.value }
      for (const element of data.categories) {
        element.value = 0
      }
      this.$emit('input', data)
    }
  }

}
</script>

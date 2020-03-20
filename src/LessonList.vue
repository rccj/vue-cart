<template>
  <div>
    <LessonItem class="list"
      v-for="lesson in lessons"
      :lesson="lesson"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import LessonItem from './LessonItem'

export default {
  components: {
    LessonItem,
  },
  computed: {
    ...mapState(['lessons']),
  },
  methods: {
    ...mapActions(['fetchLessons']),
  },
  mounted() {
    this.fetchLessons();
  },
};
</script>

<style scoped>
.list{
  padding-top: 30px;
  text-align: center;
}
</style>
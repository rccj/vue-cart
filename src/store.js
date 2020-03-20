import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//http://www.mocky.io/v2/5e72fb173000004e002e61a0

const LESSONS_URL = 'http://www.mocky.io/v2/5e72fb173000004e002e61a0'

const store = new Vuex.Store({
  state: {
    lessons: [],
    cart: [],
  },

  getters: {
    lessonsInCart(state) {
      return state.cart.length;
    },
    // lessonsInCart: state => (
    //   state.cart.length
    // ),
    priceInCart(state) {
      return state.cart.reduce((acc, lesson) => {
        return acc + parseInt(lesson.price);
      }, 0);
    },
    // priceInCart: state => (
    //   state.cart.reduce((acc, lesson) => (
    //     acc + lesson.price
    //   ), 0)
    // ),
    isLessonInCart(state) {
      //帶入lesson
      return (lesson) => {
        //解構分離{id}，用findIndex找符合條件的陣列
        return state.cart.findIndex(({ id }) => {
          //條件為 state.cart（購物車裡的）裡面的id等於lesson.id（選購的）
          return id === lesson.id
          //找到的話 會回傳一個數字（數字的位置），結果為大於-1，找不到的話會回傳-1
        }) !== -1;
      }
    }
    // isLessonInCart: state => lesson => (
    //   state.cart.findIndex(({id}) => (
    //     id === lesson.id
    //   )) !== -1
    // ),
  },

  mutations: {
    setLessons(state, lessons) {
      state.lessons = lessons;
    },
    addToCart(state, lesson) {
      state.cart.push(lesson)
    },
    deleteCart(state, lesson) {
      state.cart.splice(state.cart.findIndex(function(item) {
        return item.id === lesson.id;
      }),1)
    }
  },
  actions: {
    fetchLessons({ commit }) {
      fetch(LESSONS_URL)
        .then(rs => rs.json())
        .then(rs => {
          commit('setLessons', rs);
          //.then(function(rs){
          // return commit('setLessons', rs)
          // })
        });
    },
  },
});

export default store;
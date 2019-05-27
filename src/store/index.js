import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userCommit: JSON.parse(localStorage.getItem('commit') || '[]')
  },
  mutations: {
    addCommit (state, usersCommit) {
      state.userCommit.push(usersCommit)
      localStorage.setItem('commit', JSON.stringify(state.userCommit))
    },
    deleteCommit (state, userId) {
      const userCommit = state.userCommit.concat()
      const idx = userCommit.find(c => c.userId === userId)
      userCommit.splice(userCommit.indexOf(idx), 1)
      state.userCommit = userCommit
      // console.log(state.userCommit)
      localStorage.setItem('commit', JSON.stringify(state.userCommit))
    },
    updateCommit (state, { userId, handlerCommit }) {
      const userCommits = state.userCommit.concat()
      const indx = userCommits.findIndex(c => c.userId === userId)
      const com = userCommits[indx]
      userCommits[indx] = { ...com, handlerCommit }
      state.userCommit = userCommits
      localStorage.setItem('commit', JSON.stringify(state.userCommit))
    }
  },
  actions: {
    addCommit ({ commit }, usersCommit) {
      commit('addCommit', usersCommit)
    },
    deleteCommit ({ commit }, userId) {
      commit('deleteCommit', userId)
    },
    updateCommit ({ commit }, commits) {
      commit('updateCommit', commits)
    }
  },
  getters: {
    userCommits: state => state.userCommit
  }
})

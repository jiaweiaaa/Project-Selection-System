import { getToken, getStudent } from '@/utils/auth'
import cookies from 'js-cookie'

const state = {
    token: getToken(),
    student: getStudent(),
}

const mutations = {
    SET_TOKEN: (state, token) => {
        cookies.set('token', token)
        state.token = token
    },
    SET_STUDENT: (state, student) => {
        cookies.set('student', student)
        state.student = student
    }

}

const actions = {
    login({ commit }, {token, student}) {
        commit('SET_TOKEN', token)
        commit('SET_STUDENT', student)
    },
    logout({ commit }) {
        commit('SET_TOKEN', '')
        commit('SET_STUDENT', {})
    },
    setStudent({commit}, student) {
        commit('SET_STUDENT', student)
    }
}
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
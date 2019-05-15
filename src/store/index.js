import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sbhlOverViewSelectedCompany: '' // 选中的子公司 -- overview页面
  },
  mutations: {
    // 改变选中的子公司 -- overview页面
    changeOverViewSelectedCompanyMut (state, val){
      state.sbhlOverViewSelectedCompany = val
    },
  },
  actions: {

  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sbhlOverViewSelectedCompany: '' // overview页面选中的子公司
  },
  mutations: {
    // 改变加工中心
    changeOverViewSelectedCompanyMut (state, val){
      state.sbhlOverViewSelectedCompany = val
    },
  },
  actions: {

  }
})

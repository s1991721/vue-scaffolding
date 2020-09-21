import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
// npm install svg-sprite-loader --save-dev   设置loader，否则会重复处理svg导致不显示  否则不能使用
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
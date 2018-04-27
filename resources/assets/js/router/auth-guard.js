import { store } from '../store'
export default (to, from, next) => {
    if(store.getters.user){
        next()
    } else if(localStorage.getItem('token') == 'null' || localStorage.getItem('token') == null){
        next('/signin')
    } else {
        next()
    }
}
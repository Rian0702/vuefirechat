import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import firebase from 'firebase'

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "*",
      name: "Login",
      component: Login
    },
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/hello",
      name: "Hello",
      component: HelloWorld,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/sign-up",
      name: "SignUp",
      component: SignUp
    }
  ]
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('hello')
  else next()
})

export default router;

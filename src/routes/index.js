import SignUpPage from "../pages/SignUpPages/SignUpPage"
import SignInPage from "../pages/SignInPages/SignInPages"
import HomePage from "../pages/HomePage/HomePage"
export const routes = [
  {
    path:'/',
    page:HomePage,
    isShowHeader:true
  },
  {
    path:'/sign-up',
    page: SignUpPage,
    isShowHeader:false
  },
  {
    path:'/sign-in',
    page: SignInPage,
    isShowHeader:false
  }
]
import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
//serializeUser : 어떤 field가 쿠키에 포함될 것인지 알려줌.
//쿠키에 id가 담김.
passport.deserializeUser(User.deserializeUser());
//deserializeUser : 쿠키의 정보를 어떻게 사용할 것인지.

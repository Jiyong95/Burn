import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
	res.locals.siteName = "WeTube";
	res.locals.routes = routes;
	res.locals.user = {
		isAuthenticated: true,
		id:1
	}
	next();
	//다음 함수로 넘어가게함. 그아래 router함수.
}
// local변수들을 global변수로 이용하기 위함.
// in PUG에서만 해당되는 듯.

import { Strategy, ExtractJwt } from "passport-jwt";

const opts = {} as { jwtFromRequest: any; secretOrKey: string };

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET || "";

const strat = new Strategy(
    opts,
    (jwt_payload: { username: string }, done: Function) => {
        if (jwt_payload.username === "Fake") {
            return done(null, true);
        }

        return done(null, false);
    }
);

export default strat;

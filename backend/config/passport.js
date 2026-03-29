const { eq } = require('drizzle-orm');
const db = require('./drizzle')
const passport = require("passport");
const { usersTable } = require('../db/schema');
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY;
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    const user = await db.select().from(usersTable).where(eq(usersTable.id, jwt_payload.id))
    // const user = await prisma.user.findUnique({
    //   where: {
    //     id: jwt_payload.id,
    //   },
    // });

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  })
);

module.exports = passport;

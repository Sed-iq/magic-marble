const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

const CLIENT_ID = "304349791646-dbcd5dbbqoslauf8tguha9dbhvo5839v.apps.googleusercontent.com"
const CLIENT_SECRET = "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"

passport.use(
	new GoogleStrategy(
		{
			clientID: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
            console.log(profile);
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
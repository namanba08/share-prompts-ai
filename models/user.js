import { Schema,model,models } from "mongoose";

const UserSchema = new Schema({
	email: {
		type: String,
		unique: [true, "email already exists!"],
		required: [true, "email is required!"],
	},
	username: {
		type: String,
		required: [true, "username is required!"],
		match: [
			/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
			"Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
		],
	},
    image:{
        type:String,
    }
});

/*

normal syntax when running normal react applications in which server running all the time
not to be used when with Nextjs as server not always running

const user  = model("User", UserSchema);
export default User
*/

// the models object consists all the models that exist, hence check if model already exists

const User = models.User || model("User",UserSchema);

export default User;
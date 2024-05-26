import { createUser, getUserByEmail } from "../../users/service";
import { compare } from "bcryptjs";
import { response } from "@/helpers/response";
import { log } from "@/helpers/log";

export async function loginGuest() {
  try {
    const newGuest = await createUser({
      roleType: 0,
      firstName: 'Guest'
    })

    const result = { 
      message: "Login successful",
      user: {
        id: newGuest.id,
        roleType: newGuest.roleType,
        firstName: "Guest",
        lastName: "",
      } 
    }

    log('Guest user logged in', { userId: newGuest.id });
    return response(result, { status: 200, statusText: "OK" })
  } catch (error) {
    log('Error logging in guest user', { error: error.message });
    throw error;
  }
}

export async function loginUserRegistered(data) {
  try {
    const { email, password } = data

    const user = await getUserByEmail(email);
    if (!user) {
      log('Invalid email or password', { email });
      return response({ message: "Invalid email or password" }, { status: 400, statusText: "Bad Request" });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      log('Invalid email or password', { email });
      return response({ message: "Invalid email or password" }, { status: 400, statusText: "Bad Request" });
    }

    const result = { 
      message: "Login successful", 
      user: {
        id: user.id,
        roleType: user.roleType,
      } 
    }

    log('User logged in', { userId: user.id });
    return response(result, { status: 200, statusText: "OK" })
  } catch (error) {
    log('Error logging in user', { error: error.message, inputData: data });
    throw error;
  }
}



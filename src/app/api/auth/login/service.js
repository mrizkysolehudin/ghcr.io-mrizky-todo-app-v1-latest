import { createUser, getUserByEmail } from "../../users/service";
import { compare } from "bcryptjs";
import { response } from "@/helpers/response";

export async function loginGuest() {
  const newGuest = await createUser({
    roleType: 0,
    firstName: 'Guest'
  })

  const result = { 
    message: "Login successful",
    user: {
      id: newGuest.id,
      roleType: newGuest.roleType,
    } 
  }
  return response(result, { status: 200, statusText: "OK" })
}

export async function loginUserRegistered(data) {
  const { email, password } = data

  const user = await getUserByEmail(email);
  if (!user) {
    return response({ message: "Invalid email or password" }, { status: 400, statusText: "Bad Request" });
  }

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    return response({ message: "Invalid email or password" }, { status: 400, statusText: "Bad Request" });
  }

  const result = { 
    message: "Login successful", 
    user: {
      id: user.id,
      roleType: user.roleType,
    } 
  }
  return response(result, { status: 200, statusText: "OK" })
}



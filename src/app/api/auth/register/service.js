import { createUser, getUserByEmail } from "../../users/service";
import { hash } from "bcryptjs";
import { response } from "@/helpers/response";

export async function registerUser(data) {
  const { firstName, lastName, email, password } = data

  if (!email || !password) {
    return response({ message: "Email and password are required" }, { status: 400, statusText: "Bad Request" })
  }

  const existingEmail = await getUserByEmail(email);
  if (existingEmail) {
    return response({ message: "Email already exists" }, { status: 400, statusText: "Bad Request" });
  }

  const hashedPassword = await hash(password, 10);
  const newUser = await createUser({
    roleType: 1,
    firstName,
    lastName,
    email,
    password: hashedPassword,
  })

  return response({ data: newUser }, { status: 200, statusText: "OK" })
}

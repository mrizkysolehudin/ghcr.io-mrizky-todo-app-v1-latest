import { createUser, getUserByEmail } from "../../users/service";
import { hash } from "bcryptjs";
import { response } from "@/helpers/response";
import { log } from "@/helpers/log";

export async function registerUser(data) {
  try {
    const { firstName, lastName, email, password } = data

    if (!email || !password) {
      log('Email and password are required', { inputData: data });
      return response({ message: "Email and password are required" }, { status: 400, statusText: "Bad Request" })
    }

    const existingEmail = await getUserByEmail(email);
    if (existingEmail) {
      log('Email already exists', { email });
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

    log('User registered successfully', { userId: newUser.id });
    return response({ data: newUser }, { status: 200, statusText: "OK" })
  } catch (error) {
    log('Error registering user', { error: error.message, inputData: data });
    throw error;
  }
}

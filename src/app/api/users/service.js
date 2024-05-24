import db from "@/configs/db";
import { response } from "@/helpers/response";
import { log } from "@/helpers/server/log";


export async function createUser(data) {
  try {
    const user = await db.user.create({ data });
    log('User created', { userId: user.id });
    return user;
  } catch (error) {
    log('Error creating user', { error: error.message, data });
    throw error;
  }
}

export async function getUserByEmail(email) {
  try {
    const user = await db.user.findUnique({ where: { email } });
    log('Get user by email', { email, userId: user?.id });
    return user;
  } catch (error) {
    log('Error getting user by email', { error: error.message, email });
    throw error;
  }
}

export async function getUserById(id) {
  try {
    const user = await db.user.findFirst({ where: { id: parseInt(id) } });

    if (!user) {
      log('User not found', { userId: id });
      return response({ message: "User not found" }, { status: 404, statusText: "Bad Request" });
    }
    delete user?.password;

    log('Get user by ID', { userId: id });
    return response(user, { status: 200, statusText: "OK" });
  } catch (error) {
    log('Error getting user by ID', { error: error.message, userId: id });
    throw error;
  }
}

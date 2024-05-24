import db from "@/configs/db";
import { response } from "@/helpers/response";

export async function createTask(data) {
  try {
    const newTask = await db.task.create({
      data,
    });
    
    if (!newTask) {
      log('Failed to create task', { inputData: data });
      return response({ message: "Data is invalid" }, { status: 400, statusText: "Bad request" });
    }

    log('Task created successfully', { taskId: newTask.id });
    return response(newTask, { status: 201, statusText: "Created" });
  } catch (error) {
    log('Error creating task', { error: error.message, inputData: data });
    throw error;
  }
}

export async function getTasksByUserId(userId) {
  const user_id = parseInt(userId)
  const user = await db.user.findFirst({
    where: {
      id: user_id,
    },
  });

  if (!user) {
    return response({ message: "User not found" }, { status: 404, statusText: "Bad Request" });
  }

  const tasks = await db.task.findMany({
    where: {
      userId: user_id
    },
  });

  return response({ data: tasks }, { status: 200, statusText: "Success" });
}

export async function updateTask(data) {
  let { id, isDone, description } = data

  const task = await getTaskById(id)
  if (!task) return response({ message: "Task not found" }, { status: 404, statusText: "Not Found" })

  const updatedTask = await db.task.update({
    where: {
      id,
    },
    data: {
      isDone: isDone,
      description: description,
      userId: task?.userId,
      createdAt: task?.createdAt
    },
  });
  if (!updatedTask) return response({ message: "Data is invalid" }, { status: 400, statusText: "Bad request" })


  return response(updatedTask , { status: 200, statusText: "Success" });
}

export async function deleteTask(taskId) {
  const id = parseInt(taskId)
  const task = await getTaskById(id)
  if (!task) return response({ message: "Task not found" }, { status: 404, statusText: "Not Found" })

  const deletedTak = await db.task.delete({
    where: {
      id,
    },
  });
  if (!deletedTak) return response({ message: "Data is invalid" }, { status: 400, statusText: "Bad request" })

  return response({ message: "Task has been removed" } , { status: 200, statusText: "Success" });
}

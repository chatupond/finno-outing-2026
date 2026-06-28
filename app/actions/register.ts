"use server"

import { auth } from "@/auth"
import {
  appendAttendee,
  checkExistingRegistration,
  removeAttendee,
} from "@/app/lib/sheets"
import { revalidatePath } from "next/cache"
import { isAllowedEmail } from "@/app/lib/config"

export async function checkMyRegistration(): Promise<boolean> {
  const session = await auth()
  if (!session?.user?.email) return false
  if (!isAllowedEmail(session.user.email)) return false
  return checkExistingRegistration(session.user.email)
}

export type RegisterState = {
  success?: boolean
  error?: string
}

export async function registerAttendee(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const session = await auth()
  if (!session?.user?.email) {
    return { error: "Not authenticated" }
  }

  const email = session.user.email
  const name = session.user.name ?? email
  const team = formData.get("team") as string
  const image = session.user.image ?? ""

  if (!team) {
    return { error: "Please select a team" }
  }

  if (!isAllowedEmail(email)) {
    return { error: "Only @finnomena.com and @fint.finance email addresses can register." }
  }

  const alreadyRegistered = await checkExistingRegistration(email)
  if (alreadyRegistered) {
    return { error: "already_registered" }
  }

  await appendAttendee(name, email, team, image)
  revalidatePath("/")
  return { success: true }
}

export type OptOutState = {
  success?: boolean
  error?: string
}

export async function optOutTrip(
  prevState: OptOutState
): Promise<OptOutState> {
  const session = await auth()
  if (!session?.user?.email) {
    return { error: "Not authenticated" }
  }

  const removed = await removeAttendee(session.user.email)
  if (!removed) {
    return { error: "No registration found for your account." }
  }

  revalidatePath("/")
  return { success: true }
}

"use server"

import { getNoteById } from "./notes"
import { revalidatePath } from "next/cache"

export async function sendNoteByEmail(noteId: string) {
    const note = await getNoteById(noteId)

    if (!note) {
        throw new Error("Note not found")
    }

    // In a real app, you would use a service like Resend, SendGrid, etc.
    // This is a mock implementation
    console.log(`Sending email with note: ${note.title}`)

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // In a real app, you might want to update the note to track that it was emailed
    revalidatePath(`/notes/${noteId}`)

    return { success: true }
}

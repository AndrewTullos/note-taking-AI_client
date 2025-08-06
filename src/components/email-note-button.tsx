"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Loader2 } from 'lucide-react'
import { toast } from 'sonner';
import { Note } from "@/lib/types"
import { sendNoteByEmail } from "@/lib/actions"

interface EmailNoteButtonProps {
    note: Note
}

export function EmailNoteButton({ note }: EmailNoteButtonProps) {
    const [isSending, setIsSending] = useState(false)

    const handleSendEmail = async () => {
        setIsSending(true)

        try {
            await sendNoteByEmail(note.id)
            toast.success("Success!", {
                description: "Your note has been sent to your email address.",
            });
            // toast({
            //     title: "Email Sent",
            //     description: "Your note has been sent to your email address.",
            // })
        } catch (error) {
            console.error("Error sending email:", error)
            toast.success("Email Failed!", {
                description: "Failed to send email. Please try again.",
            });
            // toast({
            //     title: "Email Failed",
            //     description: "Failed to send email. Please try again.",
            //     variant: "destructive",
            // })
        } finally {
            setIsSending(false)
        }
    }

    return (
        <Button onClick={handleSendEmail} disabled={isSending}>
            {isSending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                </>
            ) : (
                <>
                    <Mail className="mr-2 h-4 w-4" />
                    Email Note
                </>
            )}
        </Button>
    )
}

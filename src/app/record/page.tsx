"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, Square, Loader2, Send } from 'lucide-react'
import { toast } from 'sonner';
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/Navbar";


export default function RecordPage() {
    const [isRecording, setIsRecording] = useState(false)
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const audioChunksRef = useRef<Blob[]>([])
    // const { toast } = Toaster()
    const router = useRouter()

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const mediaRecorder = new MediaRecorder(stream)
            mediaRecorderRef.current = mediaRecorder
            audioChunksRef.current = []

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data)
                }
            }

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
                setAudioBlob(audioBlob)

                // Stop all tracks to release the microphone
                stream.getTracks().forEach(track => track.stop())
            }

            mediaRecorder.start()
            setIsRecording(true)
        } catch (error) {
            console.error("Error accessing microphone:", error)
            toast.error("Error!", {
                description: "Could not access your microphone. Please check permissions.",
            });
            // toast({
            //     title: "Microphone Error",
            //     description: "Could not access your microphone. Please check permissions.",
            //     variant: "destructive",
            // })
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
        }
    }

    const processAudio = async () => {
        if (!audioBlob) return

        setIsProcessing(true)

        try {
            const formData = new FormData()
            formData.append("audio", audioBlob)

            const response = await fetch("/api/transcribe", {
                method: "POST",
                body: formData,
            })

            if (!response.ok) {
                throw new Error("Failed to process audio")
            }

            const data = await response.json()

            // Navigate to the note view page with the new note ID
            router.push(`/notes/${data.noteId}`)
        } catch (error) {
            console.error("Error processing audio:", error)
            toast.error("Error!", {
                description: "Failed to process your recording. Please try again.",
            });
            // toast({
            //     title: "Processing Error",
            //     description: "Failed to process your recording. Please try again.",
            //     variant: "destructive",
            // })
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <>
            <Navbar />
            <div className="container max-w-md mx-auto py-10 px-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Record Your Note</CardTitle>
                        <CardDescription>
                            Speak clearly and we'll transcribe your audio into smart notes.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                        <div className="relative w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                            {isRecording && (
                                <div className="absolute inset-0 rounded-full animate-pulse bg-primary/20"></div>
                            )}
                            {isRecording ? (
                                <Square className="h-12 w-12 text-red-500" />
                            ) : (
                                <Mic className="h-12 w-12 text-primary" />
                            )}
                        </div>

                        {audioBlob && !isRecording && (
                            <audio controls className="w-full mb-4">
                                <source src={URL.createObjectURL(audioBlob)} type="audio/webm" />
                                Your browser does not support the audio element.
                            </audio>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        {!isRecording && !audioBlob && (
                            <Button onClick={startRecording} className="w-full">
                                Start Recording
                            </Button>
                        )}

                        {isRecording && (
                            <Button onClick={stopRecording} variant="destructive" className="w-full">
                                Stop Recording
                            </Button>
                        )}

                        {audioBlob && !isRecording && (
                            <div className="flex w-full gap-2">
                                <Button onClick={() => {
                                    setAudioBlob(null)
                                    audioChunksRef.current = []
                                }} variant="outline">
                                    Discard
                                </Button>
                                <Button onClick={processAudio} disabled={isProcessing} className="flex-1">
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Process Audio
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}
                    </CardFooter>
                </Card>
            </div>

        </>
    )
}

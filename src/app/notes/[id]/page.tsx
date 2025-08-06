import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getNoteById } from "@/lib/notes"
import { ArrowLeft, Mail, Download } from 'lucide-react'
import Link from "next/link"
import { notFound } from "next/navigation"
import { EmailNoteButton } from "@/components/email-note-button"

export default async function NotePage({ params }: { params: { id: string } }) {
    const note = await getNoteById(params.id)

    if (!note) {
        notFound()
    }

    return (
        <div className="container mx-auto py-10 px-4 max-w-3xl">
            <div className="mb-6">
                <Button variant="ghost" asChild className="mb-4">
                    <Link href="/notes">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to notes
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{note.title}</CardTitle>
                    <CardDescription>
                        Recorded on {new Date(note.createdAt).toLocaleString()}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium mb-2">Key Points</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            {note.keyPoints.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium mb-2">Full Transcript</h3>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md text-sm">
                            <p>{note.transcript}</p>
                        </div>
                    </div>

                    {note.audioUrl && (
                        <div>
                            <h3 className="text-lg font-medium mb-2">Audio Recording</h3>
                            <audio controls className="w-full">
                                <source src={note.audioUrl} type="audio/webm" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <EmailNoteButton note={note} />
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

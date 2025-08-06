import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Clock, Mail, Trash2 } from 'lucide-react'
import Link from "next/link"
import { getNotes } from "@/lib/notes"

export default async function NotesPage() {
    const notes = await getNotes()

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Your Notes</h1>
                <Button asChild>
                    <Link href="/record">New Recording</Link>
                </Button>
            </div>

            {notes.length === 0 ? (
                <div className="text-center py-12">
                    <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h2 className="text-xl font-medium mb-2">No notes yet</h2>
                    <p className="text-gray-500 mb-6">Record your first note to get started</p>
                    <Button asChild>
                        <Link href="/record">Start Recording</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {notes.map((note) => (
                        <Card key={note.id}>
                            <CardHeader>
                                <CardTitle className="line-clamp-1">{note.title}</CardTitle>
                                <CardDescription className="flex items-center">
                                    <Clock className="mr-1 h-3 w-3" />
                                    {new Date(note.createdAt).toLocaleDateString()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="line-clamp-3 text-sm text-gray-500">{note.summary}</p>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={`/notes/${note.id}`}>View</Link>
                                </Button>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon">
                                        <Mail className="h-4 w-4" />
                                        <span className="sr-only">Email</span>
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Delete</span>
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

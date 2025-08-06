import { Note } from "./types"

// This is a mock implementation. In a real app, you would use a database.
const mockNotes: Note[] = [
    {
        id: "1",
        title: "Meeting with Marketing Team",
        transcript: "Today we discussed the Q3 marketing strategy. We need to focus on social media campaigns and influencer partnerships. The budget needs to be finalized by next Friday.",
        summary: "Q3 marketing strategy discussion focusing on social media and influencer partnerships.",
        keyPoints: [
            "Focus on social media campaigns",
            "Explore influencer partnerships",
            "Finalize budget by next Friday",
            "Schedule follow-up meeting with creative team"
        ],
        createdAt: new Date().toISOString(),
    },
    {
        id: "2",
        title: "Product Development Ideas",
        transcript: "I think we should add a dark mode to our app. Users have been requesting this feature for months. We should also consider improving the onboarding flow to reduce drop-off rates.",
        summary: "Product improvement ideas including dark mode and improved onboarding.",
        keyPoints: [
            "Implement dark mode",
            "Improve onboarding flow",
            "Analyze drop-off rates",
            "Conduct user testing on new features"
        ],
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    }
]

export async function getNotes(): Promise<Note[]> {
    // In a real app, you would fetch from a database
    return mockNotes
}

export async function getNoteById(id: string): Promise<Note | null> {
    // In a real app, you would fetch from a database
    const note = mockNotes.find(note => note.id === id)
    return note || null
}

export async function createNote(data: Omit<Note, 'id' | 'createdAt'>): Promise<Note> {
    // In a real app, you would save to a database
    const newNote: Note = {
        ...data,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
    }

    mockNotes.unshift(newNote)
    return newNote
}

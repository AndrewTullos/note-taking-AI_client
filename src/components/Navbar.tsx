import Link from "next/link";
import {FileText} from "lucide-react";

export const Navbar  = () => {
    return (
        <>
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <Link className="flex items-center justify-center" href="/">
                    <FileText className="h-6 w-6 mr-2" />
                    <span className="font-bold">VoiceNotes</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                        Features
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                        About
                    </Link>
                </nav>
         </header>
        </>
    );
};

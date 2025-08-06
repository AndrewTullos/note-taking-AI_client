import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mic, FileText, Mail } from 'lucide-react'
import NoiseGradient from "@/components/NoiseGradient";


export default function Home() {
  return (
<>
  <NoiseGradient />
  <div className="flex flex-col min-h-screen">
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="#">
        <FileText className="h-6 w-6 mr-2" />
        <span className="font-bold">VoiceNotes</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Features
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          About
        </Link>
      </nav>
    </header>
    <main className="flex-1">
      <section className="w-full flex-1 flex items-center justify-center py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Grass Stains Notes
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-800 md:text-xl dark:text-gray-400">
                Record meetings, get AI-powered summaries,  email them to IcedOutRaptorz.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/record">
                  Start Recording <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/notes">View Your Notes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/*<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">*/}
      {/*  <div className="container px-4 md:px-6">*/}
      {/*    <div className="grid gap-6 lg:grid-cols-3 items-center">*/}
      {/*      <div className="flex flex-col justify-center space-y-4">*/}
      {/*        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20">*/}
      {/*          <Mic className="h-8 w-8 text-primary" />*/}
      {/*        </div>*/}
      {/*        <h3 className="text-xl font-bold">Record Audio</h3>*/}
      {/*        <p className="text-gray-500 dark:text-gray-400">*/}
      {/*          Easily record your voice notes with our simple interface.*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*      <div className="flex flex-col justify-center space-y-4">*/}
      {/*        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20">*/}
      {/*          <FileText className="h-8 w-8 text-primary" />*/}
      {/*        </div>*/}
      {/*        <h3 className="text-xl font-bold">AI Transcription</h3>*/}
      {/*        <p className="text-gray-500 dark:text-gray-400">*/}
      {/*          Our AI automatically transcribes your audio and extracts key points.*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*      <div className="flex flex-col justify-center space-y-4">*/}
      {/*        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20">*/}
      {/*          <Mail className="h-8 w-8 text-primary" />*/}
      {/*        </div>*/}
      {/*        <h3 className="text-xl font-bold">Email Summaries</h3>*/}
      {/*        <p className="text-gray-500 dark:text-gray-400">*/}
      {/*          Send your notes and summaries directly to your email with one click.*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
    </main>
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 VoiceNotes. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Terms of Service
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Privacy
        </Link>
      </nav>
    </footer>
  </div>

</>
  )
}

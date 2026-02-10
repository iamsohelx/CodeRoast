"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Flame, Loader2, Skull, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [code, setCode] = useState("");
  const [spiciness, setSpiciness] = useState("senior");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    roast?: string;
    fix?: string;
    pain_score?: number;
  } | null>(null);
  const [loadingMsg, setLoadingMsg] = useState("");

  const loadingMessages = [
    "Judging your indentation...",
    "Questioning your life choices...",
    "Looking for memory leaks...",
    "Consulting the elder gods of C...",
    "Trying not to vomit...",
    "Sighing loudly...",
  ];

  const handleRoast = async () => {
    if (!code.trim()) {
      toast.error("Please provide some code to roast.");
      return;
    }

    setLoading(true);
    setResult(null);

    // Cycle loading messages
    const interval = setInterval(() => {
      setLoadingMsg(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    }, 2000);
    setLoadingMsg(loadingMessages[0]);

    try {
      const response = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, spiciness }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to roast");
      }

      setResult(data);
      if (data.pain_score > 8) {
        toast("Oof. That was brutal.", { icon: "💀" });
      } else {
        toast.success("Roast served hot!");
      }

    } catch (error) {
      toast.error("Even the AI refused to read this garbage. Try again.");
      console.error(error);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

      <div className="max-w-4xl w-full space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center gap-3">
            <Flame className="w-12 h-12 text-orange-500" />
            CodeRoast
          </h1>
          <p className="text-zinc-400 text-lg">
            Get your code roasted by a grumpy senior developer.
          </p>
        </div>

        {/* Controls */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="pt-6 space-y-6">

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Your Code Snippet</label>
              <Textarea
                placeholder="// Paste your shame here..."
                className="font-mono min-h-[200px] mt-2 bg-zinc-950 border-zinc-800 text-green-400 resize-y"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-zinc-400">Spiciness Level</label>
                <Select value={spiciness} onValueChange={setSpiciness}>
                  <SelectTrigger className="bg-zinc-950 border-zinc-800 mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-950 border-zinc-800">
                    <SelectItem value="junior">Junior Dev (Gentle)</SelectItem>
                    <SelectItem value="senior">Senior Dev (Strict)</SelectItem>
                    <SelectItem value="savage">Linus Torvalds (Savage)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={handleRoast}
                  disabled={loading}
                  className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {loadingMsg}
                    </>
                  ) : (
                    <>
                      <Flame className="mr-1 h-4 w-4" />
                      Roast Me
                    </>
                  )}
                </Button>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
              <CardHeader className="bg-red-950/20 border-b border-red-900/20">
                <CardTitle className="text-red-500 flex items-center gap-2">
                  <Skull className="w-5 h-5" />
                  The Verdict
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="text-xl font-medium text-zinc-200">
                  "{result.roast}"
                </div>
                <div className="flex items-center gap-2 text-zinc-500">
                  <span>Pain Score:</span>
                  <div className="flex gap-0.5">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 w-4 rounded-full ${i < (result.pain_score || 0) ? 'bg-red-500' : 'bg-zinc-800'}`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-red-500 ml-2">{result.pain_score}/10</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="border-b border-zinc-800">
                <CardTitle className="text-green-500 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  The Fix
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="prose prose-invert max-w-none prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800">
                  <ReactMarkdown>{result.fix || ""}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>

          </div>
        )}

      </div>
    </main>
  );
}

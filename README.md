# 🔥 CodeRoast

**CodeRoast** is a "Grumpy Senior Developer" simulator that doesn't just review your code—it hurts your feelings. powered by Google Gemini AI, it analyzes code snippets and delivers harsh truths with varying levels of "spiciness" while also providing legitimate fixes.

![CodeRoast Demo](./public/demo-screenshot.png) 
*(Note: Add a screenshot here later if you want!)*

## 🚀 Features

- **Standard Code Editor**: Clean, dark-mode interface for pasting your questionable code.
- **Spiciness Toggle**: Choose your reviewer's personality:
  - **Junior Dev (Gentle)**: Kind, supportive, and helpful. Uses small words. (~Pain Score: 1/10)
  - **Senior Dev (Strict)**: Professional, annoyed, and intolerant of incompetence. (~Pain Score: 5/10)
  - **Linus Torvalds (Savage)**: Ruthless, sarcastic, and verbally abusive. (~Pain Score: 10/10)
- **AI-Powered Analysis**: Uses `gemini-flash-latest` for fast, intelligent code critique.
- **Markdown Fixes**: Returns corrected code with proper syntax highlighting.
- **Pain Score**: A quantifiable metric of how bad your code actually is.
- **Cyberpunk Aesthetic**: Sleek dark UI with zinc/orange themes and subtle grid backgrounds.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Button, Card, Select, Textarea)
- **AI Engine**: [Google Gemini API](https://ai.google.dev/) (`gemini-flash-latest`)
- **Markdown**: `react-markdown` + `@tailwindcss/typography`
- **Icons**: `lucide-react`
- **Notifications**: `sonner`

## 🏁 Getting Started

### Prerequisites
- Node.js 18+ installed
- A [Google Gemini API Key](https://aistudio.google.com/)

### Installation

1.  **Clone the repository** (or download source):
    ```bash
    git clone https://github.com/yourusername/coderoast.git
    cd coderoast
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env.local` file in the root directory:
    ```bash
    GEMINI_API_KEY=your_actual_api_key_here
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  **Open the app**:
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 🎮 How to Use

1.  **Paste Code**: Copy any snippet (e.g., JavaScript, Python, C++) into the editor.
    *Tip: Try pasting broken code like `if (true == true) return true;`*
2.  **Select Spiciness**:
    - Select **"Savage"** if you want to cry.
    - Select **"Senior"** if you want to learn.
3.  **Click "Roast Me"**: Wait for the AI to judge you.
4.  **Read the Verdict**: Check the insult, the Pain Score, and the fixed code below.

## 🧪 Testing

We have a built-in test script to verify the API responses and spiciness levels:

```bash
node test-spiciness.mjs
```

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-3">Qazi Abdul Muiz</h1>
      <p className="text-gray-400 mb-2">Front-end AI Engineering Intern</p>
      <p className="text-gray-300 max-w-xl">
        I don&apos;t stop at &quot;it works&quot; — I make sure I understand
        why. I&apos;m still learning, but I follow things through carefully,
        even in tools I&apos;ve never touched before.
      </p>
      <div className="flex gap-3 mt-6">
        <a
          href="/projects"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-md font-medium"
        >
          See my projects
        </a>
        <a
          href="/chat"
          className="inline-block border border-gray-700 hover:border-gray-500 text-white px-5 py-2 rounded-md font-medium"
        >
          Ask about my work
        </a>
      </div>
    </div>
  );
}

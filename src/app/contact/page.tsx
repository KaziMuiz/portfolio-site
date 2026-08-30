export default function ContactPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Contact</h1>
      <p className="text-gray-300 mb-6">
        Message me to talk — I&apos;d rather show you how I think through a
        problem than just list what I know.
      </p>
      <ul className="space-y-2 text-gray-300">
        <li>
          LinkedIn:{" "}
          <a
            href="https://linkedin.com/in/kaziimuiz"
            className="text-blue-400 hover:underline"
          >
            linkedin.com/in/kaziimuiz
          </a>
        </li>
        <li>
          GitHub:{" "}
          <a
            href="https://github.com/KaziMuiz"
            className="text-blue-400 hover:underline"
          >
            github.com/KaziMuiz
          </a>
        </li>
        <li>Email: moizxtar8@gmail.com</li>
      </ul>
    </div>
  );
}

const projects = [
  {
    name: "Movie Search App",
    stack: "React, Vite, OMDb API",
    description:
      "Built independently using AI as a development assistant during the internship.",
    link: "https://github.com/KaziMuiz/movie-search-app",
  },
  {
    name: "Hospital Management System",
    stack: "Python, CustomTkinter, MySQL",
    description:
      "A group project — I focused on deeply understanding the full system and presented it in class, not written by me.",
    link: "https://github.com/KaziMuiz/hospital-management-system",
  },
  {
    name: "Student Performance App",
    stack: "Python, Gradio",
    description:
      "A group project — helped present how the app processes and calculates student results.",
    link: "https://github.com/KaziMuiz/student-performance-app",
  },
];

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Projects</h1>
      <div className="grid gap-4">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-gray-800 rounded-lg p-4 hover:border-gray-600 transition-colors"
          >
            <h2 className="font-semibold text-lg">{project.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{project.stack}</p>
            <p className="text-gray-300 text-sm">{project.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

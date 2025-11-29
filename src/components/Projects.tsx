import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import portfolioImg from "@/assets/project-portfolio.jpg";
import awsImg from "@/assets/project-aws.jpg";
import linuxImg from "@/assets/project-linux.jpg";

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: "Portfolio Website",
      description:
        "A professional portfolio website deployed with GitHub Pages. Features modern design, responsive layout, and smooth animations.",
      image: portfolioImg,
      tech: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
      liveUrl: "https://saurabhumai.github.io/Portfolio",
      githubUrl: "https://github.com/saurabhumai",
    },
    {
      title: "AWS EC2 Web Server",
      description:
        "Hosted a static website on EC2 using Apache web server, configured EBS storage, created snapshots, and built AMI for backup and scaling.",
      image: awsImg,
      tech: ["AWS EC2", "Apache", "EBS", "AMI", "Linux"],
      liveUrl: null,
      githubUrl: "https://github.com/saurabhumai",
    },
    {
      title: "Linux Automation Scripts",
      description:
        "Collection of bash scripts for automating system tasks, file management, and deployment processes. Coming soon!",
      image: linuxImg,
      tech: ["Bash", "Linux", "Shell Scripting", "Automation"],
      liveUrl: null,
      githubUrl: "https://github.com/saurabhumai",
      comingSoon: true,
    },
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4">
        <div
          className={`max-w-6xl mx-auto ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-glow">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="glass-card-hover rounded-2xl overflow-hidden group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-60"></div>
                  {project.comingSoon && (
                    <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-xs font-bold text-primary-foreground">
                      Coming Soon
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-primary">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-muted rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                        asChild
                      >
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={16} className="mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-primary/50 text-primary hover:bg-primary/10"
                      asChild
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={16} className="mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

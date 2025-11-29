import { useEffect, useRef, useState } from "react";
import { Cloud, Laptop, Wrench, Globe, MessageSquare } from "lucide-react";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState<string[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const skillCategories = [
    {
      title: "Cloud",
      icon: Cloud,
      color: "text-cyan-400",
      skills: [
        { name: "AWS Basics (IAM, EC2, EBS, S3)", level: 75 },
        { name: "VPC, Route53, CloudFront", level: 70 },
        { name: "Load Balancer, ASG", level: 65 },
      ],
    },
    {
      title: "DevOps",
      icon: Laptop,
      color: "text-blue-400",
      skills: [
        { name: "Linux Fundamentals", level: 80 },
        { name: "Git & GitHub", level: 85 },
        { name: "SSH, SCP, Shell Scripts", level: 70 },
      ],
    },
    {
      title: "Tools",
      icon: Wrench,
      color: "text-green-400",
      skills: [
        { name: "Termux, WSL, VirtualBox", level: 80 },
        { name: "Windows Terminal", level: 85 },
        { name: "VS Code", level: 90 },
      ],
    },
    {
      title: "Web",
      icon: Globe,
      color: "text-purple-400",
      skills: [
        { name: "HTML & CSS", level: 85 },
        { name: "JavaScript Basics", level: 75 },
        { name: "Responsive Design", level: 80 },
      ],
    },
    {
      title: "Soft Skills",
      icon: MessageSquare,
      color: "text-orange-400",
      skills: [
        { name: "Communication", level: 85 },
        { name: "Fast Learner", level: 95 },
        { name: "Problem-solving", level: 90 },
      ],
    },
  ];

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

  useEffect(() => {
    if (isVisible) {
      skillCategories.forEach((category) => {
        category.skills.forEach((skill, index) => {
          setTimeout(() => {
            setAnimatedSkills((prev) => [...prev, skill.name]);
          }, index * 200);
        });
      });
    }
  }, [isVisible]);

  return (
    <section id="skills" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4">
        <div
          className={`max-w-6xl mx-auto ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-glow">
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="glass-card-hover rounded-2xl p-6"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <category.icon className={`w-8 h-8 ${category.color}`} />
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          {skill.name}
                        </span>
                        <span className="text-sm font-bold text-primary">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: animatedSkills.includes(skill.name)
                              ? `${skill.level}%`
                              : "0%",
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

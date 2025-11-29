import { useEffect, useRef, useState } from "react";
import { Code2, Server, Terminal, Award } from "lucide-react";

const About = () => {
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

  const highlights = [
    { icon: Server, text: "AWS & Cloud Computing" },
    { icon: Terminal, text: "Linux & DevOps" },
    { icon: Code2, text: "Web Development" },
    { icon: Award, text: "Fast Learner" },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4">
        <div
          className={`max-w-5xl mx-auto ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-glow">
            About Me
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full"></div>

          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  <span className="text-primary font-semibold">Saurabh Yadav</span> is a BSc IT student 
                  passionate about Cloud Computing, DevOps, Linux, and modern tech. He has completed 
                  networking fundamentals (IP, Subnets, Routing, Ports, DNS, DHCP, NAT), Linux basics, 
                  and AWS basics (IAM, EC2, EBS, AMI, VPC, CloudFormation, Route53, CloudFront, S3, 
                  Load Balancer, ASG).
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  He is currently learning Linux, AWS & DevOps while building real-world projects. 
                  He enjoys exploring tech, working with terminals, building websites, and learning automation.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <div
                    key={index}
                    className="glass-card-hover rounded-xl p-6 text-center"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <item.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                    <p className="text-sm font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

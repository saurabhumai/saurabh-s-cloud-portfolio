import { useEffect, useRef, useState } from "react";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const socialLinks = [
    {
      icon: Mail,
      href: "mailto:saurabh@example.com",
      label: "Email",
      color: "hover:text-red-400",
    },
    {
      icon: Github,
      href: "https://github.com/saurabhumai",
      label: "GitHub",
      color: "hover:text-purple-400",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/saurabh-yadav",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4">
        <div
          className={`max-w-4xl mx-auto ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-glow">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12 rounded-full"></div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    required
                    className="bg-muted border-border/50 focus:border-primary"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    required
                    className="bg-muted border-border/50 focus:border-primary"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    required
                    rows={5}
                    className="bg-muted border-border/50 focus:border-primary resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full glow-border bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Send size={18} className="mr-2" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
                <p className="text-muted-foreground mb-8">
                  Feel free to reach out for collaborations, questions, or just to say hi!
                  I'm always open to discussing new projects and opportunities.
                </p>

                <div className="space-y-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 p-4 glass-card-hover rounded-xl transition-colors ${link.color}`}
                    >
                      <link.icon size={24} />
                      <span className="font-medium">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8 text-center">
                <p className="text-lg font-semibold mb-2">Portfolio</p>
                <a
                  href="https://saurabhumai.github.io/Portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  saurabhumai.github.io/Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

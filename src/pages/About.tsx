import { useState, useEffect } from "react";
import { Code, Database, Brain, Shield, Palette, Wrench, GraduationCap, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const About = () => {
  const [skillCategories, setSkillCategories] = useState<any[]>([]);
  const [educationItems, setEducationItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const iconMap: Record<string, any> = {
    "Programming": <Code className="w-6 h-6" />,
    "Frameworks": <Wrench className="w-6 h-6" />,
    "Databases": <Database className="w-6 h-6" />,
    "AI & ML": <Brain className="w-6 h-6" />,
    "Cybersecurity": <Shield className="w-6 h-6" />,
    "Creative Tools": <Palette className="w-6 h-6" />
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [skillsRes, educationRes] = await Promise.all([
      supabase.from('skills').select('*').order('category', { ascending: true }),
      supabase.from('education').select('*').order('created_at', { ascending: false })
    ]);

    if (!skillsRes.error && skillsRes.data) {
      const groupedSkills = skillsRes.data.reduce((acc: any, skill: any) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill.name);
        return acc;
      }, {});

      const categories = Object.entries(groupedSkills).map(([category, skillsList]) => ({
        title: category,
        icon: iconMap[category] || <Code className="w-6 h-6" />,
        skills: skillsList as string[]
      }));

      setSkillCategories(categories);
    }

    if (!educationRes.error && educationRes.data) {
      setEducationItems(educationRes.data);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                About Me
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I'm <span className="text-primary font-semibold">Manuth Lochana</span>, passionate about technology, coding, and creative innovation. I work on projects that combine software development, AI, and design. I also founded <span className="text-primary font-semibold">Thunder Storm Studio</span>, where I focus on video editing, motion graphics, and coding-driven projects.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Additionally, I explore advanced technologies including AI fine-tuning, system optimization, and creative problem-solving. My journey combines technical expertise with creative vision, allowing me to build innovative solutions that bridge the gap between functionality and aesthetics.
              </p>
            </div>

            {isLoading ? (
              <div className="text-center text-muted-foreground">Loading...</div>
            ) : (
              <>
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-foreground mb-8">Skills & Technologies</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillCategories.map((category) => (
                      <div
                        key={category.title}
                        className="p-6 border border-border rounded-lg card-hover"
                      >
                        <div className="flex items-center mb-4">
                          <div className="text-primary mr-3">
                            {category.icon}
                          </div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {category.title}
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 text-xs rounded-full border border-border bg-card text-muted-foreground"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-6 border border-primary/30 bg-primary/5 rounded-lg">
                    <h3 className="text-xl font-bold text-primary mb-3 flex items-center">
                      <Brain className="w-5 h-5 mr-2" />
                      Recent Work in AI
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Currently working on advanced AI projects using Hugging Face's LLaMA 4 fine-tuning techniques, focusing on PEFT (Parameter-Efficient Fine-Tuning) methods for creating specialized AI models.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Hugging Face", "LLaMA 4", "PEFT", "Model Training", "AI Systems"].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-foreground mb-8">Education</h2>
                  <div className="space-y-6">
                    {educationItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-6 border border-border rounded-lg card-hover"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <GraduationCap className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                              <h3 className="text-lg font-bold text-foreground">
                                {item.course}
                              </h3>
                              <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 w-fit">
                                {item.status}
                              </span>
                            </div>
                            <p className="text-primary font-medium mb-2">
                              {item.institution}
                            </p>
                            <p className="text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 border border-border rounded-lg">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-primary" />
                    Career Focus
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Aspiring software engineer combining technical expertise with creative vision. My goal is to bridge the gap between cutting-edge technology and innovative design, creating solutions that are both functionally robust and visually compelling.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;

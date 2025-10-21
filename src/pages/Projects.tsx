import { useState, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Projects
              </h1>
              <p className="text-lg text-muted-foreground">
                A collection of projects showcasing my work in software development, AI, and creative technology.
              </p>
            </div>

            {isLoading ? (
              <div className="text-center text-muted-foreground">Loading projects...</div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="p-6 border border-border rounded-lg card-hover"
                    >
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies?.map((tech: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-xs rounded-full border border-border bg-card text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {project.link && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                        >
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Project
                          </a>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-center p-8 border border-border rounded-lg">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Explore More Projects
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Check out my GitHub for more projects and open-source contributions
                  </p>
                  <Button asChild>
                    <a
                      href="https://github.com/manuthlochana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      <Github className="w-5 h-5 mr-3" />
                      View GitHub Profile
                    </a>
                  </Button>
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

export default Projects;

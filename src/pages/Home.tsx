import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const Home = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    loadProfileImage();
  }, []);

  const loadProfileImage = async () => {
    try {
      const { data: files, error } = await supabase.storage
        .from('profile-pictures')
        .list('', { limit: 1 });

      if (!error && files && files.length > 0) {
        const { data } = supabase.storage
          .from('profile-pictures')
          .getPublicUrl(files[0].name);

        setProfileImage(data.publicUrl);
      }
    } catch (error) {
      console.error('Error loading profile image:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
              <div className="flex-shrink-0">
                <img
                  src={profileImage || "/src/assets/profile-photo.webp"}
                  alt="Manuth Lochana"
                  className="w-48 h-48 rounded-full object-cover border-2 border-primary/20"
                />
              </div>

              <div className="flex-1">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
                  Manuth Lochana
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  Developer • Software Innovator • Tech Visionary
                </p>
                <p className="text-base text-muted-foreground leading-relaxed mb-8">
                  Passionate about technology, coding, and creative innovation. Building solutions that combine software development, AI, and design.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link to="/projects">
                      View Projects <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <div className="p-6 border border-border rounded-lg card-hover">
                <h3 className="text-lg font-semibold text-foreground mb-2">AI Enthusiast</h3>
                <p className="text-sm text-muted-foreground">
                  Exploring advanced AI technologies and fine-tuning models
                </p>
              </div>
              <div className="p-6 border border-border rounded-lg card-hover">
                <h3 className="text-lg font-semibold text-foreground mb-2">Creative Developer</h3>
                <p className="text-sm text-muted-foreground">
                  Combining technical expertise with creative vision
                </p>
              </div>
              <div className="p-6 border border-border rounded-lg card-hover">
                <h3 className="text-lg font-semibold text-foreground mb-2">Tech Innovator</h3>
                <p className="text-sm text-muted-foreground">
                  Building innovative solutions that bridge functionality and aesthetics
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/manuthlochana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/manuthlochana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

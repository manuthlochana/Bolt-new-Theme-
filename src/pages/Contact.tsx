import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send } from "lucide-react";
import * as Icons from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const renderIcon = (iconName?: string) => {
    if (!iconName) return <Mail className="w-5 h-5" />;
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="w-5 h-5" /> : <Mail className="w-5 h-5" />;
  };

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: true });

    if (!error && data) {
      const formattedLinks = data.map((contact: any) => {
        const displayText = contact.username || contact.value;

        let fullUrl = contact.value;
        if (contact.platform === 'Email' && !contact.value.startsWith('mailto:')) {
          fullUrl = `mailto:${contact.value}`;
        }

        return {
          name: contact.platform,
          displayText,
          url: fullUrl,
          icon: renderIcon(contact.icon)
        };
      });
      setSocialLinks(formattedLinks);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase
      .from('messages')
      .insert([{
        name: formData.name,
        email: formData.email,
        message: formData.message
      }]);

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Get in Touch
              </h1>
              <p className="text-lg text-muted-foreground">
                I'm always interested in discussing new opportunities, creative projects, or just having a chat about technology and innovation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-8 border border-border rounded-lg">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="resize-none"
                      placeholder="Tell me about your project or just say hello!"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>

              <div className="space-y-6">
                <div className="p-8 border border-border rounded-lg">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-muted-foreground">
                      <Mail className="w-5 h-5 mr-3 text-primary" />
                      <span>manuthlochana01@gmail.com</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <div className="w-5 h-5 mr-3 flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      </div>
                      <span>Available for new opportunities</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 border border-border rounded-lg">
                  <h2 className="text-xl font-bold text-foreground mb-6">Connect with Me</h2>
                  <div className="space-y-3">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-4 border border-border rounded-lg card-hover group"
                      >
                        <div className="text-muted-foreground group-hover:text-primary transition-colors mr-4">
                          {link.icon}
                        </div>
                        <div>
                          <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {link.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {link.displayText}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;

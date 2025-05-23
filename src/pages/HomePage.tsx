
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useAuth } from '@/providers/AuthProvider';
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  // Animation variants for staggered animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // If user is authenticated, redirect to the appropriate dashboard
  React.useEffect(() => {
    if (user && !isLoading) {
      if (user.role === 'client') {
        navigate('/client-dashboard');
      } else {
        navigate('/agency-dashboard');
      }
    }
  }, [user, isLoading, navigate]);

  // Handle login button click
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/placeholder.svg" alt="NOG" className="h-8 w-8" />
            <span className="font-semibold text-xl">NOG Dashboard</span>
          </div>
          <Button onClick={handleLoginClick}>Login</Button>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="flex-1 flex items-center">
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Marketing Performance Dashboard for Agencies
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              All your client campaigns in one place. Monitor, optimize, and grow with NOG Performance.
            </motion.p>
            <motion.div 
              className="flex gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button size="lg" onClick={handleLoginClick}>
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </motion.div>
          </div>
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <img 
              src="/placeholder.svg" 
              alt="Dashboard Preview" 
              className="w-full h-auto rounded-lg shadow-lg" 
            />
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Key Features
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Performance Analytics",
                description: "Track all your marketing metrics in one place with beautiful visualizations."
              },
              {
                title: "Client Management",
                description: "Manage all your clients and their campaigns with ease."
              },
              {
                title: "Automated Reports",
                description: "Schedule and send branded reports to your clients automatically."
              },
              {
                title: "Smart Automations",
                description: "Set up automations to monitor campaign performance and get alerts."
              },
              {
                title: "White Labeling",
                description: "Customize the dashboard with your brand colors and logo."
              },
              {
                title: "Multi-platform Integration",
                description: "Connect to Facebook, Google, TikTok, and more platforms."
              }
            ].map((feature, index) => (
              <motion.div key={index} variants={item}>
                <Card>
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-background py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NOG Performance Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

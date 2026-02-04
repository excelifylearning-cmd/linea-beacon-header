import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Shield, 
  Users, 
  Zap, 
  Trophy, 
  Scale,
  Building2,
  GraduationCap,
  TrendingUp,
  Star,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern bg-[size:60px_60px] opacity-20" />
        <motion.div
          className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-accent/30 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-secondary/50 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.5, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                The Future of Skill Exchange
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight"
            >
              Trade Skills,
              <br />
              <span className="bg-gradient-dark bg-clip-text text-transparent">Not Money</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Exchange your expertise for others' skills using Skill Points. 
              AI-powered dispute resolution, real-time collaboration, and gamified progression.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="gap-2 text-lg px-8">
                <Link to="/signup">
                  Start Swapping
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 text-lg px-8">
                <Link to="/marketplace">
                  Explore Marketplace
                </Link>
              </Button>
            </motion.div>
            
            {/* Live Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              {[
                { label: "Active Gigs", value: "12.4K+" },
                { label: "Skills Exchanged", value: "89K+" },
                { label: "Points Traded", value: "2.1M+" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="font-display text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-24 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Exchange skills in four simple steps
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Create Profile", desc: "Showcase your skills and set your rates in Skill Points" },
              { step: "02", title: "Browse & Match", desc: "Find skills you need or get matched by our AI" },
              { step: "03", title: "Collaborate", desc: "Work together in real-time with built-in tools" },
              { step: "04", title: "Exchange & Rate", desc: "Complete the swap and build your reputation" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group"
              >
                <div className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow">
                  <div className="font-mono text-5xl font-bold text-accent mb-4">{item.step}</div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
                {i < 3 && (
                  <ChevronRight className="hidden md:block absolute top-1/2 -right-4 w-6 h-6 text-muted-foreground/30 -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Built for Trust & Collaboration
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to exchange skills with confidence
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Scale, title: "Skill Court", desc: "AI-powered dispute resolution with community voting ensures fair outcomes" },
              { icon: Shield, title: "Escrow Protection", desc: "Skill Points held securely until work is approved by both parties" },
              { icon: Users, title: "Guild System", desc: "Join or create guilds to collaborate on larger projects" },
              { icon: Zap, title: "Real-time Workspace", desc: "Chat, whiteboard, video calls, and file sharing in one place" },
              { icon: Trophy, title: "Gamification", desc: "Earn badges, climb leaderboards, and unlock achievements" },
              { icon: TrendingUp, title: "ELO Rating", desc: "Skill-based ranking system for quality matching" },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* For Students & Enterprises */}
      <section className="py-24 bg-gradient-metallic">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Students */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-3xl p-8 shadow-medium"
            >
              <div className="w-14 h-14 rounded-2xl bg-info/10 flex items-center justify-center mb-6">
                <GraduationCap className="w-7 h-7 text-info" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">For Students</h3>
              <p className="text-muted-foreground mb-6">
                Build real-world experience, earn Skill Points, and connect with mentors. 
                Get verified with your .edu email for exclusive perks.
              </p>
              <ul className="space-y-3 mb-8">
                {["Auto-verification with .edu emails", "Student ambassador program", "Mentorship matching", "Portfolio building tools"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <Star className="w-4 h-4 text-info" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild variant="outline" className="gap-2">
                <Link to="/signup">
                  Join as Student
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
            
            {/* Enterprises */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-foreground rounded-3xl p-8 shadow-strong"
            >
              <div className="w-14 h-14 rounded-2xl bg-background/10 flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-background" />
              </div>
              <h3 className="font-display text-2xl font-bold text-background mb-4">For Enterprises</h3>
              <p className="text-background/70 mb-6">
                Access vetted experts, manage team projects, and get dedicated support. 
                Custom solutions for your business needs.
              </p>
              <ul className="space-y-3 mb-8">
                {["Verified expert pool", "Team management tools", "Custom SLAs", "Dedicated account manager"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-background">
                    <Star className="w-4 h-4 text-background/70" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild variant="secondary" className="gap-2">
                <Link to="/enterprise">
                  Contact Sales
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Start Swapping?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of skill exchangers building their portfolios and earning Skill Points.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2 text-lg px-8">
                <Link to="/signup">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 text-lg px-8">
                <Link to="/how-it-works">
                  Learn More
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;

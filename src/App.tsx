import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import { CommandPalette, MobileBottomNav } from "@/components/common";

// Marketing & Public Pages
import Index from "./pages/Index";
import About from "./pages/marketing/About";
import Team from "./pages/marketing/Team";
import Careers from "./pages/marketing/Careers";
import Pricing from "./pages/marketing/Pricing";
import Features from "./pages/marketing/Features";
import HowItWorks from "./pages/marketing/HowItWorks";
import Roadmap from "./pages/marketing/Roadmap";
import Changelog from "./pages/marketing/Changelog";
import Integrations from "./pages/marketing/Integrations";
import PressKit from "./pages/marketing/PressKit";
import Events from "./pages/marketing/Events";
import Partnerships from "./pages/marketing/Partnerships";
import Enterprise from "./pages/marketing/Enterprise";
import Testimonials from "./pages/marketing/Testimonials";

// Help & Documentation
import HelpCenter from "./pages/help/HelpCenter";
import Documentation from "./pages/help/Documentation";

// Community
import Blog from "./pages/community/Blog";
import Forums from "./pages/community/Forums";
import Leaderboard from "./pages/community/Leaderboard";
import SuccessStories from "./pages/community/SuccessStories";

// Legal Pages
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import Cookies from "./pages/legal/Cookies";
import Guidelines from "./pages/legal/Guidelines";
import GDPR from "./pages/legal/GDPR";
import RefundPolicy from "./pages/legal/RefundPolicy";

// Status & Security
import Status from "./pages/status/Status";
import Security from "./pages/status/Security";
import BugBounty from "./pages/status/BugBounty";

// Auth Pages
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import TwoFactorSetup from "./pages/auth/TwoFactorSetup";
import Onboarding from "./pages/auth/Onboarding";

// Marketplace
import Marketplace from "./pages/marketplace/Marketplace";
import GigDetails from "./pages/marketplace/GigDetails";
import CreateGig from "./pages/marketplace/CreateGig";
import Categories from "./pages/marketplace/Categories";
import Search from "./pages/marketplace/Search";

// User Profile & Portfolio
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Portfolio from "./pages/profile/Portfolio";

// Dashboards
import SellerDashboard from "./pages/dashboard/seller/SellerDashboard";
import SellerAnalytics from "./pages/dashboard/seller/SellerAnalytics";
import SellerGigs from "./pages/dashboard/seller/SellerGigs";
import SellerOrders from "./pages/dashboard/seller/SellerOrders";
import SellerEarnings from "./pages/dashboard/seller/SellerEarnings";
import SellerMessages from "./pages/dashboard/seller/SellerMessages";
import SellerSettings from "./pages/dashboard/seller/SellerSettings";

import BuyerDashboard from "./pages/dashboard/buyer/BuyerDashboard";
import BuyerOrders from "./pages/dashboard/buyer/BuyerOrders";
import BuyerFavorites from "./pages/dashboard/buyer/BuyerFavorites";
import BuyerWallet from "./pages/dashboard/buyer/BuyerWallet";

import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import AdminUsers from "./pages/dashboard/admin/AdminUsers";
import AdminModeration from "./pages/dashboard/admin/AdminModeration";
import AdminAnalytics from "./pages/dashboard/admin/AdminAnalytics";

// Guild
import GuildDashboard from "./pages/guild/GuildDashboard";
import GuildMembers from "./pages/guild/GuildMembers";
import GuildTreasury from "./pages/guild/GuildTreasury";
import GuildPortfolio from "./pages/guild/GuildPortfolio";
import CreateGuild from "./pages/guild/CreateGuild";
import ExploreGuilds from "./pages/guild/ExploreGuilds";

// Skill Court
import SkillCourt from "./pages/court/SkillCourt";
import CourtCase from "./pages/court/CourtCase";
import SubmitDispute from "./pages/court/SubmitDispute";
import JudgeProfile from "./pages/court/JudgeProfile";

// Workspace
import Workspace from "./pages/workspace/Workspace";
import WorkspaceChat from "./pages/workspace/WorkspaceChat";
import WorkspaceWhiteboard from "./pages/workspace/WorkspaceWhiteboard";
import WorkspaceFiles from "./pages/workspace/WorkspaceFiles";
import WorkspaceCall from "./pages/workspace/WorkspaceCall";

// Transaction
import TransactionLookup from "./pages/transaction/TransactionLookup";

// Coming Soon
import ComingSoon from "./pages/ComingSoon";

// Error Pages
import NotFound from "./pages/NotFound";
import ServerError from "./pages/errors/ServerError";
import AccessDenied from "./pages/errors/AccessDenied";
import Maintenance from "./pages/errors/Maintenance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CommandPalette />
          <Routes>
            {/* Marketing & Public Pages */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/features" element={<Features />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/press" element={<PressKit />} />
            <Route path="/events" element={<Events />} />
            <Route path="/partnerships" element={<Partnerships />} />
            <Route path="/enterprise" element={<Enterprise />} />
            <Route path="/testimonials" element={<Testimonials />} />

            {/* Help & Documentation */}
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/docs" element={<Documentation />} />

            {/* Community */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/forums" element={<Forums />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/success-stories" element={<SuccessStories />} />

            {/* Legal Pages */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/gdpr" element={<GDPR />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />

            {/* Status & Security */}
            <Route path="/status" element={<Status />} />
            <Route path="/security" element={<Security />} />
            <Route path="/bug-bounty" element={<BugBounty />} />

            {/* Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/2fa-setup" element={<TwoFactorSetup />} />
            <Route path="/onboarding" element={<Onboarding />} />

            {/* Marketplace */}
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/gig/:id" element={<GigDetails />} />
            <Route path="/create-gig" element={<CreateGig />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/search" element={<Search />} />

            {/* User Profile & Portfolio */}
            <Route path="/u/:username" element={<Profile />} />
            <Route path="/settings/profile" element={<EditProfile />} />
            <Route path="/portfolio/:username" element={<Portfolio />} />

            {/* Seller Dashboard */}
            <Route path="/seller" element={<SellerDashboard />} />
            <Route path="/seller/analytics" element={<SellerAnalytics />} />
            <Route path="/seller/gigs" element={<SellerGigs />} />
            <Route path="/seller/orders" element={<SellerOrders />} />
            <Route path="/seller/earnings" element={<SellerEarnings />} />
            <Route path="/seller/messages" element={<SellerMessages />} />
            <Route path="/seller/settings" element={<SellerSettings />} />

            {/* Buyer Dashboard */}
            <Route path="/buyer" element={<BuyerDashboard />} />
            <Route path="/dashboard" element={<BuyerDashboard />} />
            <Route path="/buyer/orders" element={<BuyerOrders />} />
            <Route path="/buyer/favorites" element={<BuyerFavorites />} />
            <Route path="/buyer/wallet" element={<BuyerWallet />} />

            {/* Admin Dashboard */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/moderation" element={<AdminModeration />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />

            {/* Guild */}
            <Route path="/guild/:id" element={<GuildDashboard />} />
            <Route path="/guild/:id/members" element={<GuildMembers />} />
            <Route path="/guild/:id/treasury" element={<GuildTreasury />} />
            <Route path="/guild/:id/portfolio" element={<GuildPortfolio />} />
            <Route path="/create-guild" element={<CreateGuild />} />
            <Route path="/guilds" element={<ExploreGuilds />} />

            {/* Skill Court */}
            <Route path="/court" element={<SkillCourt />} />
            <Route path="/court/case/:id" element={<CourtCase />} />
            <Route path="/court/submit" element={<SubmitDispute />} />
            <Route path="/court/judge/:id" element={<JudgeProfile />} />

            {/* Workspace */}
            <Route path="/workspace/:orderId" element={<Workspace />} />
            <Route path="/workspace/:orderId/chat" element={<WorkspaceChat />} />
            <Route path="/workspace/:orderId/whiteboard" element={<WorkspaceWhiteboard />} />
            <Route path="/workspace/:orderId/files" element={<WorkspaceFiles />} />
            <Route path="/workspace/:orderId/call" element={<WorkspaceCall />} />

            {/* Transaction */}
            <Route path="/transaction" element={<TransactionLookup />} />

            {/* Coming Soon */}
            <Route path="/coming-soon" element={<ComingSoon />} />

            {/* Error Pages */}
            <Route path="/500" element={<ServerError />} />
            <Route path="/403" element={<AccessDenied />} />
            <Route path="/maintenance" element={<Maintenance />} />
            
            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <MobileBottomNav />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

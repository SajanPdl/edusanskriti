
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudyMaterialsPage from "./pages/StudyMaterialsPage";
import PastPapersPage from "./pages/PastPapersPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import AdminPanel from "./pages/AdminPanel";
import ContentViewPage from "./pages/ContentViewPage";
import NotFound from "./pages/NotFound";
import ChatBot from "./components/ChatBot";
import StudyMaterialsManager from "./components/admin/StudyMaterialsManager";
import PastPapersManager from "./components/admin/PastPapersManager";
import UserManagement from "./components/admin/UserManagement";
import BlogEditor from "./components/admin/BlogEditor";
import AdvertisementManager from "./components/admin/AdvertisementManager";
import CategoriesManager from "./components/admin/CategoriesManager";
import GradesManager from "./components/admin/GradesManager";
import AdminSettings from "./components/admin/AdminSettings";
import AnalyticsPage from "./components/admin/AnalyticsPage";
import QueriesManager from "./components/admin/QueriesManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/study-materials" element={<StudyMaterialsPage />} />
          <Route path="/past-papers" element={<PastPapersPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<ContentViewPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/materials" element={<StudyMaterialsManager />} />
          <Route path="/admin/papers" element={<PastPapersManager />} />
          <Route path="/admin/blogs" element={<BlogEditor />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/ads" element={<AdvertisementManager />} />
          <Route path="/admin/categories" element={<CategoriesManager />} />
          <Route path="/admin/grades" element={<GradesManager />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/analytics" element={<AnalyticsPage />} />
          <Route path="/admin/queries" element={<QueriesManager />} />
          <Route path="/content/:id" element={<ContentViewPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* Chat bot available on all pages */}
        <ChatBot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

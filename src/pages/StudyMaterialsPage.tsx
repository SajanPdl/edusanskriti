
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Search, BookOpen, FileText, Download, Filter, ChevronRight } from 'lucide-react';
import useSearchSuggestions from '@/hooks/use-search-suggestions';
import Advertisement from '@/components/Advertisement';

const StudyMaterialsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const { 
    query, 
    setQuery, 
    suggestions, 
    showSuggestions, 
    setShowSuggestions 
  } = useSearchSuggestions({ category: 'materials' });
  
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "high-school", name: "High School" },
    { id: "bachelors", name: "Bachelor's Degree" },
    { id: "engineering", name: "Engineering" },
    { id: "medical", name: "Medical" },
    { id: "competitive", name: "Competitive Exams" }
  ];
  
  const subjects = [
    { id: "all", name: "All Subjects" },
    { id: "mathematics", name: "Mathematics" },
    { id: "physics", name: "Physics" },
    { id: "chemistry", name: "Chemistry" },
    { id: "biology", name: "Biology" },
    { id: "computer-science", name: "Computer Science" },
    { id: "history", name: "History" },
    { id: "geography", name: "Geography" }
  ];
  
  const materials = [
    {
      title: "Grade 10 Science Notes",
      category: "high-school",
      subject: "physics",
      description: "Comprehensive science notes covering physics, chemistry and biology for grade 10 students.",
      downloads: 1250,
      pages: 45,
      type: "pdf"
    },
    {
      title: "Engineering Mathematics",
      category: "engineering",
      subject: "mathematics",
      description: "Essential mathematical concepts and formulas for engineering students.",
      downloads: 2840,
      pages: 120,
      type: "pdf"
    },
    {
      title: "Computer Science Fundamentals",
      category: "bachelors",
      subject: "computer-science",
      description: "Introduction to programming, algorithms, and data structures for undergraduate students.",
      downloads: 1890,
      pages: 85,
      type: "pdf"
    },
    {
      title: "Biology Diagrams and Illustrations",
      category: "high-school",
      subject: "biology",
      description: "Collection of detailed biological diagrams and illustrations for high school students.",
      downloads: 1560,
      pages: 30,
      type: "pdf"
    },
    {
      title: "NEET Preparation Guide",
      category: "competitive",
      subject: "biology",
      description: "Comprehensive guide for NEET aspirants with important concepts and practice questions.",
      downloads: 3450,
      pages: 150,
      type: "pdf"
    },
    {
      title: "World History: Modern Era",
      category: "bachelors",
      subject: "history",
      description: "Detailed notes on world history covering major events from the 18th century onwards.",
      downloads: 920,
      pages: 110,
      type: "pdf"
    }
  ];
  
  const filteredMaterials = materials.filter(material => {
    const matchesCategory = selectedCategory === "all" || material.category === selectedCategory;
    const matchesSubject = selectedSubject === "all" || material.subject === selectedSubject;
    const matchesSearch = query === "" || material.title.toLowerCase().includes(query.toLowerCase());
    
    return matchesCategory && matchesSubject && matchesSearch;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Study Materials</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Access thousands of carefully crafted notes, guides and study materials to excel in your academic journey
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <div className="mb-8 relative">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    className="w-full pl-10 py-6 rounded-lg"
                    placeholder="Search for study materials..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  />
                </div>
                
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
                    <ul className="py-2">
                      {suggestions.map((suggestion, index) => (
                        <li 
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          onClick={() => {
                            setQuery(suggestion);
                            setShowSuggestions(false);
                          }}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="w-full md:w-1/2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Filter className="w-4 h-4 inline mr-1" /> Category
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Filter className="w-4 h-4 inline mr-1" /> Subject
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>{subject.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <Tabs defaultValue="grid" className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {filteredMaterials.length} Results
                  </h2>
                  <TabsList>
                    <TabsTrigger value="grid">Grid</TabsTrigger>
                    <TabsTrigger value="list">List</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="grid">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredMaterials.map((material, index) => (
                      <Card key={index} className="glass-card hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold mb-2 hover:text-edu-purple transition-colors">
                            <a href="#">{material.title}</a>
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                            {material.description}
                          </p>
                          <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                            <span>
                              <Download className="h-4 w-4 inline mr-1" />
                              {material.downloads} downloads
                            </span>
                            <span>
                              <FileText className="h-4 w-4 inline mr-1" />
                              {material.pages} pages
                            </span>
                          </div>
                          <Button className="w-full">
                            Download {material.type.toUpperCase()}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="list">
                  <div className="space-y-4">
                    {filteredMaterials.map((material, index) => (
                      <Card key={index} className="glass-card hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div className="md:w-2/3">
                              <h3 className="text-lg font-semibold mb-2 hover:text-edu-purple transition-colors">
                                <a href="#">{material.title}</a>
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                {material.description}
                              </p>
                              <div className="flex gap-4 text-sm text-gray-500">
                                <span>
                                  <Download className="h-4 w-4 inline mr-1" />
                                  {material.downloads} downloads
                                </span>
                                <span>
                                  <FileText className="h-4 w-4 inline mr-1" />
                                  {material.pages} pages
                                </span>
                              </div>
                            </div>
                            <div className="md:w-1/3 flex items-center justify-end mt-4 md:mt-0">
                              <Button>
                                Download {material.type.toUpperCase()}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              <Advertisement 
                network="google" 
                size="banner" 
                id="study-materials-inline-ad"
                className="my-8"
              />
              
              <div className="flex justify-center mt-8">
                <Button className="bg-edu-purple hover:bg-edu-indigo text-white px-6 py-2 rounded-full inline-flex items-center">
                  Load More
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/3">
              <div className="sticky top-24">
                <Card className="glass-card mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Popular Materials</h3>
                    <ul className="space-y-4">
                      <li>
                        <a href="#" className="flex items-start hover:text-edu-purple">
                          <BookOpen className="h-5 w-5 mt-0.5 mr-2 text-edu-purple" />
                          <div>
                            <h4 className="font-medium">Complete Physics Formula Sheet</h4>
                            <p className="text-sm text-gray-500">4,580 downloads</p>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-start hover:text-edu-purple">
                          <BookOpen className="h-5 w-5 mt-0.5 mr-2 text-edu-purple" />
                          <div>
                            <h4 className="font-medium">Organic Chemistry Reaction Guide</h4>
                            <p className="text-sm text-gray-500">3,920 downloads</p>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-start hover:text-edu-purple">
                          <BookOpen className="h-5 w-5 mt-0.5 mr-2 text-edu-purple" />
                          <div>
                            <h4 className="font-medium">Mathematics Problem Solving Techniques</h4>
                            <p className="text-sm text-gray-500">3,150 downloads</p>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Advertisement 
                  network="adsterra" 
                  size="sidebar" 
                  id="study-materials-sidebar-ad"
                  className="mb-6"
                />
                
                <Card className="glass-card">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      Can't find what you're looking for? Contact us and we'll help you locate the study material you need.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="/contact">Contact Support</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StudyMaterialsPage;

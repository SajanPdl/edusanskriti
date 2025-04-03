
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  BookText, 
  Plus, 
  Trash2, 
  Upload,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface StudyMaterial {
  id?: number;
  title: string;
  category: string;
  subject: string;
  description: string;
  detailedDescription: string;
  keyPoints: string[];
  importantFormulas: string[];
  chapters: string[];
  author: string;
  publishDate: string;
  fileSize: string;
  pages: number;
  fileType: string;
  language: string;
  pdfUrl: string;
}

const StudyMaterialEditor = () => {
  const [material, setMaterial] = useState<StudyMaterial>({
    title: '',
    category: 'High School',
    subject: '',
    description: '',
    detailedDescription: '',
    keyPoints: [''],
    importantFormulas: [''],
    chapters: [''],
    author: '',
    publishDate: new Date().toISOString().split('T')[0],
    fileSize: '',
    pages: 0,
    fileType: 'PDF',
    language: 'English',
    pdfUrl: '',
  });
  
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<StudyMaterial>({
    defaultValues: material
  });
  
  // Handlers for array fields (keyPoints, importantFormulas, chapters)
  const addArrayItem = (field: 'keyPoints' | 'importantFormulas' | 'chapters') => {
    setMaterial(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };
  
  const removeArrayItem = (field: 'keyPoints' | 'importantFormulas' | 'chapters', index: number) => {
    setMaterial(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };
  
  const updateArrayItem = (field: 'keyPoints' | 'importantFormulas' | 'chapters', index: number, value: string) => {
    setMaterial(prev => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = value;
      return {
        ...prev,
        [field]: updatedArray
      };
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMaterial(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setMaterial(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPdfFile(file);
      
      // Update file information
      setMaterial(prev => ({
        ...prev,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        fileType: file.type.split('/')[1].toUpperCase(),
        pdfUrl: URL.createObjectURL(file) // Temporary URL for preview
      }));
    }
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Validate form
    if (!material.title || !material.subject || !material.description) {
      toast.error('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Study material saved successfully!');
      setIsSubmitting(false);
      
      // In a real application, you would make an API call here to save the data
      console.log('Saved material:', material);
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookText className="h-6 w-6 text-edu-purple" />
          <h2 className="text-2xl font-bold">
            {material.id ? 'Edit Study Material' : 'Create New Study Material'}
          </h2>
        </div>
        <Button 
          onClick={handleSubmit}
          className="gap-2"
          disabled={isSubmitting}
        >
          <Save className="h-4 w-4" />
          Save Material
        </Button>
      </div>
      
      <Form {...form}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormItem>
                      <FormLabel htmlFor="title">Title*</FormLabel>
                      <Input 
                        id="title"
                        name="title"
                        value={material.title}
                        onChange={handleInputChange}
                        placeholder="e.g., Mathematics for Grade 10"
                      />
                    </FormItem>
                  </div>
                  
                  <div className="space-y-2">
                    <FormItem>
                      <FormLabel htmlFor="author">Author*</FormLabel>
                      <Input 
                        id="author"
                        name="author"
                        value={material.author}
                        onChange={handleInputChange}
                        placeholder="e.g., Dr. John Smith"
                      />
                    </FormItem>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormItem>
                      <FormLabel htmlFor="category">Category*</FormLabel>
                      <Select
                        value={material.category}
                        onValueChange={(value) => handleSelectChange('category', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="High School">High School</SelectItem>
                          <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                          <SelectItem value="Master's">Master's</SelectItem>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Medical">Medical</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  </div>
                  
                  <div className="space-y-2">
                    <FormItem>
                      <FormLabel htmlFor="subject">Subject*</FormLabel>
                      <Input 
                        id="subject"
                        name="subject"
                        value={material.subject}
                        onChange={handleInputChange}
                        placeholder="e.g., Mathematics, Physics, etc."
                      />
                    </FormItem>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <FormItem>
                    <FormLabel htmlFor="description">Short Description*</FormLabel>
                    <Textarea 
                      id="description"
                      name="description"
                      value={material.description}
                      onChange={handleInputChange}
                      placeholder="Brief description (100-150 characters)"
                      rows={2}
                    />
                  </FormItem>
                </div>
                
                <div className="space-y-2">
                  <FormItem>
                    <FormLabel htmlFor="detailedDescription">Detailed Description</FormLabel>
                    <Textarea 
                      id="detailedDescription"
                      name="detailedDescription"
                      value={material.detailedDescription}
                      onChange={handleInputChange}
                      placeholder="Comprehensive description of the material"
                      rows={6}
                    />
                  </FormItem>
                </div>
              </CardContent>
            </Card>
            
            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle>PDF Document</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
                  <Input
                    id="pdf-upload"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf"
                    className="hidden"
                  />
                  <label 
                    htmlFor="pdf-upload"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm font-medium">
                      {pdfFile ? pdfFile.name : 'Click to upload PDF file'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Maximum file size: 50MB
                    </p>
                  </label>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <FormItem>
                      <FormLabel htmlFor="fileSize">File Size</FormLabel>
                      <Input 
                        id="fileSize"
                        name="fileSize"
                        value={material.fileSize}
                        onChange={handleInputChange}
                        placeholder="e.g., 4.2 MB"
                        disabled={!!pdfFile}
                      />
                    </FormItem>
                  </div>
                  
                  <div className="space-y-2">
                    <FormItem>
                      <FormLabel htmlFor="pages">Pages</FormLabel>
                      <Input 
                        id="pages"
                        name="pages"
                        type="number"
                        value={material.pages.toString()}
                        onChange={handleInputChange}
                        placeholder="e.g., 42"
                      />
                    </FormItem>
                  </div>
                  
                  <div className="space-y-2">
                    <FormItem>
                      <FormLabel htmlFor="fileType">File Type</FormLabel>
                      <Input 
                        id="fileType"
                        name="fileType"
                        value={material.fileType}
                        onChange={handleInputChange}
                        placeholder="e.g., PDF"
                        disabled={!!pdfFile}
                      />
                    </FormItem>
                  </div>
                  
                  <div className="space-y-2">
                    <FormItem>
                      <FormLabel htmlFor="language">Language</FormLabel>
                      <Select
                        value={material.language}
                        onValueChange={(value) => handleSelectChange('language', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                          <SelectItem value="German">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Key Points */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Key Points Covered</span>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => addArrayItem('keyPoints')}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {material.keyPoints.map((point, index) => (
                  <div key={`key-point-${index}`} className="flex gap-2">
                    <Input 
                      value={point}
                      onChange={(e) => updateArrayItem('keyPoints', index, e.target.value)}
                      placeholder={`Key point ${index + 1}`}
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => removeArrayItem('keyPoints', index)}
                      disabled={material.keyPoints.length <= 1}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Important Formulas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Important Formulas</span>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => addArrayItem('importantFormulas')}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {material.importantFormulas.map((formula, index) => (
                  <div key={`formula-${index}`} className="flex gap-2">
                    <Input 
                      value={formula}
                      onChange={(e) => updateArrayItem('importantFormulas', index, e.target.value)}
                      placeholder={`Formula ${index + 1}`}
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => removeArrayItem('importantFormulas', index)}
                      disabled={material.importantFormulas.length <= 1}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Chapters & Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Chapters & Topics</span>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => addArrayItem('chapters')}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {material.chapters.map((chapter, index) => (
                  <div key={`chapter-${index}`} className="flex gap-2">
                    <Input 
                      value={chapter}
                      onChange={(e) => updateArrayItem('chapters', index, e.target.value)}
                      placeholder={`Chapter ${index + 1}`}
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => removeArrayItem('chapters', index)}
                      disabled={material.chapters.length <= 1}
                      className="flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          {/* Preview and Help */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded border border-gray-200 dark:border-gray-700 p-4 space-y-4">
                  <h3 className="font-bold">{material.title || 'Material Title'}</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>Category: {material.category}</p>
                    <p>Subject: {material.subject || 'Not specified'}</p>
                    <p>Author: {material.author || 'Not specified'}</p>
                  </div>
                  <p className="text-sm">{material.description || 'No description provided.'}</p>
                </div>
                
                {pdfFile && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">PDF Preview</h4>
                    <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                      <p className="text-sm text-gray-500">
                        PDF preview will be available after saving
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Help</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-3">
                  <p><strong>Required fields:</strong> Title, Subject, Category, and Description.</p>
                  <p><strong>Key Points:</strong> Add important concepts covered in the material.</p>
                  <p><strong>Formulas:</strong> Add mathematical or scientific formulas if applicable.</p>
                  <p><strong>Chapters:</strong> List main topics or sections of the material.</p>
                  <p className="text-edu-purple"><strong>Tip:</strong> Adding detailed descriptions and key points improves searchability and user engagement.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default StudyMaterialEditor;

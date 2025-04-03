
import { useState } from 'react';
import { Edit, Image, Link2, Bold, Italic, List, ListOrdered, Heading1, Heading2, AlignLeft, AlignCenter, AlignRight, Save, Trash2, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  featuredImage: string;
  status: 'draft' | 'published';
}

const BlogEditor = () => {
  const [post, setPost] = useState<BlogPost>({
    id: 1,
    title: '',
    content: '',
    excerpt: '',
    author: 'Admin',
    date: new Date().toISOString().split('T')[0],
    category: '',
    tags: [],
    featuredImage: '',
    status: 'draft'
  });
  
  const [tagInput, setTagInput] = useState('');
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost({...post, content: e.target.value});
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPost({...post, [name]: value});
  };
  
  const handleSaveDraft = () => {
    if (!post.title.trim()) {
      toast.error('Please add a title for your post');
      return;
    }
    
    // In a real app, this would save to a database
    toast.success('Draft saved successfully!');
  };
  
  const handlePublish = () => {
    if (!post.title.trim()) {
      toast.error('Please add a title for your post');
      return;
    }
    
    if (!post.content.trim()) {
      toast.error('Post content cannot be empty');
      return;
    }
    
    // In a real app, this would publish the post
    setPost({...post, status: 'published'});
    toast.success('Post published successfully!');
  };
  
  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!post.tags.includes(tagInput.trim())) {
        setPost({...post, tags: [...post.tags, tagInput.trim()]});
      }
      setTagInput('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setPost({...post, tags: post.tags.filter(tag => tag !== tagToRemove)});
  };
  
  const insertTextAtCursor = (textBefore: string, textAfter: string = '') => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const newText = 
      textarea.value.substring(0, start) + 
      textBefore + selectedText + textAfter + 
      textarea.value.substring(end);
    
    setPost({...post, content: newText});
    
    // Re-focus and set cursor position after the inserted text
    setTimeout(() => {
      textarea.focus();
      const newCursorPosition = start + textBefore.length + selectedText.length + textAfter.length;
      textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Blog Editor</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handlePublish}>
            <Eye className="h-4 w-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="editor">
        <TabsList className="mb-6">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor">
          <div className="mb-6">
            <Label htmlFor="title" className="block text-sm font-medium mb-2">Post Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter post title"
              value={post.title}
              onChange={handleInputChange}
              className="text-xl font-bold"
            />
          </div>
          
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-2 bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
              <Button type="button" variant="outline" size="sm" onClick={() => insertTextAtCursor('# ', '\n')}>
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => insertTextAtCursor('## ', '\n')}>
                <Heading2 className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => insertTextAtCursor('**', '**')}>
                <Bold className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => insertTextAtCursor('*', '*')}>
                <Italic className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => insertTextAtCursor('\n- ', '')}>
                <List className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => insertTextAtCursor('\n1. ', '')}>
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => insertTextAtCursor('[', '](url)')}>
                <Link2 className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => insertTextAtCursor('![alt text](', ')')}>
                <Image className="h-4 w-4" />
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => insertTextAtCursor('\n\n---\n\n')}>
                <AlignCenter className="h-4 w-4" />
              </Button>
            </div>
            
            <textarea
              id="content"
              name="content"
              value={post.content}
              onChange={handleContentChange}
              placeholder="Write your post content here... (Markdown supported)"
              className="w-full min-h-[400px] p-4 border rounded-md focus:ring-edu-purple focus:border-edu-purple dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            
            <div className="text-sm text-gray-500 mt-2">
              Markdown supported. You can use the toolbar or directly type markdown syntax.
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="excerpt" className="block text-sm font-medium mb-2">Excerpt</Label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={post.excerpt}
                onChange={(e) => setPost({...post, excerpt: e.target.value})}
                placeholder="Brief summary of your post"
                className="w-full p-2 border rounded-md focus:ring-edu-purple focus:border-edu-purple dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="featuredImage" className="block text-sm font-medium mb-2">Featured Image URL</Label>
              <Input
                id="featuredImage"
                name="featuredImage"
                value={post.featuredImage}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
              {post.featuredImage && (
                <div className="mt-2 relative w-full h-40 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                  <img 
                    src={post.featuredImage} 
                    alt="Featured" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="category" className="block text-sm font-medium mb-2">Category</Label>
              <select
                id="category"
                name="category"
                value={post.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-edu-purple focus:border-edu-purple dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select Category</option>
                <option value="Education">Education</option>
                <option value="Study Tips">Study Tips</option>
                <option value="Exam Preparation">Exam Preparation</option>
                <option value="Career Guidance">Career Guidance</option>
                <option value="Technology">Technology</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="tags" className="block text-sm font-medium mb-2">Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-1 text-gray-400 hover:text-red-500">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={addTag}
                placeholder="Add tag and press Enter"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="preview">
          <Card>
            <CardContent className="p-6">
              {post.featuredImage && (
                <div className="mb-6 aspect-video w-full overflow-hidden rounded-lg">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                </div>
              )}
              
              <div className="mb-4">
                <h1 className="text-3xl font-bold mb-2">{post.title || 'Untitled Post'}</h1>
                
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                  <span>By {post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                  {post.category && (
                    <>
                      <span>•</span>
                      <Badge variant="outline">{post.category}</Badge>
                    </>
                  )}
                </div>
                
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                {post.content ? (
                  <div>
                    {/* In a real app, we would render markdown here */}
                    <p className="whitespace-pre-wrap">{post.content}</p>
                  </div>
                ) : (
                  <div className="text-gray-500 italic">
                    Preview of your post will appear here. Start writing in the editor tab.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlogEditor;

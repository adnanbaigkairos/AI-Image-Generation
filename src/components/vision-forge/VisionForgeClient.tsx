// src/components/vision-forge/VisionForgeClient.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { handleEnhancePromptAction, handleGenerateImageAction, handleGenerateBatchImagesAction } from '@/app/actions';
import GeneratedImageDisplay from './GeneratedImageDisplay';
import LoadingSpinner from '@/components/core/LoadingSpinner';
import { Wand2, Image as ImageIcon, PlusCircle, MinusCircle } from 'lucide-react';

const promptEnhancerSchema = z.object({
  simplePrompt: z.string().min(5, { message: 'Prompt must be at least 5 characters.' }).max(200, { message: 'Prompt cannot exceed 200 characters.' }),
  preset: z.enum(['cinematic', 'abstract', 'futuristic']).optional(),
});

const imageGenerationSchema = z.object({
  style: z.enum(['photorealistic', 'anime', 'digital-art', 'cyberpunk', 'fantasy', '']).optional(),
  aspectRatio: z.enum(['1:1', '16:9', '4:3', '9:16', '3:4']).optional(),
  batchMode: z.boolean().default(false),
  batchCount: z.number().min(2).max(4).default(2),
});

type PromptEnhancerFormValues = z.infer<typeof promptEnhancerSchema>;
type ImageGenerationFormValues = z.infer<typeof imageGenerationSchema>;

const DEFAULT_STYLE_ITEM_VALUE = 'INTERNAL_DEFAULT_STYLE';

export default function VisionForgeClient() {
  const { toast } = useToast();
  const [enhancedPrompt, setEnhancedPrompt] = useState<string | null>(null);
  const [generatedImageUrls, setGeneratedImageUrls] = useState<string[]>([]);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const enhancerForm = useForm<PromptEnhancerFormValues>({
    resolver: zodResolver(promptEnhancerSchema),
    defaultValues: {
      simplePrompt: '',
      preset: undefined,
    },
  });

  const generatorForm = useForm<ImageGenerationFormValues>({
    resolver: zodResolver(imageGenerationSchema),
    defaultValues: {
      style: '', 
      aspectRatio: '1:1',
      batchMode: false,
      batchCount: 2,
    },
  });

  const watchBatchMode = generatorForm.watch('batchMode');

  const handleEnhanceSubmit = async (values: PromptEnhancerFormValues) => {
    setIsEnhancing(true);
    setGeneratedImageUrls([]); 
    try {
      const result = await handleEnhancePromptAction(values);
      setEnhancedPrompt(result.enhancedPrompt);
      toast({ title: 'Prompt Enhanced!', description: 'Your prompt is now ready for image generation.' });
    } catch (error: any) {
      toast({ title: 'Enhancement Failed', description: error.message, variant: 'destructive' });
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleGenerateSubmit = async (values: ImageGenerationFormValues) => {
    if (!enhancedPrompt) {
      toast({ title: 'No Prompt', description: 'Please enhance a prompt first.', variant: 'destructive' });
      return;
    }
    setIsGenerating(true);
    setGeneratedImageUrls([]);
    try {
      let result;
      const basePrompt = `${enhancedPrompt}${values.style ? `, style: ${values.style}` : ''}${values.aspectRatio ? `, aspect ratio: ${values.aspectRatio}` : ''}`;

      if (values.batchMode) {
        result = await handleGenerateBatchImagesAction({ prompt: basePrompt, count: values.batchCount });
        setGeneratedImageUrls(result.images);
      } else {
        result = await handleGenerateImageAction({ enhancedPrompt: basePrompt });
        setGeneratedImageUrls([result.imageUrl]);
      }
      toast({ title: 'Image(s) Generated!', description: 'Check out your new creations.' });
    } catch (error: any) {
      toast({ title: 'Generation Failed', description: error.message, variant: 'destructive' });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 space-y-12">
      <Card className="shadow-xl shadow-primary/10">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl flex items-center gap-2">
            <Wand2 className="h-8 w-8 text-primary" />
            Step 1: Enhance Your Prompt
          </CardTitle>
          <CardDescription>Turn your simple idea into a vivid, detailed prompt ready for AI magic.</CardDescription>
        </CardHeader>
        <Form {...enhancerForm}>
          <form onSubmit={enhancerForm.handleSubmit(handleEnhanceSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={enhancerForm.control}
                name="simplePrompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Your Simple Idea</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., a cat astronaut on the moon" {...field} rows={3} />
                    </FormControl>
                    <FormDescription>Keep it short and sweet. We&apos;ll make it shine!</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={enhancerForm.control}
                name="preset"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Enhancement Preset (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a preset to guide enhancement" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cinematic">Make it Cinematic</SelectItem>
                        <SelectItem value="abstract">More Abstract</SelectItem>
                        <SelectItem value="futuristic">Add Futuristic Elements</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isEnhancing} className="btn-glow w-full sm:w-auto">
                {isEnhancing ? <LoadingSpinner text="Enhancing..." /> : <> <Wand2 className="mr-2 h-5 w-5" /> Enhance Prompt </>}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {isEnhancing && (
        <div className="flex justify-center">
           <LoadingSpinner text="Crafting the perfect prompt..." size={32} />
        </div>
      )}

      {enhancedPrompt && !isEnhancing && (
        <Card className="shadow-xl shadow-accent/10">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl flex items-center gap-2">
              <ImageIcon className="h-8 w-8 text-accent" />
              Step 2: Generate Your Image
            </CardTitle>
            <div className="mt-2 p-4 bg-muted/50 rounded-md border border-border">
              <p className="text-sm font-semibold text-foreground/80 mb-1">Enhanced Prompt:</p>
              <p className="text-foreground italic">{enhancedPrompt}</p>
            </div>
          </CardHeader>
          <Form {...generatorForm}>
            <form onSubmit={generatorForm.handleSubmit(handleGenerateSubmit)}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={generatorForm.control}
                    name="style"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">Image Style</FormLabel>
                        <Select
                          onValueChange={(selectedValue) => {
                            field.onChange(selectedValue === DEFAULT_STYLE_ITEM_VALUE ? '' : selectedValue);
                          }}
                          value={field.value === '' ? DEFAULT_STYLE_ITEM_VALUE : field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select image style (optional)" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={DEFAULT_STYLE_ITEM_VALUE}>Default</SelectItem>
                            <SelectItem value="photorealistic">Photorealistic</SelectItem>
                            <SelectItem value="anime">Anime</SelectItem>
                            <SelectItem value="digital-art">Digital Art</SelectItem>
                            <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                            <SelectItem value="fantasy">Fantasy</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={generatorForm.control}
                    name="aspectRatio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">Aspect Ratio</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select aspect ratio" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1:1">Square (1:1)</SelectItem>
                            <SelectItem value="16:9">Landscape (16:9)</SelectItem>
                            <SelectItem value="4:3">Standard (4:3)</SelectItem>
                            <SelectItem value="9:16">Portrait (9:16)</SelectItem>
                            <SelectItem value="3:4">Portrait (3:4)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={generatorForm.control}
                  name="batchMode"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel className="text-lg">Batch Mode</FormLabel>
                        <FormDescription>Generate multiple image variations at once.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {watchBatchMode && (
                  <FormField
                    control={generatorForm.control}
                    name="batchCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg">Number of Images (2-4)</FormLabel>
                        <div className="flex items-center gap-2">
                           <Button type="button" variant="outline" size="icon" onClick={() => field.onChange(Math.max(2, field.value - 1))} disabled={field.value <= 2}>
                             <MinusCircle className="h-4 w-4" />
                           </Button>
                           <Input {...field} type="number" readOnly className="w-16 text-center" />
                           <Button type="button" variant="outline" size="icon" onClick={() => field.onChange(Math.min(4, field.value + 1))} disabled={field.value >= 4}>
                             <PlusCircle className="h-4 w-4" />
                           </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isGenerating} className="btn-glow w-full sm:w-auto">
                  {isGenerating ? <LoadingSpinner text="Generating..." /> : <> <ImageIcon className="mr-2 h-5 w-5" /> Generate Image(s) </>}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      )}
      
      {isGenerating && (
         <div className="flex justify-center py-10">
           <LoadingSpinner text="Conjuring pixels..." size={48} />
        </div>
      )}

      {!isGenerating && generatedImageUrls.length > 0 && (
        <GeneratedImageDisplay imageUrls={generatedImageUrls} prompt={enhancedPrompt || ''} />
      )}
    </div>
  );
}

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useGame } from '@/context/GameContext';

interface PlayerNameFormData {
  name: string;
}

export const PlayerNameForm = () => {
  const { updatePlayerState } = useGame();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PlayerNameFormData>({
    defaultValues: {
      name: ''
    }
  });

  const onSubmit = async (data: PlayerNameFormData) => {
    if (!data.name.trim()) return;
    
    setIsSubmitting(true);
    updatePlayerState({ name: data.name.trim() });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="text-6xl">⚔️</div>
          <h1 className="text-3xl font-bold">Welcome, Hero!</h1>
          <p className="text-muted-foreground">
            Before you begin your adventure, tell us your name
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: 'Please enter your name',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters'
                },
                maxLength: {
                  value: 20,
                  message: 'Name must be less than 20 characters'
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your hero name..." 
                      {...field}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Starting Adventure...' : 'Begin Adventure'}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};
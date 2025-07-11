import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BattleLogProps {
  messages: string[];
}

export const BattleLog = ({ messages }: BattleLogProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="p-3">
      <h3 className="font-semibold mb-2 text-sm">Battle Log</h3>
      <ScrollArea className="h-24" ref={scrollRef}>
        <div className="space-y-1">
          {messages.map((message, index) => (
            <div key={index} className="text-xs text-muted-foreground animate-fade-in">
              {message}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
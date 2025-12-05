import { InventoryItem } from '@/types/game';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface InventoryProps {
  inventory: InventoryItem[];
  onUseItem: (item: InventoryItem) => void;
  disabled?: boolean;
}

export const Inventory = ({ inventory, onUseItem, disabled = false }: InventoryProps) => {
  const usableItems = inventory.filter(item => item.usableInBattle);
  const equipmentItems = inventory.filter(item => !item.usableInBattle);

  if (inventory.length === 0) {
    return (
      <Card className="p-3">
        <h3 className="font-semibold text-sm mb-1">🎒 Инвентарь</h3>
        <p className="text-xs text-muted-foreground">Пусто</p>
      </Card>
    );
  }

  return (
    <Card className="p-3">
      <h3 className="font-semibold text-sm mb-2">🎒 Инвентарь</h3>
      
      {usableItems.length > 0 && (
        <div className="mb-2">
          <div className="grid grid-cols-2 gap-2">
            {usableItems.map((item) => (
              <div key={item.inventoryId} className="flex items-center justify-between p-2 bg-muted rounded text-xs">
                <div className="flex items-center space-x-1">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-6 h-6 object-cover rounded"
                  />
                  <div>
                    <div className="font-medium truncate">{item.name}</div>
                    <div className="text-muted-foreground">x{item.quantity}</div>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => onUseItem(item)}
                  disabled={disabled}
                >
                  ✓
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {equipmentItems.length > 0 && (
        <div>
          {usableItems.length > 0 && <Separator className="my-2" />}
          <div className="grid grid-cols-2 gap-2">
            {equipmentItems.map((item) => (
              <div key={item.inventoryId} className="flex items-center p-2 bg-muted rounded text-xs">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-6 h-6 object-cover rounded mr-1"
                />
                <div>
                  <div className="font-medium truncate">{item.name}</div>
                  <div className="text-muted-foreground">+{item.effect.value} {item.effect.stat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
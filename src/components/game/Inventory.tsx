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
      <Card className="p-4">
        <h3 className="font-semibold mb-2">Inventory</h3>
        <p className="text-sm text-muted-foreground">Your inventory is empty.</p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-3">Inventory</h3>
      
      {usableItems.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Battle Items</h4>
          <div className="space-y-2">
            {usableItems.map((item) => (
              <div key={item.inventoryId} className="flex items-center justify-between p-2 bg-muted rounded">
                <div className="flex items-center space-x-2">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-8 h-8 object-cover rounded"
                  />
                  <div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.effect.stat === 'health' ? 'Restores' : 'Increases'} {item.effect.stat} by {item.effect.value}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">x{item.quantity}</Badge>
                  <Button
                    size="sm"
                    onClick={() => onUseItem(item)}
                    disabled={disabled}
                  >
                    Use
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {equipmentItems.length > 0 && (
        <div>
          {usableItems.length > 0 && <Separator className="my-3" />}
          <h4 className="text-sm font-medium mb-2">Equipment</h4>
          <div className="space-y-2">
            {equipmentItems.map((item) => (
              <div key={item.inventoryId} className="flex items-center justify-between p-2 bg-muted rounded">
                <div className="flex items-center space-x-2">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-8 h-8 object-cover rounded"
                  />
                  <div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">
                      +{item.effect.value} {item.effect.stat}
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">x{item.quantity}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
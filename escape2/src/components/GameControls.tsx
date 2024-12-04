'use client';

import { useGame } from '@/context/GameContext';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Item } from '@/types/game';
import { rooms } from '@/data/gameData';
import { itemCombinations } from '@/data/puzzleData';

function ItemTooltip({ item }: { item: Item }) {
  if (!item) return null;
  
  return (
    <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900/95 rounded-lg border border-slate-700/50 text-xs shadow-xl opacity-0 z-50 group-hover:opacity-100 transition-opacity">
      <div className="font-medium text-slate-200 mb-1">{item.name}</div>
      <div className="text-slate-400">{item.description}</div>
      {item.category && (
        <div className="mt-1 text-slate-500">Type: {item.category}</div>
      )}
      {(item.healthEffect || item.sanityEffect || item.energyEffect || item.energyCost) && (
        <div className="mt-1 space-y-0.5">
          {item.healthEffect && (
            <div className={item.healthEffect > 0 ? "text-emerald-400" : "text-red-400"}>
              Health: {item.healthEffect > 0 ? '+' : ''}{item.healthEffect}
            </div>
          )}
          {item.sanityEffect && (
            <div className={item.sanityEffect > 0 ? "text-emerald-400" : "text-red-400"}>
              Sanity: {item.sanityEffect > 0 ? '+' : ''}{item.sanityEffect}
            </div>
          )}
          {item.energyEffect && (
            <div className={item.energyEffect > 0 ? "text-emerald-400" : "text-red-400"}>
              Energy: {item.energyEffect > 0 ? '+' : ''}{item.energyEffect}
            </div>
          )}
          {item.energyCost && (
            <div className="text-amber-400">
              Energy Cost: {item.energyCost}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function RoomItem({ item, onAction, selectedItem }: { 
  item: Item; 
  onAction: (itemId: string, action: 'examine' | 'take') => void;
  selectedItem: Item | null;
}) {
  if (!item || !item.id) return null;

  const canCombine = selectedItem && selectedItem.id !== item.id && (
    itemCombinations?.some(combo => 
      (combo?.itemIds?.[0] === selectedItem.id && combo?.itemIds?.[1] === item.id) ||
      (combo?.itemIds?.[1] === selectedItem.id && combo?.itemIds?.[0] === item.id)
    )
  );

  return (
    <motion.div
      key={`room-item-${item.id}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="group relative"
    >
      <div className={`flex items-center gap-3 p-2 rounded-lg border transition-colors duration-200
        ${selectedItem?.id === item.id 
          ? "bg-amber-500/20 border-amber-500/40" 
          : canCombine
            ? "bg-amber-500/10 border-amber-500/30"
            : "bg-slate-800/30 border-slate-700/50"}`}
      >
        <span className="text-xl" role="img" aria-label={item.name}>
          {item.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-slate-200 truncate">{item.name}</div>
          <div className="text-xs text-slate-400 truncate">{item.description}</div>
        </div>
        <div className="flex gap-1.5 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 bg-slate-900/50 hover:bg-slate-900/70"
            onClick={() => onAction(item.id, 'examine')}
          >
            Look
          </Button>
          {item.canPickup && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 bg-slate-900/50 hover:bg-slate-900/70"
              onClick={() => onAction(item.id, 'take')}
            >
              Take
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function InventoryItem({ item, onAction, onSelect, selectedItem }: { 
  item: Item; 
  onAction: (itemId: string, action: 'examine') => void;
  onSelect: (itemId: string) => void;
  selectedItem: Item | null;
}) {
  const canCombine = selectedItem && selectedItem.id !== item.id && (
    itemCombinations?.some(combo => 
      (combo?.itemIds?.[0] === selectedItem.id && combo?.itemIds?.[1] === item.id) ||
      (combo?.itemIds?.[1] === selectedItem.id && combo?.itemIds?.[0] === item.id)
    )
  );

  return (
    <motion.div
      key={`inventory-item-${item.id}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="group relative"
    >
      <div className={`flex items-center gap-3 p-2 rounded-lg border transition-colors duration-200
        ${selectedItem?.id === item.id 
          ? "bg-amber-500/20 border-amber-500/40" 
          : canCombine
            ? "bg-amber-500/10 border-amber-500/30"
            : "bg-slate-800/30 border-slate-700/50"}`}
      >
        <span className="text-xl" role="img" aria-label={item?.name || 'Unknown item'}>
          {item.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-slate-200 truncate">{item.name}</div>
          <div className="text-xs text-slate-400 truncate">{item.description}</div>
        </div>
        <div className="flex gap-1.5 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 bg-slate-900/50 hover:bg-slate-900/70"
            onClick={() => onAction(item.id, 'examine')}
          >
            Look
          </Button>
          {selectedItem ? (
            selectedItem.id === item.id ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 bg-amber-500/20 hover:bg-amber-500/30"
                onClick={() => onSelect(item.id)}
              >
                Deselect
              </Button>
            ) : canCombine && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 bg-amber-500/20 hover:bg-amber-500/30"
                onClick={() => onSelect(item.id)}
              >
                Combine
              </Button>
            )
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 bg-slate-900/50 hover:bg-slate-900/70"
              onClick={() => onSelect(item.id)}
            >
              Select
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function GameControls() {
  const { state, actions } = useGame();
  const { currentRoom, inventory, selectedItem } = state;

  const handleItemClick = (itemId: string) => {
    if (selectedItem) {
      // If we have a selected item and click it again, deselect it
      if (selectedItem.id === itemId) {
        actions.clearSelectedItem();
      } else {
        // Try to combine with the clicked item
        actions.combineItems(selectedItem.id, itemId);
      }
    } else {
      // Select the clicked item
      const item = inventory.find(i => i.id === itemId) || 
                  currentRoom.items?.find(i => i.id === itemId);
      if (item) {
        actions.selectItem(item);
      }
    }
  };

  const handleItemAction = (itemId: string, action: 'examine' | 'take') => {
    const item = inventory.find(i => i.id === itemId) || 
                currentRoom.items?.find(i => i.id === itemId);
    
    if (!item) return;

    // Check energy cost
    const energyCost = action === 'examine' ? 5 : item.energyCost || 10;
    if (state.stats.energy < energyCost) {
      actions.setMessage("You're too exhausted for that action...");
      return;
    }

    switch (action) {
      case 'examine':
        actions.examineItem(itemId);
        break;
      case 'take':
        actions.takeItem(itemId);
        break;
    }
  };

  // Ensure currentRoom and its items exist
  if (!currentRoom || !Array.isArray(currentRoom.items)) {
    return null;
  }

  return (
    <div className="p-4 space-y-4">
      {/* Navigation */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-slate-200">Navigation</div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(currentRoom.exits || {}).map(([direction, roomId]) => {
            if (!roomId || roomId === currentRoom.id) return null;
            const targetRoom = rooms[roomId as keyof typeof rooms];
            if (!targetRoom) return null;
            
            return (
              <Button
                key={direction}
                variant="secondary"
                size="sm"
                className="bg-slate-900/50 hover:bg-slate-900/70 border border-slate-700/50"
                onClick={() => actions.move(direction)}
              >
                {targetRoom.name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Room Items */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-slate-200">Items in Room</div>
        <div className="space-y-1.5">
          {currentRoom.items.length > 0 ? (
            currentRoom.items.filter(item => item && item.id).map((item) => (
              <RoomItem
                key={`room-item-${item.id}`}
                item={item}
                selectedItem={selectedItem}
                onAction={handleItemAction}
              />
            ))
          ) : (
            <div className="text-sm text-slate-500">No items in this room.</div>
          )}
        </div>
      </div>

      {/* Inventory */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-slate-200">Inventory</div>
        <div className="space-y-1.5">
          {inventory.length > 0 ? (
            inventory.filter(item => item && item.id).map((item) => (
              <InventoryItem
                key={`inventory-item-${item.id}`}
                item={item}
                selectedItem={selectedItem}
                onAction={handleItemAction}
                onSelect={handleItemClick}
              />
            ))
          ) : (
            <div className="text-sm text-slate-500">Your inventory is empty.</div>
          )}
        </div>
      </div>
    </div>
  );
} 
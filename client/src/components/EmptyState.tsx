import { Apple } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddItem: () => void;
}

export function EmptyState({ onAddItem }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center" data-testid="empty-state">
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <Apple className="w-12 h-12 text-primary" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">No Items Yet</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Start tracking your food items to reduce waste and never let anything expire again.
      </p>
      <Button onClick={onAddItem} size="lg" data-testid="button-get-started">
        Add Your First Item
      </Button>
    </div>
  );
}

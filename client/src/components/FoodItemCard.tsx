import { Item, getExpirationStatus, getTimeRemaining } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Apple, Milk, Beef, Package, Snowflake, HelpCircle, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface FoodItemCardProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

const getCategoryIcon = (category: string) => {
  const iconClass = "w-5 h-5";
  switch (category) {
    case "Produce":
      return <Apple className={iconClass} />;
    case "Dairy":
      return <Milk className={iconClass} />;
    case "Meat":
      return <Beef className={iconClass} />;
    case "Pantry":
      return <Package className={iconClass} />;
    case "Frozen":
      return <Snowflake className={iconClass} />;
    default:
      return <HelpCircle className={iconClass} />;
  }
};

export function FoodItemCard({ item, onEdit, onDelete }: FoodItemCardProps) {
  const status = getExpirationStatus(item.expirationDate);
  const timeRemaining = getTimeRemaining(item.expirationDate);
  
  const statusColors = {
    fresh: "border-l-expiration-fresh",
    soon: "border-l-expiration-soon",
    urgent: "border-l-expiration-urgent",
    expired: "border-l-expiration-expired",
  };

  const statusBadgeColors = {
    fresh: "bg-expiration-fresh/10 text-expiration-fresh border-expiration-fresh/20",
    soon: "bg-expiration-soon/10 text-expiration-soon border-expiration-soon/20",
    urgent: "bg-expiration-urgent/10 text-expiration-urgent border-expiration-urgent/20",
    expired: "bg-expiration-expired/10 text-expiration-expired border-expiration-expired/20",
  };

  return (
    <Card 
      className={`p-4 border-l-4 ${statusColors[status]} hover-elevate overflow-visible`}
      data-testid={`card-item-${item.id}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0 text-muted-foreground mt-1">
            {getCategoryIcon(item.category)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground mb-1 truncate" data-testid={`text-item-name-${item.id}`}>
              {item.name}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs" data-testid={`badge-category-${item.id}`}>
                {item.category}
              </Badge>
              <Badge 
                variant="outline" 
                className={`text-xs border ${statusBadgeColors[status]}`}
                data-testid={`badge-status-${item.id}`}
              >
                {timeRemaining}
              </Badge>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p data-testid={`text-purchase-date-${item.id}`}>
                Purchased: {format(new Date(item.purchaseDate), "MMM d, yyyy")}
              </p>
              <p data-testid={`text-expiration-date-${item.id}`}>
                Expires: {format(new Date(item.expirationDate), "MMM d, yyyy")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-shrink-0">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onEdit(item)}
            data-testid={`button-edit-${item.id}`}
            aria-label="Edit item"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete(item.id)}
            data-testid={`button-delete-${item.id}`}
            aria-label="Delete item"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

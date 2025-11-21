import { CATEGORIES } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

interface FilterBarProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  sortBy: "expiration" | "name" | "category";
  onSortChange: (sort: "expiration" | "name" | "category") => void;
}

export function FilterBar({ selectedCategory, onCategoryChange, sortBy, onSortChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex-1 min-w-[200px]">
        <Select
          value={selectedCategory || "all"}
          onValueChange={(value) => onCategoryChange(value === "all" ? null : value)}
        >
          <SelectTrigger data-testid="select-filter-category">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat} data-testid={`filter-option-${cat.toLowerCase()}`}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger data-testid="select-sort-by">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expiration" data-testid="sort-option-expiration">Expiring Soonest</SelectItem>
            <SelectItem value="name" data-testid="sort-option-name">Name (A-Z)</SelectItem>
            <SelectItem value="category" data-testid="sort-option-category">Category</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectedCategory && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => onCategoryChange(null)}
          data-testid="button-clear-filter"
          aria-label="Clear filter"
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

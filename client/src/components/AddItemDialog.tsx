import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertItemSchema, CATEGORIES, SHELF_LIFE_DEFAULTS, type Category } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { format } from "date-fns";
import { z } from "zod";

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  isPending?: boolean;
}

const formSchema = insertItemSchema.extend({
  purchaseDate: z.string().min(1, "Purchase date is required"),
  expirationDate: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function AddItemDialog({ open, onOpenChange, onSubmit, isPending }: AddItemDialogProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "Other",
      purchaseDate: format(new Date(), "yyyy-MM-dd"),
      expirationDate: "",
      barcode: "",
    },
  });

  const calculateExpiration = (category: Category, purchaseDate: string) => {
    if (!purchaseDate) return "";
    const purchase = new Date(purchaseDate);
    const daysToAdd = SHELF_LIFE_DEFAULTS[category];
    const expiration = new Date(purchase);
    expiration.setDate(expiration.getDate() + daysToAdd);
    return format(expiration, "yyyy-MM-dd");
  };

  const handleCategoryChange = (category: Category) => {
    form.setValue("category", category);
    const purchaseDate = form.getValues("purchaseDate");
    if (purchaseDate) {
      const calculatedExpiration = calculateExpiration(category, purchaseDate);
      form.setValue("expirationDate", calculatedExpiration);
    }
  };

  const handlePurchaseDateChange = (date: string) => {
    form.setValue("purchaseDate", date);
    const category = form.getValues("category") as Category;
    const calculatedExpiration = calculateExpiration(category, date);
    form.setValue("expirationDate", calculatedExpiration);
  };

  const handleFormSubmit = (data: FormData) => {
    const submitData = {
      ...data,
      purchaseDate: new Date(data.purchaseDate).toISOString(),
      expirationDate: new Date(data.expirationDate || data.purchaseDate).toISOString(),
    };
    onSubmit(submitData);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" data-testid="dialog-add-item">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add Food Item</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Milk, Strawberries, Chicken Breast"
                      {...field}
                      data-testid="input-item-name"
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={handleCategoryChange}
                    defaultValue={field.value}
                    data-testid="select-category"
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat} data-testid={`select-item-${cat.toLowerCase()}`}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="purchaseDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchase Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        onChange={(e) => handlePurchaseDateChange(e.target.value)}
                        data-testid="input-purchase-date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expirationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiration Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        data-testid="input-expiration-date"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="barcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Barcode (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Scan or enter barcode"
                      {...field}
                      data-testid="input-barcode"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  onOpenChange(false);
                }}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                data-testid="button-save-item"
              >
                {isPending ? "Saving..." : "Save Item"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

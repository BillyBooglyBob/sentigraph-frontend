"use client";

import pluralize from "pluralize";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  selector: z.string().min(1, {
    message: "Name is required",
  }),
});

interface SelectorProps {
  label: string;
  selectors: string[];
  limit?: number;
  handleSelectorChange: (
    selectedOrUpdater: string[] | ((prev: string[]) => string[])
  ) => void;
}

const Selector = ({
  label,
  selectors,
  limit,
  handleSelectorChange,
}: SelectorProps) => {
  const pluralLabel = pluralize(label);

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selector: "",
    },
  });

  // Handle delete selector
  const handleDeleteSelector = (selector: string) => {
    // Update the selectors state
    handleSelectorChange((prev: string[]) =>
      prev.filter((item) => item !== selector)
    );

    toast(`${label} deleted successfully`, {
      action: {
        label: "Close",
        onClick: () => toast.dismiss(),
      },
    });
  };

  // Handle form submission
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    // If selector already exists, show error
    if (selectors.includes(data.selector)) {
      toast.error(`${label} already exists`);
    } else if (limit && selectors.length >= limit) {
      // If there is a limit to the no. of selectors and
      // the limit is reached - show error
      toast.error(`You can only add up to ${limit} ${pluralLabel}`);
    } else {
      // Add the new selector to the list
      handleSelectorChange((prev: string[]) => [...prev, data.selector]);

      toast(`${label} added successfully`, {
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
    }

    // Reset the form
    form.reset();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="capitalize w-28">
          {pluralLabel}
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Manage {pluralLabel}</SheetTitle>
          <SheetDescription>
            Make changes to the {label} settings here. Click save when you are
            done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="px-5 flex gap-3 items-center justify-between"
          >
            <FormField
              control={form.control}
              name="selector"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    {label}
                  </FormLabel>
                  <FormControl>
                    <div className="flex justify-between gap-3">
                      <Input
                        className="flex bg-slate-100 dark:bg-slate-500 border-0
                      focus-visible:ring-0 text-black dark:text-white
                      focus-visible:ring-offset-0"
                        placeholder={`Enter the ${label} name`}
                        {...field}
                      />
                      <Button className="flex dark:bg-slate-800 dark:text-white">
                        Add {label}
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs text-zinc-500 dark:text-white">
                    This is the {label} you're adding.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <ScrollArea className="mx-4 rounded-md border dark:border-slate-700 h-[70%]">
          {selectors.map((selector, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-5 py-2"
            >
              <div className="w-full flex items-center justify-between gap-2">
                <Label className="text-sm font-bold text-zinc-500 dark:text-white">
                  {selector}
                </Label>
                <Button onClick={() => handleDeleteSelector(selector)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default Selector;

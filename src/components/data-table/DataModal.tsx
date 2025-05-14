"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DataModalProps {
  title: string; // Title of the modal
  description: string; // Description of the modal
  ModalForm: React.FC; // Flexible form component
}

const DataModal = ({ ModalForm, title, description }: DataModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <ModalForm />
      </DialogContent>
    </Dialog>
  );
};

export default DataModal;

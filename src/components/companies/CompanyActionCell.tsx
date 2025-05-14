"use client";

import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Company } from "@/types/company";
import { useRemoveCompany } from "@/hooks/useCompanies";
import { useAppSelector } from "@/redux/hook";

interface Props {
  company: Company;
}

export default function CompanyActionsCell({ company }: Props) {
  const router = useRouter();
  const userEmail = useAppSelector((state) => state.user.email);
  const removeCompany = useRemoveCompany(userEmail);

  function handleRemove(id: string) {
    removeCompany.mutate(id);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 focus:outline-none focus:ring-0"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => router.push(`/companies/${company.name}`)}
        >
          View Company
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleRemove(company.id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Role } from "@/types/role"
import { useState } from 'react'

const roles = [
  {
    label: 'Viewer',
    description: 'Can view and comment.',
    value: 'viewer'
  },
  {
    label: 'Developer',
    description: 'Can view, comment and edit.',
    value: 'developer'
  },
  {
    label: 'Billing',
    description: 'Can view, comment and manage billing.',
    value: 'billing'
  },
  {
    label: 'Owner',
    description: 'Admin-level access to all resources.',
    value: 'owner'
  },
]

type Props = {
  value: Role;
  setValue: (newUser: Role) => void;
}

export function TeamCombobox({ value, setValue }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
        >
          {value
            ? roles.find((role) => role.value === value)?.label
            : "Select role..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search role..." />
          <CommandEmpty>No role.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {roles.map((role) => (
                <CommandItem
                  key={role.value}
                  value={role.value}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue as Role);
                    setOpen(false)
                  }}
                >
                  <div className="flex-1 overflow-x-hidden">
                    <p className="truncate">{role.label}</p>
                    <p className="truncate text-sm text-muted-foreground">{role.description}</p>
                  </div>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === role.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
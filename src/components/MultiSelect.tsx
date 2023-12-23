"use client";
import { CheckIcon } from "lucide-react";
import { title } from "process";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";

import { Separator } from "@/components/ui/separator";
type Props = {
	title: string;
	options: {
		label: string;
		value: string;
		icon?: React.ComponentType<{ className?: string }>;
	}[];
	setVal: (val: string[]) => void;
};

const MultiSelect = (props: Props) => {
	const [filterValue, setFilterValue] = useState<string[]>([]);
	const filterVal = new Set(filterValue as string[]);
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="h-8 border-dashed self-center"
				>
					<PlusCircledIcon className="mr-2 h-4 w-4" />
					{props.title}
					{filterVal?.size > 0 && (
						<>
							<Separator
								orientation="vertical"
								className="mx-2 h-4"
							/>
							<Badge
								variant="secondary"
								className="rounded-sm px-1 font-normal lg:hidden"
							>
								{filterVal.size}
							</Badge>
							<div className="hidden space-x-1 lg:flex">
								{filterVal.size > 4 ? (
									<Badge
										variant="secondary"
										className="rounded-sm px-1 font-normal"
									>
										{filterVal.size} selected
									</Badge>
								) : (
									props.options
										.filter((option) =>
											filterVal.has(option.value)
										)
										.map((option) => (
											<Badge
												variant="secondary"
												key={option.value}
												className="rounded-sm px-1 font-normal"
											>
												{option.label}
											</Badge>
										))
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0" align="start">
				<Command>
					<CommandInput placeholder={props.title} />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{props.options.map((option) => {
								const isSelected = filterVal.has(option.value);
								return (
									<CommandItem
										key={option.value}
										onSelect={() => {
											if (isSelected) {
												filterVal.delete(option.value);
											} else {
												filterVal.add(option.value);
											}
											const filterValues =
												Array.from(filterVal);
											setFilterValue(
												filterValues.length
													? filterValues
													: []
											);
											props.setVal(filterValues)
										}}
									>
										<div
											className={cn(
												"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
												isSelected
													? "bg-primary text-primary-foreground"
													: "opacity-50 [&_svg]:invisible"
											)}
										>
											<CheckIcon
												className={cn("h-4 w-4")}
											/>
										</div>
										{option.icon && (
											<option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
										)}
										<span>{option.label}</span>
									</CommandItem>
								);
							})}
						</CommandGroup>
						{filterVal.size > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={() => setFilterValue}
										className="justify-center text-center"
									>
										Clear filters
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default MultiSelect;
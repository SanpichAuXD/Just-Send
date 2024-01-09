"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import CompanyBox from "@/components/company/home/CompanyBox";
import { redirect } from "next/navigation";

export default function Home() {
	return redirect("/chooserole");
}

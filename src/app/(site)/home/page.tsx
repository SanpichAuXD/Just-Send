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
import { useState } from "react";
import MultiSelect from "@/components/MultiSelect";

export default function Home() {
	const [role, setRole] = useState<string[]>([]);
	const roleOption = [
		{
		  value: "Manager",
		  label: "Manager",
		},
		{
		  value: "HR",
		  label: "HR",
		},
		{
		  value: "Employee",
		  label: "Employee",
		},
		{
		  value: "Supervisor",
		  label: "Supervisor",
		},
	  ];
	return (
		<div className="flex-1 p-10  h-screen  bg-green-400">
			<div className="flex flex-wrap h-full justify-center content-center items-center">
				<CompanyBox name={"Google"} logo={"https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png"} 
				position={[
					"UI Designer",
					"Product Manager",
					"Software Engineer",
				]} status={"OPEN"} 
				desc={`					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nihil, consequatur temporibus earum id esse, quasi nam dicta dolorem dolore autem nisi iste maiores, veniam error. Esse a, numquam illum recusandae libero nisi doloribus sit praesentium quis placeat. Aliquid natus corporis esse ut. Dolores molestias sunt aut eos reprehenderit quod?
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nihil, consequatur temporibus earum id esse, quasi nam dicta dolorem dolore autem nisi iste maiores, veniam error. Esse a, numquam illum recusandae libero nisi doloribus sit praesentium quis placeat. Aliquid natus corporis esse ut. Dolores molestias sunt aut eos reprehenderit quod?
				`} />
				<CompanyBox name={"Google"} logo={"https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png"} 
				position={[
					"UI Designer",
					"Product Manager",
					"Software Engineer",
				]} status={"OPEN"} 
				desc={`					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nihil, consequatur temporibus earum id esse, quasi nam dicta dolorem dolore autem nisi iste maiores, veniam error. Esse a, numquam illum recusandae libero nisi doloribus sit praesentium quis placeat. Aliquid natus corporis esse ut. Dolores molestias sunt aut eos reprehenderit quod?
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nihil, consequatur temporibus earum id esse, quasi nam dicta dolorem dolore autem nisi iste maiores, veniam error. Esse a, numquam illum recusandae libero nisi doloribus sit praesentium quis placeat. Aliquid natus corporis esse ut. Dolores molestias sunt aut eos reprehenderit quod?
				`} />
				<MultiSelect
                  title={"Role"}
                  options={roleOption}
                  setVal={setRole}
                />
				
			</div>
		</div>
	);
}

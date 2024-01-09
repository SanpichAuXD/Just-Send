"use client";
// import WithOutAuth from "@/components/WithOutAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast, useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { RegisterCompanySchema } from "@/validator/auth";

import { da } from "date-fns/locale";
import {
	ArrowRight,
	Building,
	CheckIcon,
	FileText,
	GraduationCap,
	Lock,
	User,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { undefined, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { CaretSortIcon, LockClosedIcon } from "@radix-ui/react-icons";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import { Dropzone } from "@/components/DropZone";
import { Textarea } from "@/components/ui/textarea";
type Input = z.infer<typeof RegisterCompanySchema>;
type universityType = {
	faculty: string[];
};
type jobwResumeType = {
	position: string;
	resume: File;
};
const RegisterCompany = () => {
	const [formStep, setFormStep] = useState(0);
	const [showPass, setShowPass] = useState<boolean>(false);
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	const { toast } = useToast();
	const formData = new FormData();
	const form = useForm<Input>({
		mode: "onChange",
		resolver: zodResolver(RegisterCompanySchema),
		defaultValues: {
			comname: "",
			comemail: "",
			comphone: "",
			password: "",
			confirmPassword: "",
		},
	});
	const { toast: showToast } = useToast();
	const onSubmit = async (dataValue: Input) => {
		const hireDate = new Date();

		try {
			const response = await fetch(
				"http://localhost:8082/user-service/user/register",
				{
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						// fname: dataValue.fname,
						// lname: dataValue.lname,
						// email: dataValue.email,
						// phone: dataValue.phone,
						// password: dataValue.password,
						// // role: dataValue.role,
						// // position: dataValue.position,
						// hireDate: hireDate.toLocaleDateString(),
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();

			if (data.status) {
				showToast({
					description: data.result,
					variant: "success",
				});
			} else {
				showToast({
					description: data.result,
					variant: "destructive",
				});
			}
			console.log(data);
		} catch (error) {
			console.error(error);
			showToast({
				description: "An error occurred",
				variant: "destructive",
			});
		}
		// console.log(dataValue);
	};
	const [files, setFiles] = useState<string[]>([]);
	const ValidateBeforeNext = async () => {
		// Trigger validation for the relevant fields
		if (formStep == 0) {
			// await form.trigger(["email", "fname", "lname", "phone"]);
			// console.log("triggered");
			// // Check the validation status of each field
			// const emailState = form.getFieldState("email");
			// const fnameState = form.getFieldState("fname");
			// const phoneState = form.getFieldState("phone");
			// const lnameState = form.getFieldState("lname");
			// // // Check if any of the fields is invalid or not dirty
			// if (
			// 	emailState.invalid ||
			// 	fnameState.invalid ||
			// 	phoneState.invalid ||
			// 	lnameState.invalid ||
			// 	!emailState.isDirty ||
			// 	!phoneState.isDirty ||
			// 	!lnameState.isDirty ||
			// 	!fnameState.isDirty
			// ) {
			// 	return; // Do not proceed to the next step if any field is invalid or not dirty
			// }
			// setFormStep(formStep + 1);
		} else if (formStep == 1) {
			// await form.trigger(["college", "faculty", "gpa", "transcript"]);
			// console.log("triggered");
			// // Check the validation status of each field
			// const collegeState = form.getFieldState("college");
			// const facultyState = form.getFieldState("faculty");
			// const gpaState = form.getFieldState("gpa");
			// const transcriptState = form.getFieldState("transcript");
			// // // Check if any of the fields is invalid or not dirty
			// if (
			// 	collegeState.invalid ||
			// 	facultyState.invalid ||
			// 	gpaState.invalid ||
			// 	transcriptState.invalid ||
			// 	!collegeState.isDirty ||
			// 	!facultyState.isDirty ||
			// 	!gpaState.isDirty
			// ) {
			// 	return; // Do not proceed to the next step if any field is invalid or not dirty
			// }
			// setFormStep(formStep + 1);
		} else if (formStep == 2) {
			// await form.trigger(["position", "resume"]);
			// console.log("triggered");
			// // Check the validation status of each field
			// const positionState = form.getFieldState("position");
			// const resumeState = form.getFieldState("resume");
			// // // Check if any of the fields is invalid or not dirty
			// if (
			// 	positionState.invalid ||
			// 	resumeState.invalid ||
			// 	!positionState.isDirty ||
			// 	!resumeState.isDirty
			// ) {
			// 	return; // Do not proceed to the next step if any field is invalid or not dirty
			// }
		}

		// All fields are valid and dirty, so proceed to the next step
		setFormStep(formStep + 1);
		console.log(formStep);
	};
	return (
		<div className="h-screen min-h-screen p-20 bg-[#F9F4F0] ">
			<div className="absolute  -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
				<Card className="w-[300px] h-auto  md:w-[700px]">
					<CardHeader>
						<CardTitle className="text-center">
							Register {formStep}
						</CardTitle>
						<div className="justify-center items-center mb-1 ">
							<div className="flex  justify-center">
								<Separator className="p-[2px] w-[75%] absolute  self-center z-10" />

								<Building
									className={cn(
										"w-11 h-11 mx-auto p-2 bg-slate-300 rounded-[45%] text-slate-600 z-20",
										{
											"text-white bg-[#8C7851]":
												formStep == 0,
										}
									)}
								/>
								<FileText
									className={cn(
										"w-11 h-11 mx-auto p-2 bg-slate-300 rounded-[45%] text-slate-600 z-20",
										{
											"text-white bg-[#8C7851]":
												formStep == 1,
										}
									)}
								/>
								<User
									className={cn(
										"w-11 h-11 mx-auto p-2 bg-slate-300 rounded-[45%] text-slate-600 z-20",
										{
											"text-white bg-[#8C7851]":
												formStep == 2,
										}
									)}
								/>
								<LockClosedIcon
									className={cn(
										"w-11 h-11 mx-auto p-2 bg-slate-300 rounded-[45%] text-slate-600 z-20",
										{
											"text-white bg-[#8C7851]":
												formStep == 3,
										}
									)}
								/>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="relative space-y-3
								overflow-x-hidden 	
								"
							>
								<div
									className={cn(
										"space-y-3 transition-transform transform translate-x-0 ease-in-out duration-300 ",
										{
											"transform -translate-x-full":
												formStep !== 0,
										}
									)}
								>
									<p className="font-bold text-slate-500 text-center mb-2">
										- Fill out your Personal Information -
									</p>
									<div className="flex justify-center bg-red-900  gap-5">
										{/* name */}
										<FormField
											control={form.control}
											name="comname"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Company Name
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Enter Your First Name..."
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>
										{/* position */}
										<FormField
											control={form.control}
											name="comphone"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Company Phone Number
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Enter Your First Name..."
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="flex justify-center items-center bg-red-900  gap-5">
										{/* name */}
										

										<FormField
											control={form.control}
											name="comemail"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Company Email
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Enter Your First Name..."
															{...field}
														/>
													</FormControl>

													<FormMessage/>
												</FormItem>
											)}
											/>
											
											
										{/* position */}
										<FormField
											control={form.control}
											name="logo"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Upload File
													</FormLabel>
													<FormControl>
													<Input
																accept=".jpg, .jpeg, .png"
																type="file"
																placeholder="Upload your logo..."
																
																onChange={(
																	e
																) => {
																	console.log(
																		e
																	);
																	field.onChange(
																		e.target
																			.files
																			? e
																					.target
																					.files[0]
																			: null
																	);
																}}
															/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="flex-1 px-10">

									<FormField
											control={form.control}
											name="location"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Location
													</FormLabel>
														<FormControl>
													<Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
				  />
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
											/>
											</div>
								</div>
								<div
									className={cn(
										"space-y-3 mb-5 px-3 absolute  top-0 left-0 right-0 transition-transform transform translate-x-0 ease-in-out duration-300 w-auto",
										{
											"transform translate-x-full ":
												formStep !== 1,
										},
										{
											"transform -translate-x-full":
												formStep >= 2,
										}
									)}
								>
									<p className="font-bold text-slate-500 text-center mb-2">
										- Fill out your Education Information -
									</p>
								</div>
								<div
									className={cn(
										"space-y-3 px-3 absolute top-0 left-0 right-0 transition-transform transform translate-x-0 ease-in-out duration-300 w-auto",
										{
											"transform translate-x-full":
												formStep !== 2,
										},
										{
											"transform -translate-x-full":
												formStep == 3,
										}
									)}
								>
									<p className="font-bold text-slate-500 text-center mb-2">
										- Select your position and put a resume
										-
									</p>
									<div className="flex justify-evenly min-w-[400px]  gap-5">
										{/* password */}
									</div>
								</div>
								<div
									className={cn(
										"space-y-3 px-3 absolute top-0 left-0 right-0 transition-transform transform translate-x-0 ease-in-out duration-300 w-auto",
										{
											"transform translate-x-full":
												formStep !== 3,
										}
									)}
								>
									<p className="font-bold text-slate-500 text-center mb-2">
										- Create your password -
									</p>
									{/* password */}
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<div className="flex items-center justify-between">
														<Input
															placeholder="Enter your password..."
															{...field}
															type={
																showPass
																	? "text"
																	: "password"
															}
														/>
														<span className="ml-2 text-gray-500 text-lg hover:text-black">
															{showPass ? (
																<FaRegEyeSlash
																	onClick={() =>
																		setShowPass(
																			!showPass
																		)
																	}
																/>
															) : (
																<FaRegEye
																	onClick={() =>
																		setShowPass(
																			!showPass
																		)
																	}
																/>
															)}
														</span>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									{/* confirm password */}
									<FormField
										control={form.control}
										name="confirmPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Confirm password
												</FormLabel>
												<FormControl>
													<div className="flex items-center justify-between">
														<Input
															placeholder="Please confirm your password..."
															{...field}
															type={
																showConfirm
																	? "text"
																	: "password"
															}
														/>
														<span className="ml-2 text-gray-500 text-lg hover:text-black">
															{showConfirm ? (
																<FaRegEyeSlash
																	onClick={() =>
																		setShowConfirm(
																			!showConfirm
																		)
																	}
																/>
															) : (
																<FaRegEye
																	onClick={() =>
																		setShowConfirm(
																			!showConfirm
																		)
																	}
																/>
															)}
														</span>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div
									className={cn(
										"flex justify-between relative pt-10",
										{
											"justify-end": formStep == 0,
										}
									)}
								>
									{/* flex gap-2 relative pt-28 */}
									<Button
										type="button"
										variant={"ghost"}
										onClick={() => {
											setFormStep(formStep - 1);
										}}
										className={cn({
											hidden: formStep == 0,
										})}
									>
										Go Back
									</Button>
									<Button
										type="submit"
										className={cn({
											hidden: formStep !== 3,
										})}
									>
										Register
									</Button>

									<Button
										type="button"
										variant={"outline"}
										className={cn("text-end", {
											hidden: formStep == 3,
										})}
										onClick={() => ValidateBeforeNext()}
									>
										Next
										<ArrowRight className="ml-2 w-4 h-4" />
									</Button>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
				
			</div>
		</div>
	);
};

export default RegisterCompany;

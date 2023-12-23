"use client";
// import WithOutAuth from "@/components/WithOutAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
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
import { registerSchema } from "@/validator/auth";

import { da } from "date-fns/locale";
import { ArrowRight, FileText, GraduationCap, Lock, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { undefined, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { LockClosedIcon } from "@radix-ui/react-icons";
type Input = z.infer<typeof registerSchema>;
type universityType = {
	faculty: string[];
};
type jobwResumeType = {
	position: string;
	resume: File;
};
const Register = () => {
	const [formStep, setFormStep] = useState(0);
	const [showPass, setShowPass] = useState<boolean>(false);
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	const [jobwResume, setJobwResume] = useState<jobwResumeType[]>([]);
	const university: string[] = [
		"Chulalongkorn University",
		"Mahidol University",
		"Kasetsart University",
		"Thammasat University",
		"King Mongkut's Institute of Technology Thonburi",
		"Chiang Mai University",
		"Khon Kaen University",
		"Prince of Songkla University",
		"Suranaree University of Technology",
		"Mahasarakham University",
		"King Mongkut's Institute of Technology Ladkrabang (KMITL)",
		"King Mongkut's University of Technology North Bangkok (KMUTNB)",
	];
	const itAndCeFaculties: Record<string, universityType> = {
		"Chulalongkorn University": { faculty: ["Faculty of Engineering"] },
		"Mahidol University": {
			faculty: ["Faculty of ICT", "Faculty of Engineering"],
		},
		"Kasetsart University": { faculty: ["Faculty of Engineering"] },
		"Thammasat University": {
			faculty: ["School of Information Technology"],
		},
		"King Mongkut's Institute of Technology Thonburi": {
			faculty: ["Faculty of Engineering"],
		},
		"Chiang Mai University": { faculty: ["Faculty of Engineering"] },
		"Khon Kaen University": { faculty: ["Faculty of Engineering"] },
		"Prince of Songkla University": { faculty: ["Faculty of Engineering"] },
		"Suranaree University of Technology": {
			faculty: ["School of Information Technology"],
		},
		"Mahasarakham University": { faculty: ["Faculty of Informatics"] },
		"King Mongkut's Institute of Technology Ladkrabang (KMITL)": {
			faculty: ["Faculty of Engineering"],
		},
		"King Mongkut's University of Technology North Bangkok (KMUTNB)": {
			faculty: ["Faculty of Engineering"],
		},
	};
	const [job, setJob] = useState<string[]>([
		"Front-End Dev.",
		"Back-End Dev.",
		"Full-Stack Dev.",
		"UI Designer",
		"UX Designer",
		"DevOps",
	]);
	const form = useForm<Input>({
		mode: "onChange",
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			password: "",
			fname: "",
			confirmPassword: "",
			lname: "",
			phone: "",
			transcript: new File([], ""),
			college: "",
			faculty: "",
			gpa: "0",
			position: "",
			resume: new File([], ""),
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
						fname: dataValue.fname,
						lname: dataValue.lname,
						email: dataValue.email,
						phone: dataValue.phone,

						password: dataValue.password,
						// role: dataValue.role,
						// position: dataValue.position,
						hireDate: hireDate.toLocaleDateString(),
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
	const ValidateJwR = async () => {
		await form.trigger(["position", "resume"]);
		// Check the validation status of each field
		const positionState = form.getFieldState("position");
		const resumeState = form.getFieldState("resume");
		console.log(
			positionState.invalid,
			positionState.isDirty,
			form.getValues("position")
		);
		if (
			positionState.invalid ||
			resumeState.invalid ||
			!positionState.isDirty
		) {
			return;
		}
		console.log("triggered");
		setJobwResume([
			...jobwResume,
			{
				position: form.getValues("position"),
				resume: form.getValues("resume"),
			},
		]);
		setJob(
			job.filter((val, index) => {
				if (val != form.getValues("position")) {
					return val;
				}
			})
		);
		form.setValue("position", "", {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});
		form.setValue("resume", new File([], ""), {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});
	};
	const ValidateBeforeNext = async () => {
		// Trigger validation for the relevant fields
		if (formStep == 0) {
			await form.trigger(["email", "fname", "lname", "phone"]);
			console.log("triggered");
			// Check the validation status of each field
			const emailState = form.getFieldState("email");
			const fnameState = form.getFieldState("fname");
			const phoneState = form.getFieldState("phone");
			const lnameState = form.getFieldState("lname");

			// // Check if any of the fields is invalid or not dirty
			if (
				emailState.invalid ||
				fnameState.invalid ||
				phoneState.invalid ||
				lnameState.invalid ||
				!emailState.isDirty ||
				!phoneState.isDirty ||
				!lnameState.isDirty ||
				!fnameState.isDirty
			) {
				return; // Do not proceed to the next step if any field is invalid or not dirty
			}
			setFormStep(formStep + 1);
		}
		else if (formStep == 1) {
			await form.trigger(["college", "faculty", "gpa","transcript"]);
			console.log("triggered");
			// Check the validation status of each field
			const collegeState = form.getFieldState("college");
			const facultyState = form.getFieldState("faculty");
			const gpaState = form.getFieldState("gpa");
			const transcriptState = form.getFieldState("transcript");
			
			// // Check if any of the fields is invalid or not dirty
			if (
				collegeState.invalid ||
				facultyState.invalid ||
				gpaState.invalid ||
				transcriptState.invalid ||
				!collegeState.isDirty ||
				!facultyState.isDirty ||
				!gpaState.isDirty 
				
			) {
				return; // Do not proceed to the next step if any field is invalid or not dirty
			}
			setFormStep(formStep + 1);
		}
		else if (formStep == 2) {
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
			if(jobwResume.length > 0){
			setFormStep(formStep + 1);
			}
		}
		
		// All fields are valid and dirty, so proceed to the next step
		setFormStep(formStep + 1);
		console.log(formStep);
	};
	return (
		<div className="h-screen min-h-screen p-20 bg-[#F9F4F0] ">
			<div className="absolute  -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
				<Card className="w-[300px] h-auto  md:w-[700px] ">
					<CardHeader>
						<CardTitle className="text-center">
							Register {formStep}
						</CardTitle>
						<div className="justify-center items-center mb-3">
							<div className="flex  justify-center">
								<Separator className="p-[2px] w-[75%] absolute  self-center z-10" />

								<User
									className={cn(
										"w-11 h-11 mx-auto p-2 bg-slate-300 rounded-full text-slate-600 z-20",
										{
											"text-white bg-[#8C7851]":
												formStep == 0,
										}
									)}
								/>
								<GraduationCap
									className={cn(
										"w-11 h-11 mx-auto p-2 bg-slate-300 rounded-full text-slate-600 z-20",
										{
											"text-white bg-[#8C7851]":
												formStep == 1,
										}
									)}
								/>
								<FileText
									className={cn(
										"w-11 h-11 mx-auto p-2 bg-slate-300 rounded-full text-slate-600 z-20",
										{
											"text-white bg-[#8C7851]":
												formStep == 2,
										}
									)}
								/>
								<LockClosedIcon
									className={cn(
										"w-11 h-11 mx-auto p-2 bg-slate-300 rounded-full text-slate-600 z-20",
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
								className="relative space-y-1 
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
									<div className="flex justify-around  gap-5">
										{/* name */}
										<FormField
											control={form.control}
											name="fname"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														First Name
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
										{/* name */}
										<FormField
											control={form.control}
											name="lname"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Last Name
													</FormLabel>
													<FormControl>
														<Input
															placeholder="Enter Your Last Name..."
															{...field}
														/>
													</FormControl>

													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="flex justify-around  gap-5">
										{/* email */}
										<FormField
											control={form.control}
											name="email"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Email</FormLabel>
													<FormControl>
														<Input
															placeholder="Enter your email..."
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										{/* Phone */}
										<FormField
											control={form.control}
											name="phone"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Phone</FormLabel>
													<FormControl>
														<Input
															placeholder="Enter your phone number..."
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									{/* position */}
								</div>

								<div
									className={cn(
										"space-y-3 px-3 absolute  top-0 left-0 right-0 transition-transform transform translate-x-0 ease-in-out duration-300 w-auto",
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
									<div className="flex justify-between  gap-5 ">
										{/* college */}
										<FormField
											control={form.control}
											name="college"
											render={({ field }) => (
												<FormItem className="w-full">
													<FormLabel>
														College
													</FormLabel>
													<Select
														onValueChange={
															field.onChange
														}
														defaultValue={
															field.value
														}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select College" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{university.map(
																(
																	year,
																	index
																) => {
																	return (
																		<SelectItem
																			value={
																				year
																			}
																			key={
																				index
																			}
																		>
																			{
																				year
																			}
																		</SelectItem>
																	);
																}
															)}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
										{/* DOB */}
										<FormField
											control={form.control}
											name="faculty"
											render={({ field }) => (
												<FormItem className="w-full">
													<FormLabel>
														Faculty
													</FormLabel>
													<Select
														onValueChange={
															field.onChange
														}
														defaultValue={
															field.value
														}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select Faculty" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{/* {university.map((year, index) => {
                              return (
                                <SelectItem value={year} key={index}>
                                  {year}
                                </SelectItem>
                              );
                            })} */}
															{itAndCeFaculties[
																form.getValues(
																	"college"
																)
															]?.faculty.map(
																(
																	faculty,
																	index
																) => {
																	return (
																		<SelectItem
																			value={
																				faculty
																			}
																			key={
																				index
																			}
																		>
																			{
																				faculty
																			}
																		</SelectItem>
																	);
																}
															)}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									{/* role */}
									<div className="flex justify-between  gap-5 ">
										<FormField
											control={form.control}
											name="transcript"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Transcript
													</FormLabel>
													<FormControl>
														<Input
															accept=".jpg, .jpeg, .png, .pdf"
															type="file"
															placeholder="Upload your transcript..."
															onChange={(e) =>
																field.onChange(
																	e.target
																		.files
																		? e
																				.target
																				.files[0]
																		: null
																)
															}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="gpa"
											render={({ field }) => (
												<FormItem>
													<FormLabel>GPA</FormLabel>
													<FormControl>
														<Input
															placeholder="Enter Your GPA"
															type="string"
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
										<FormField
											control={form.control}
											name="position"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Position
													</FormLabel>
													<Select
														onValueChange={
															field.onChange
														}
														defaultValue={
															field.value
														}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select Position" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{job.map(
																(
																	val,
																	index
																) => {
																	return (
																		<SelectItem
																			value={
																				val
																			}
																			key={
																				index
																			}
																		>
																			{
																				val
																			}
																			{
																				job.length
																			}
																		</SelectItem>
																	);
																}
															)}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
										{/* confirm password */}
										<FormField
											control={form.control}
											name="resume"
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														Resume
													</FormLabel>
													<FormControl>
														<div className="flex items-center justify-between">
															<Input
																accept=".jpg, .jpeg, .png, .pdf"
																type="file"
																placeholder="Upload your transcript..."
																onChange={(e) =>
																	field.onChange(
																		e.target
																			.files
																			? e
																					.target
																					.files[0]
																			: null
																	)
																}
															/>
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className="flex justify-end">
										<Button
											type="button"
											variant="outline"
											className="mt-5 justify-self-center"
											onClick={() => {
												ValidateJwR();
											}}
										>
											Add position
										</Button>
									</div>
									<div>
										{jobwResume.map((val, index) => {
											return (
												<div
													className="flex justify-between"
													key={index}
												>
													<p>{val.position}</p>
													<p>{val.resume.name}</p>
												</div>
											);
										})}
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
                              type={showPass ? "text" : "password"}
                            />
                            <span className="ml-2 text-gray-500 text-lg hover:text-black">
                              {showPass ? (
                                <FaRegEyeSlash
                                  onClick={() => setShowPass(!showPass)}
                                />
                              ) : (
                                <FaRegEye
                                  onClick={() => setShowPass(!showPass)}
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
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                          <div className="flex items-center justify-between">
                            <Input
                              placeholder="Please confirm your password..."
                           	   {...field}
                              type={showConfirm ? "text" : "password"}
                            />
                            <span className="ml-2 text-gray-500 text-lg hover:text-black">
                              {showConfirm ? (
                                <FaRegEyeSlash
                                  onClick={() => setShowConfirm(!showConfirm)}
                                />
                              ) : (
                                <FaRegEye
                                  onClick={() => setShowConfirm(!showConfirm)}
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
				<div>
					<p className="text-center mt-4">
						Already have an account?{"  "}
						<a href="/login" className="hover:underline">
							Login
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;

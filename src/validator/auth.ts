import { z } from "zod";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
	"application/pdf",
];

export const registerSchema = z
	.object({
		email: z.string().min(1, { message: "Email is required" }).email(),
		fname: z
			.string()
			.min(1, { message: "First name is required" })
			.min(3, { message: "Your first name should not be that short!" }),
		lname: z
			.string()
			.min(1, { message: "Last name is required" })
			.min(3, { message: "Your last name should not be that short!" }),
		phone: z
			.string()
			.min(1, { message: "Phone number is required" })
			.min(10, { message: "Incorect Phone number" })
			.max(10, { message: "Incorect Phone number" })
			.refine((val) => !isNaN(val as unknown as number), {
				message: "Phone number should be a number",
			}),
		// gender: z.string().min(1, { message: "Gender is required" }).max(10),
		// role: z.string().min(1, { message: "Role is required" }).max(15),
		college: z.string().min(1, { message: "College is required" }).max(50),
		faculty: z.string().min(1, { message: "Faculty is required" }).max(50),
		gpa: z
			.string()
			.refine((val) => !isNaN(val as unknown as number), {
				message: "GPA should be a number",
			})
			.refine((val) => Number(val) >= 1 && Number(val) <= 4, {
				message: "GPA should be between 1 and 4",
			}),
		transcript: z
			.instanceof(File, { message: "Transcript is required" })
			.refine(
				(file) => {
					if (file instanceof File) {
						return ACCEPTED_IMAGE_TYPES.includes(file.type);
					}
					return false;
				},
				{ message: "Resume should be a pdf or image file" }
			),
		position: z
			.string()
			.min(1, { message: "Position is required" })
			.max(30),
		resume: z
			.instanceof(File, { message: "Resume is required" })
			.refine(
				(file) => {
					if (file instanceof File) {
						return ACCEPTED_IMAGE_TYPES.includes(file.type);
					}
					return false;
				},
				{ message: "Resume should be a pdf file" }
			)
			.refine(
				(file) => {
					if (file instanceof File) {
						return file.size <= MAX_FILE_SIZE;
					}
					return false;
				},
				{ message: "Resume should be less than 500KB" }
			),
		password: z
			.string()
			.min(1, { message: "password is required" })
			.min(6, { message: "password must be more than 6 characters" })
			.max(100),
		confirmPassword: z
			.string()
			.min(1, { message: "confirmPassword is required" })
			.max(100),
	})
	.refine((data) => {
    return data.password === data.confirmPassword;
  }, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
	email: z.string().min(1, { message: "Email is required" }).email(),
	password: z.string().min(1, { message: "Password is required" }).max(100),
});


export const oregisterSchema = z
  .object({
    email: z.string().min(1, { message: "Email is required" }).email(),
    fname: z
      .string()
      .min(1, { message: "First name is required" })
      .min(3, { message: "Your first name should not be that short!" }),
    lname: z
      .string()
      .min(1, { message: "Last name is required" })
      .min(3, { message: "Your last name should not be that short!" }),
    phone: z
      .string()
      .min(1, { message: "Phone number is required" })
      .min(10, { message: "Incorect Phone number" })
      .max(10, { message: "Incorect Phone number" })
      .refine((val) => !isNaN(val as unknown as number), {
        message: "Phone number should be a number",
      }),
    gender: z.string().min(1, { message: "Gender is required" }).max(10),
    role: z.string().min(1, { message: "Role is required" }).max(15),
    position: z.string().min(1, { message: "Position is required" }).max(15),
    dob: z.string().min(1, { message: "Date of birth is required" }),
    password: z
      .string()
      .min(1, { message: "password is required" })
      .min(6, { message: "password must be more than 6 characters" })
      .max(100),
    confirmPassword: z
      .string()
      .min(1, { message: "confirmPassword is required" })
      .max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

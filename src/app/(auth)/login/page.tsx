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
import { loginSchema, oregisterSchema } from "@/validator/auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { da } from "date-fns/locale";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { z } from "zod";

type Input = z.infer<typeof oregisterSchema>;

const Login = () => {
  const [formStep, setFormStep] = useState(0);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const form = useForm<Input>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { toast: showToast } = useToast();
  const onSubmit = async (dataForm: Input) => {
    try {
      console.log(dataForm);
      // const response = await fetch("http://localhost:8082/auth-service/auth", {
      //   method: "POST",
      //   headers: {
      //     "Content-type": "application/json",
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      //   body: JSON.stringify({
      //     email: dataForm.email,
      //     password: dataForm.password,
      //   }),
      // });

      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }

      // const data = await response.json();

      // console.log(data.user);
      
    } catch (error) {
      console.error(error);
    }
    console.log(dataForm);
  };


  return (
    <div className="flex min-h-screen bg-red-900">
      <div className="flex flex-col gap-5 h-screen w-full bg-[#AFAFAF] justify-center items-center">
        <p className="text-4xl font-bold">Welcome to Just Send</p>
        <p className="text-2xl">
        Don&apos;t have an account? 
          <Link className="font-semibold"  href={"/signup"}> Register </Link>
          
          </p>
      </div>
      <div className=" flex h-screen w-full flex-col bg-[#F9F4F0] justify-center items-center">
        <p className="text-4xl font-bold mb-10">Login</p>
        {/* <Card className="w-[420px]">
          <CardHeader>
            <CardTitle className="text-center">Login</CardTitle>
          </CardHeader>
          <CardContent> */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <Button className="text-center w-full " type="submit">
                  Login
                </Button>
              </form>
            </Form>
          {/* </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default Login;
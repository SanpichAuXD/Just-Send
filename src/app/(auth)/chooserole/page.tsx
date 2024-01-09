import Image from "next/image";
import Link from "next/link";
import React from "react";
import CompanyBox from "./../../../components/company/home/CompanyBox";
import { Separator } from "@/components/ui/separator";

type Props = {};

const ChooseRole = (props: Props) => {
	return (
		<div className="flex h-screen flex-col justify-center content-center items-center bg-red-900">
			<p className="text-4xl font-bold mb-5">Choose Role</p>
			<div className="flex justify-center content-center gap-8">
				<Link href="/signup">
					<div className="bg-red-700">
						<Image
							src="https://cdn-icons-png.flaticon.com/512/5850/5850276.png"
							alt="choose role"
							width={300}
							height={300}
						/>
					</div>
					<p className="text-2xl text-center font-bold mt-5">
						Student
					</p>
					<Separator />
				</Link>
				<Link href="/signup-company">
					<div className="bg-red-200">
						<Image
							src="https://cdn-icons-png.flaticon.com/512/2399/2399888.png"
							alt="choose role"
							width={300}
							height={300}
						/>
					</div>
					<p className="text-2xl text-center font-bold mt-5">
						Company
					</p>
					<Separator />
				</Link>
			</div>
			<div></div>
		</div>
	);
};

export default ChooseRole;

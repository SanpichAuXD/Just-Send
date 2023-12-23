import React from "react";
import Image from "next/image";
import Tag from "@/components/Tag";
type CompBoxProps = {
	name : string
	logo : string
	position : string[]
	status : "OPEN" | "CLOSE"
	desc : string
};

const CompanyBox = ({name,logo,position,status,desc}: CompBoxProps) => {
	const pos = [
		"Front-End Dev.",
		"Back-End Dev.",
		"Full-Stack Dev.",
		"UI Designer",
		"UX Designer",
		"DevOps",
		"Data Scientist",
		"Data Engineer",
		"Product Manager",
		"Software Engineer",
	];
	return (
		<div className="w-[30%]  h-52 p-3 m-5 rounded-lg bg-white box-shadow-lg space-y-1">
			<div className="flex content-center justify-between items-center ">
				<div className="flex justify-between items-center">
					
						<Image
							src= {logo ? "https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png" : logo}
							alt="Picture of the author"
							className="w-20 h-20 rounded-full"
							width={100}
							height={100}
						/>
						<p className="ps-4 text-2xl font-semibold">{name}</p>
					
                   
				</div>
                <div className="self-start bg-red-900 p-2 px-5 rounded-xl">
					<p className="text-white font-semibold">{status}</p>
                </div>
			</div>
			<div className="mb-2">
				<p className="line-clamp-3 font-semibold text-sm">
					{desc}
				</p>
			</div>
			
				{
					pos.length > 3 ? (
						<div className="flex justify-around">
							{
								pos.slice(0,3).map((pos,i) => (
									<Tag name={pos} key={i}/>
								))
								
							}
							<Tag name={`(+${pos.length-2})`} />
						</div>
					) : (
						<div className="flex justify-around">
							{pos.map((pos,i) => (
								<Tag name={pos} key={i} />
							))}
						</div>
					)
				}
			
		</div>
	);
};

export default CompanyBox;

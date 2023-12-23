import React from 'react'

type Props = {
    name: string
}

const Tag = ({name}: Props) => {
  return (
    <div className="bg-slate-300 p-1 px-2 mx-1 rounded-xl truncate ">
					<p className="text-xs truncate self-center text-slate-500  font-semibold">
						{name}
					</p>
				</div>
  )
}
export default Tag
import React from "react";
import "./card.css";

export function Card({
	title = "NO-TITLE",
	description = "",
	url = "https://NO-URL.com",
	height = 150,
	width = 180,
	backgroundColor = "white",
	canDelete = false,
	onDelete = (()=>{}),
}){
	const [isDeleting, setIsDeleting] = React.useState(false);
	return (
		<div
			className="card w-full flex rounded-lg my-4"
			style={{backgroundColor, height: height + 16}}
		>
			<iframe
				width={width}
				height={height}
				src={url}
				frameBorder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				title="A very gud video"
				className="m-2"
			/>
			<div className="card-text px-4 py-2 w-full">
				<span style={{display: "grid", gridTemplateColumns: "auto 25px"}} className="justify-between">
					<h2 className="card-title pb-3 font-bold text-lg">{title}</h2>
					{canDelete &&
						<button
							className={isDeleting? "disabled" : ""}
							onClick={()=>{
								if(isDeleting) return;
								onDelete();
								setIsDeleting(true);
							}}
						>
							×
						</button>
					}
				</span>
				<p>{description}</p>
			</div>
		</div>
	);
}
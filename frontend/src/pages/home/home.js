import React from "react";
import "./home.css";

import { Card } from "../../components/card/card";
import { Spinner } from "../../components/spinner/spinner";

import { api } from "../../shared/api";

function getAllVideos(){
	return api.get("/videos").then(response => {
		return response.data;
	}).then((data)=>{
		return data;
	});
}

export function Home(){
	const [videoElems, setVideoElems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(()=>{(async ()=>{
		const videos = await getAllVideos();
		setIsLoading(false);
		setVideoElems(
			videos.map(({url, id, description, title}) =>
				<Card description={description} title={title} url={url} key={id} />
			).reverse()
		);
	})()}, []);

	return(
		<main className="home">
			<div className="mx-20 flex flex-col mt-20">
				<h2 className="heading">Videos</h2>
				{isLoading? <Spinner/> :
					(videoElems.length > 0? videoElems : <p>No videos found</p>)
				}
			</div>
		</main>
	);
}
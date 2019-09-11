import React from "react";
import "./manage.css";

import { Card } from "../../components/card/card";

import { api } from "../../shared/api";
import { Spinner } from "../../components/spinner/spinner";

function CreateVideo({
	onCreation = (()=>{}),
}){
	const titleRef = React.useRef();
	const urlRef = React.useRef();
	const descriptionRef = React.useRef();

	async function submitForm(event){
		event.preventDefault();
		let url = urlRef.current.value.trim();
		if(url.indexOf("embed") === -1){
			const urlObj = new URL(url);
			const videoId = urlObj.searchParams.get("v");
			url = `${urlObj.protocol}//${urlObj.hostname}/embed/${videoId}`;
		}
		const title = titleRef.current.value.trim();
		const description = descriptionRef.current.value.trim();
		const newVideo = {url, title, description};

		titleRef.current.value = "";
		descriptionRef.current.value = "";
		urlRef.current.value = "";

		const {id, timestamp} = (await api.post("/videos", newVideo)).data.data;
		newVideo.id = id;
		newVideo.timestamp = timestamp;
		alert("Video salvo com sucesso!");
		onCreation(newVideo);
	}

	return(
		<>
			<div className="create-video w-4/5 rounded-lg flex flex-col h-full content-center p-10">
				<h2 className="heading">Novo Vídeo</h2>
				<form onSubmit={submitForm} className="flex flex-col">
					<div className="flex flex-col my-3">
						<label htmlFor="title">Título</label>
						<input
							name="title"
							ref={titleRef}
							required
							className="border-2 p-2 rounded-lg"
							type="text"
						/>
					</div>
					<div className="flex flex-col my-3">
						<label htmlFor="url">URL</label>
						<input
							name="url"
							ref={urlRef}
							required
							className="border-2 p-2 rounded-lg"
							type="text"
						/>
					</div>
					<div className="flex flex-col my-3">
						<label htmlFor="description">Description</label>
						<textarea
							name="description"
							ref={descriptionRef}
							required
							className="border-2 p-2 rounded-lg"
							type="text"
						/>
					</div>
					<button type="submit" className="self-center px-6 py-2 mt-4 rounded text-xs h-8 font-bold">Adicionar</button>
				</form>
			</div>
		</>
	);
}

function getAllVideos(){
	return api.get("/videos/management").then(response => {
		return response.data;
	}).then((data)=>{
		return data;
	});
}

const VideoList = React.forwardRef((props, ref) => {
	const [videos, setVideos] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(()=>{(async ()=>{
		setVideos((await getAllVideos()).sort((a, b) => a.timestamp - b.timestamp));
		setIsLoading(false);
	})()}, []);

	React.useImperativeHandle(ref, () => ({
		createVideo(newVideo){
			setVideos([...videos, newVideo]);
		}
	}));

	async function deleteVideo(video){
		try{
			await api.delete(`/videos/${video.id}`);
		} catch(e) {
			if(e.response) return alert("Your token expired. Please login again");
			else return alert("Network error");
		}
		setVideos(videos.filter(elem => elem.id !== video.id));
	}

	return(
		<div ref={ref} className="list-videos rounded-lg w-4/5 h-full p-10 flex m-10 flex-col ">
			<h1 className="heading">Meus Vídeos</h1>

				{isLoading? <Spinner/> : (videos.length > 0?
					<ul className="overflow-y-auto">
						{videos.map((video) =>
							<li key={video.id} className="p-2"><Card
								backgroundColor="#FAFAFA"
								height={90}
								width={108}
								title={video.title}
								url={video.url}
								description={video.description}
								canDelete={true}
								onDelete={()=>deleteVideo(video)}
							/></li>
						)}
					</ul> :
				"No Videos found")}
		</div>
	);
});

export function Manage(){
	const listRef = React.useRef();
	let createVideo;

	function onCreation(newVideo){
		listRef.current.createVideo(newVideo);
	}

	return(
		<main className="manage h-full mt-8">
			<CreateVideo onCreation={onCreation}/>
			<VideoList ref={listRef} createVideo={createVideo}/>
		</main>
	);
}
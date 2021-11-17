import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
	
	const [personTalking, setPersonTalking] = useState(null);

	const getSoundUrl = (id) => `https://storage.googleapis.com/discord-clips/${id}.ogg`
	const getSound = async () => {
		//const [response] = await fetch("http://localhost:2002/random", {
		const [response] = await fetch("https://discord-clips-api-5vhmvf6quq-uk.a.run.app/random", {
			method: "GET",
			headers: {
				'Content-Type':'application/json'
			},
		}).then(r => r.json());
		setPersonTalking(response.userName);
		const audio = new Audio(getSoundUrl(response._id));
		audio.play();
		audio.onended = () => setPersonTalking(null);
		console.log(response);
	}

	return (
		<div className="App">
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<p>
				{personTalking && (
					<span>
						Speaking: {personTalking}
					</span>
				)}
			</p>
			<span
				className="App-link"
				onClick={getSound}
			>
				Play Sound
			</span>
		</header>
		</div>
	);
}

export default App;

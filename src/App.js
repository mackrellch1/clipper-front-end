import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ThumbsUp } from 'react-feather'

console.log(process.env.NODE_ENV)

const url = process.env.NODE_ENV == 'development' ? 
	"http://localhost:2002" : 
	"https://discord-clips-api-5vhmvf6quq-uk.a.run.app"

console.log(url)

function App() {
	
	const [personTalking, setPersonTalking] = useState(null);
	const [lastPlayed, setLastPlayed] = useState(null);
	const [didLike, setDidLike] = useState(false)

	const getSoundUrl = (id) => `https://storage.googleapis.com/amplify-discord-clips/${id}.ogg`
	const getSound = async () => {
		
		const [response] = await fetch(`${url}/random`, {
			method: "GET",
			headers: {
				'Content-Type':'application/json'
			},
		}).then(r => r.json());
		setPersonTalking(response.userName);
		const audio = new Audio(getSoundUrl(response._id));
		audio.play();
		setDidLike(false)
		audio.onended = () => {
			setPersonTalking(null)
			setLastPlayed(response)
		}
		console.log(response);
	}
	const likeSound = async () => {
		const response = await fetch(`${url}/like/${lastPlayed._id}`, {
			method: "GET",
			headers: {
				'Content-Type':'application/json'
			}
		});
		console.log(response)
		setDidLike(true)
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
			{lastPlayed && (
				<div>
					<div style={{
						padding:10
					}}>
						{didLike ? (lastPlayed.likes || 0) + 1 : lastPlayed.likes || 0} likes
					</div>
					{!didLike && (
						<div 
							onClick={likeSound}
							style={{
								backgroundColor: 'white',
								margin: 10,
								padding: 5,
								borderRadius: 8,
								alignItems: "center",
								justifyContent: "center"
							}}
						>
							<ThumbsUp 
								color={"black"}
								size={50}
							/>
						</div>
					)}
				</div>
			)}
		</header>
		</div>
	);
}

export default App;

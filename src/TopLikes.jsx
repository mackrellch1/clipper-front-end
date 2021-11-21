import React, { useState, useEffect } from 'react'
import moment from 'moment'


const url = process.env.NODE_ENV == 'development' ? 
	"http://localhost:2002" : 
	"https://discord-clips-api-5vhmvf6quq-uk.a.run.app"

function TopLikes() {
    const [data, setData] = useState([])
    const [page, setPage] = useState(0)
    const getSoundUrl = (id) => `https://storage.googleapis.com/amplify-discord-clips/${id}.ogg`
    let pageNumber = page + 1

    const fetchTop = async () => {
		
		const response = await fetch(`${url}/toplikes/${page}`, {
			method: "GET",
			headers: {
				'Content-Type':'application/json'
			},
		}).then(r => r.json());
        console.log(response);
		setData(response)
		
	}

    useEffect(fetchTop, [])
    useEffect(fetchTop, [page])

    return (
        <div style={{
            margin: 50
        }}>
            <span>
                MOST LIKED SOUNDS PAGE {pageNumber}
            </span>
            <table>
                {data.map((item, index) => (
                    <tr key={item._id}>
                        <td>{item.likes > 1 ? `${item.likes} likes` : `${item.likes} like`}</td>
                        <td>{moment(item.date).fromNow()}</td>
                        <td>{item.userName}</td>
                        <td onClick={() => {
                            const audio = new Audio(getSoundUrl(item._id));
                            audio.play();
                        }}>Play Sound</td>
                    </tr>
                ))}
            </table>
            <div 
                onClick={() => {
                    setPage(page + 1)
                }}
                style={{
                        margin: 30
                }}
            >
                Next Page
            </div>
        </div>
    )
}


export default TopLikes;
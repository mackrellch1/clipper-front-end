import React, { useState, useEffect } from 'react'
import moment from 'moment'
import './App.css';
import { ChevronRight, ChevronLeft } from 'react-feather'


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
        if (!response.length) {
            setPage(page - 1)
        }
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
                    <tbody>
                    <tr class="rows" key={item._id}>
                        <td>{item.likes > 1 ? `${item.likes} likes` : `${item.likes} like`}</td>
                        <td>{moment(item.date).fromNow()}</td>
                        <td>{item.userName}</td>
                        <td class="App-link"
                            onClick={() => {
                                const audio = new Audio(getSoundUrl(item._id));
                                audio.play();
                            }}>Play Sound</td>
                    </tr>
                    </tbody>
                ))}
            </table>
            <div style={{
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'row'

            }}>
                <div class="Chevron Page-Button"
                    onClick={() => {
                        setPage(page <= 0 ? page : (page - 1))
                    }}
                    style={{
                            opacity: page <= 0 ? 0.1 : 1,
                            margin: 30
                    }}
                >
                    <ChevronLeft />
                </div>
                <div class="Chevron Page-Button"
                    onClick={() => {
                        setPage(page + 1)
                    }}
                    style={{
                            margin: 30,
                    }}
                >
                    <ChevronRight />
                </div>
            </div>
        </div>
    )
}


export default TopLikes;
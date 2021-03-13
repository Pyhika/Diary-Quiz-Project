import React, {useState, useEffect} from 'react';
import axios from 'axios'


const HistoryFetch = () => {

    const [historys, setHistorys] = useState([])

    useEffect(() => {
        axios.get('http://1270.0.0.1:8000/history_app/history/', {
            headers: {
                'Authorization': 'Token 2f0c9130f4d72ad8171903f9d1b2b0816c90a351'
            }
        })
            .then(res => {setHistorys(res.data)})
        }, [])

    return (
        <div>
            <ul>
                {
                    historys.map(historys => <li key={historys.id}> {historys.title} {historys.id})</li>)
                }
            </ul>
        </div>
    )
}

export default HistoryFetch

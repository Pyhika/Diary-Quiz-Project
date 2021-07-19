import React, {useState, useEffect} from 'react';
import axios from 'axios'


const HistoryFetch = () => {

    const [history, setHistory] = useState([])
    const [selectedHistory, setSelectedHistory] = useState([])
    const [editedHistory, setEditedHistory] = useState({id:'', title:''})
    const [id, setId] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/history_app/history/', {
            headers: {
                'Authorization': 'Token 2f0c9130f4d72ad8171903f9d1b2b0816c90a351',
            },
        })
            .then((res) => {
                setHistory(res.data);
            });
        },[]);

    const getHistory = () => {
                // (注意)idを使う場合、「`」バッククォーテーションを使用する
                axios.get(`http://127.0.0.1:8000/history_app/history/${id}/`, {
            headers: {
                'Authorization': 'Token 2f0c9130f4d72ad8171903f9d1b2b0816c90a351',
            }})
            .then(res => {setSelectedHistory(res.data)
        })
    }

    const deleteHistory = (id) => {
        // (注意)idを使う場合、「`」バッククォーテーションを使用する
                axios.delete(`http://127.0.0.1:8000/history_app/history/${id}/`, {
            headers: {
                'Authorization': 'Token 2f0c9130f4d72ad8171903f9d1b2b0816c90a351',
            },
                })
                    .then(res => {setHistory(history.filter(history => history.id !== id));
                        setSelectedHistory([]);
                        if (editedHistory.id === id) {
                            setEditedHistory({ id: "", title: "" });
                        }
                    });
    };

    const newHistory = (history) => {

        const data = {
            title: history.title,
            summary: history.summary,
            ContentSubtitle1: history.ContentSubtitle1,
            category: history.category,
            author: history.author,
        }
                axios.post(`http://127.0.0.1:8000/history_app/history/${id}/`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 2f0c9130f4d72ad8171903f9d1b2b0816c90a351',
            }})
            .then(res => {setHistory([...history, res.data]);
            setEditedHistory({id:'', title:''})}
        )
    }

    const editHistory = (history) => {

                axios.put(`http://127.0.0.1:8000/history_app/history/${id}/`, history, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token 2f0c9130f4d72ad8171903f9d1b2b0816c90a351',
            }})
            .then(res => {setHistory(history.map(history => (history.id === editedHistory.id ? res.data : history)));
                setEditedHistory({ id:'', title:'' })
            })
    }

    const handleInputChange = () => evt => {
        const value = evt.target.value;
        const name = evt.target.name;
        setEditedHistory({ ...editedHistory, [name]:value })
    }

    return (
        <div>
            <ul>
                {
                    history.map(history =>
                        <li key={history.id}> {history.title} {history.id}
                            <button onClick={()=>deleteHistory(history.id)}>
                                <i className="fas fa-trash-alt"></i>
                            </button>
                            <button onClick={()=>setEditedHistory(history)}>
                                <i className="fas fa-pen"></i>
                            </button>
                        </li>
                    )
                }
            </ul>

            Set id <br/>
            <input type='text' value={id} onChange={ evt=>{setId(evt.target.value)} }/>
            <br/>
            <button type='button' onClick={()=>getHistory()}>get history</button>
            <h3>{selectedHistory.title} {selectedHistory.id}</h3>

            <input type="text" name="title"
                   value={editedHistory.title}
                   onChange={handleInputChange()}
                   placeholder="New History?" required/>

            <input type="text" name="summary"
                   value={editedHistory.title}
                   onChange={handleInputChange()}
                   placeholder="New summary?" required/>

            <input type="text" name="ContentSubtitle1"
                   value={editedHistory.title}
                   onChange={handleInputChange()}
                   placeholder="New ContentSubtitle1?" required/>

            <input type="text" name="category"
                   value={editedHistory.title}
                   onChange={handleInputChange()}
                   placeholder="New category?" required/>

            <input type="text" name="author"
                   value={editedHistory.title}
                   onChange={handleInputChange()}
                   placeholder="New author?" required/>

            { editedHistory.id ?
            <button onClick={ ()=>editHistory(editedHistory)}>Update</button> :
            <button onClick={ ()=>newHistory(editedHistory)}>Create</button>
            }
        </div>
    )
}

export default HistoryFetch

import "./queus.css";
import {useEffect, useState} from "react";

export function Queues() {
    const [queues, setQueues] = useState([]);
    useEffect(() => {

        fetch('http://localhost:3000/api/queues')
            .then(response => response.json())
            .then(data => {
                setQueues(data.queues);
            });
    }, []);

    return <div id='queues'>
        <table>
            <thead>
                <tr>
                    <th>Queue</th>
                    <th>Messages</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
            {queues.map(queue => <><tr>
                    <td>{queue}</td>
                    <td>0</td>
                    <td>
                        View messages
                    </td>
                </tr></>)}
            </tbody>
        </table>
    </div>
}
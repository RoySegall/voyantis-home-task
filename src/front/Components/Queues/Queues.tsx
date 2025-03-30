import "./queus.css";

export function Queues() {
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
                <tr>
                    <td>queue1</td>
                    <td>0</td>
                    <td>
                        <button>Send message</button>
                        <button>Delete</button>
                    </td>
                </tr>
                <tr>
                    <td>queue2</td>
                    <td>0</td>
                    <td>
                        <button>Send message</button>
                        <button>Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
}
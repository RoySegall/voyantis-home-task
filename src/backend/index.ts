import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors('*'));

const queues: Record<string, { messages: any[], waiters: any[] }> = {};

app.post('/api/:queue_name', (req, res) => {
    const { queue_name } = req.params;
    const message = req.body;

    if (!queues[queue_name]) {
        queues[queue_name] = { messages: [], waiters: [] };
    }

    const queue = queues[queue_name];

    // If someone is waiting for a message, send it directly.
    if (queue.waiters.length > 0) {
        const waiter = queue.waiters.shift();
        clearTimeout(waiter.timer);
        waiter.resolve(message);
    } else {
        queue.messages.push(message);
    }

    res.status(200).json({ success: true });
});


app.get('/api/queues', (req, res) => {
    // todo: get the amount of messages.
    res.status(200).json({queues: Object.keys(queues)});
});

app.get('/api/:queue_name', async (req, res) => {
    const { queue_name } = req.params;
    const timeoutMs = parseInt(req.query.timeout as string) || 10000;

    if (!queues[queue_name]) {
        queues[queue_name] = { messages: [], waiters: [] };
    }

    const queue = queues[queue_name];

    if (queue.messages.length > 0) {
        return res.status(200).json(queue.messages.shift());
    }

    // Wait for a message or timeout
    const message = await new Promise(resolve => {
        const timer = setTimeout(() => {
            queue.waiters = queue.waiters.filter(w => w.resolve !== resolve);
            resolve(null);
        }, timeoutMs);

        queue.waiters.push({ resolve, timer });
    });

    if (message) {
        res.status(200).json(message);
    } else {
        res.status(204).end();
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
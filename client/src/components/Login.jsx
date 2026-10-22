import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resVis, setResVis] = useState({message: '', err: false});

    async function submitLogin(e) {
        e.preventDefault();

        let response;

        try {
            response = await fetch('http://localhost:9000/api/login', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });
        } catch (e) {
            setResVis({message:`Failed to connect to server`, err: true});
            return;
        }

        if (response.ok) {
            onLoginSuccess(response);
        } else {
            onLoginFail(response);
        }
    }

    async function onLoginSuccess(res) {
        const data = await res.json();

        console.log(`AUTH: Login successful (${res.status})`);
        setResVis({message: `Welcome! Login successful.`})
        
    }

    async function onLoginFail(res) {
        const data = await res.json();

        console.log(`AUTH: Login failed (${res.status})`);
        setResVis({message: `${res.status}: ${data.message}`, err: true})

    }

    return (
        <div className="login-form">
            <h2>Login</h2>

            <form onSubmit={submitLogin}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>

            {resVis.message && (<h3 style={{color: resVis.err ? 'red' : 'green'}}>
                {resVis.message}
            </h3>)}
        </div>
    );
}
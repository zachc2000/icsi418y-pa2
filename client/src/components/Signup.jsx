import { useState } from 'react';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resVis, setResVis] = useState({message: '', err: false});
    
    async function submitSignup(e) {
        e.preventDefault();

        let response;

        try {
            response = await fetch('http://localhost:9000/api/signup', {
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
            onSignupSuccess(response);
        } else {
            onSignupFail(response);
        }
    }

    async function onSignupSuccess(res) {
        const data = await res.json();

        console.log(`AUTH: Login successful (${res.status})`);
        setResVis({message: `Sign up complete! Welcome.`})
        
    }

    async function onSignupFail(res) {
        const data = await res.json();

        console.log(`AUTH: Signup failed (${res.status})`);
        setResVis({message: `${res.status}: ${data.message}`, err: true})

    }

    return (
        <div className="signup-form">
            <h2>Sign Up</h2>

            <form onSubmit={submitSignup}>
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
                <button type="submit">Sign Up</button>
            </form>

            {resVis.message && (<h3 style={{color: resVis.err ? 'red' : 'green'}}>
                {resVis.message}
            </h3>)}
        </div>
    );
}
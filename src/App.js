import React, { useState } from 'react';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage('Loading...'); // Display a loading message
      try {
          const res = await fetch('http://sepolia-testnet-faucet.uksouth.azurecontainer.io/fund/eth', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ Address: walletAddress })
          });
          const data = await res.json();
          setMessage('Success: ' + JSON.stringify(data)); // Display the success message
      } catch (error) {
          setMessage('Error: ' + error.message); // Display the error message
      }
  };

  return (
    <div>
        <h1>Wallet Faucet</h1>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Enter Wallet Address"
                required
            />
            <button type="submit">Submit</button>
        </form>
        <div>{message}</div>
    </div>
);
}

export default App;
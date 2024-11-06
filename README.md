# Basic Token and NFT Creator on Algorand
This project is a decentralized application (dApp) that enables users to create their own Algorand Standard Asset (ASA) tokens or NFTs on the Algorand blockchain. With an intuitive interface, users can connect their wallets, specify token details, and confirm asset creation. The application uses a smart contract to automate the token generation process.

## Features
	•	Connect Algorand Wallets: Users can connect their Algorand wallet to interact with the dApp.
	•	Create Tokens: Enter token details such as name, symbol, and total supply to create a custom ASA token.
	•	Create NFTs: Generate NFTs by uploading an image via a URL, setting unique metadata for the NFT.
	•	Confirmation: Once the asset is created, a confirmation message displays the token details, ensuring transparency.
## Tech Stack

	•	Frontend: React.js
	•	Backend: JavaScript
	•	Smart Contract: PyTeal (Algorand’s Python SDK)
	•	Blockchain: Algorand

## Prerequisites

	•	Node.js (>= 14.x)
	•	Algorand Wallet (AlgoSigner or MyAlgo Wallet)
	•	Algorand Testnet Access (if testing)
	•	React.js

## Usage

	1.	Connect Wallet: Click on “Connect Wallet” to securely connect your Algorand wallet.
	2.	Enter Token Details:
	•	Name: Enter the token’s name.
	•	Symbol: Specify the token symbol.
	•	Total Supply: Define the total supply of tokens to be created.
	3.	Create Token: Click “Create Token” to initiate the creation process.
	4.	NFT Creation:
	•	Image URL: Provide a URL for the image to represent the NFT.
	•	Metadata: Add any additional information for the NFT.
	5.	Confirmation: Upon successful asset creation, a confirmation message will display the token or NFT details.

## Project Structure

	•	src/: Contains the React frontend code.
	•	contracts/: Holds PyTeal contracts used for creating assets.
	•	utils/: Utility functions for interacting with the Algorand blockchain.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.


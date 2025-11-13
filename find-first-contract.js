// findFirstContractCreation.js
const Web3 = require('web3');

// Replace with your actual Infura project URL (from task b)
const INFURA_URL = 'https://mainnet.infura.io/v3/60c2ef1e5e734db89d1e7efba5fe0f5e';
const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL));

async function findFirstContractCreationBlock() {
    let blockNumber = 0;
    console.log('Searching for the first contract creation transaction...');

    while (true) {
        try {
            const block = await web3.eth.getBlock(blockNumber, true); // true includes full tx objects
            if (!block || !block.transactions || block.transactions.length === 0) {
                blockNumber++;
                continue;
            }

            for (const tx of block.transactions) {
                // In Web3.js, contract creation tx has 'to' === null or undefined
                if (tx.to === null || tx.to === undefined || tx.to === '0x') {
                    console.log(`First contract creation found in block ${blockNumber}`);
                    console.log('Transaction hash:', tx.hash);
                    return blockNumber;
                }
            }
            blockNumber++;
        } catch (error) {
            console.error(`Error at block ${blockNumber}:`, error.message);
            break;
        }
    }
}

findFirstContractCreationBlock().catch(console.error);
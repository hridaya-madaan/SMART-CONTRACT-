const contractAddress = '0x8c940898448fb923401cbffc63d63c6c9d5740c49f7ee39aa0a2fec282934b5b';
const contractABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "getNumber",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getMessage",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newNumber",
                "type": "uint256"
            }
        ],
        "name": "setNumber",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "newMessage",
                "type": "string"
            }
        ],
        "name": "setMessage",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
            initContract();
        } catch (error) {
            console.error("User denied account access...");
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        initContract();
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

let contractInstance;

function initContract() {
    contractInstance = new web3.eth.Contract(contractABI, contractAddress);
    updateValues();
}

async function updateValues() {
    const number = await contractInstance.methods.getNumber().call();
    const message = await contractInstance.methods.getMessage().call();
    document.getElementById('number').innerText = number;
    document.getElementById('message').innerText = message;
}

async function setNumber() {
    const newNumber = document.getElementById('newNumber').value;
    const accounts = await web3.eth.getAccounts();
    await contractInstance.methods.setNumber(newNumber).send({ from: accounts[0] });
    updateValues();
}

async function setMessage() {
    const newMessage = document.getElementById('newMessage').value;
    const accounts = await web3.eth.getAccounts();
    await contractInstance.methods.setMessage(newMessage).send({ from: accounts[0] });
    updateValues();
}

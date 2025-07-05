export const controllerAbiJson = [
  {
    "inputs": [
      {
        "components": [
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "address", "name": "owner", "type": "address" },
          { "internalType": "uint256", "name": "duration", "type": "uint256" },
          { "internalType": "bytes32", "name": "secret", "type": "bytes32" },
          { "internalType": "address", "name": "resolver", "type": "address" },
          { "internalType": "bytes[]", "name": "data", "type": "bytes[]" },
          { "internalType": "bool", "name": "reverseRecord", "type": "bool" },
          { "internalType": "uint16", "name": "ownerControlledFuses", "type": "uint16" }
        ],
        "internalType": "struct IETHRegistrarController.Registration",
        "name": "registration",
        "type": "tuple"
      }
    ],
    "name": "makeCommitment",
    "outputs": [
      { "internalType": "bytes32", "name": "", "type": "bytes32" }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "bytes32", "name": "commitment", "type": "bytes32" }
    ],
    "name": "commit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "address", "name": "owner", "type": "address" },
          { "internalType": "uint256", "name": "duration", "type": "uint256" },
          { "internalType": "bytes32", "name": "secret", "type": "bytes32" },
          { "internalType": "address", "name": "resolver", "type": "address" },
          { "internalType": "bytes[]", "name": "data", "type": "bytes[]" },
          { "internalType": "bool", "name": "reverseRecord", "type": "bool" },
          { "internalType": "uint16", "name": "ownerControlledFuses", "type": "uint16" }
        ],
        "internalType": "struct IETHRegistrarController.Registration",
        "name": "registration",
        "type": "tuple"
      }
    ],
    "name": "register",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "uint256", "name": "duration", "type": "uint256" }
    ],
    "name": "rentPrice",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "base", "type": "uint256" },
          { "internalType": "uint256", "name": "premium", "type": "uint256" }
        ],
        "internalType": "struct IPriceOracle.Price",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

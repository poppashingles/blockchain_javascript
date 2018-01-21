class Block {
  constructor(index, previousHash, timestamp, data, hash) {
    this.index = index
    this.previousHash = previousHash.toString()
    this.timestamp = timestamp
    this.data = data
    this.hash = hash.toString()
  }

  const calculateHash = (index, previousHash, timestamp, data) => {
    return CryptoJS.SHA256(index + previousHash + timestamp + data.toString()
  }

  const generateNextBlock = (blockData) => {
    const previousBlock = getLatestBlock()
    const nextIndex = previousBlock.index + 1
    const nextTimeStamp = new Date().getTime()/1000
    const nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimeStamp, blockData)
    return new Block(nextIndex, previousBlock.hash, nextTimeStamp, blockData, nextHash)
  }

  const getGenesisBlock = () => {
    return new Block(0, "0", 1465154705, "my genesis block!!", "816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7");
  }

  let blockChain = [getGenesisBlock()]

  const isValidNewBlock(newBlock, previousBlock) => {
    if(previousBlock.index + 1 !== newBlock.index) {
      console.log("Invalid index")
      return false
    } else if(previousBlock.hash !== newBlock.previousHash) {
      console.log("Invalid previous hash")
      return false
    } else if(calculateHashForBlock(newBlock) !== newBlock.hash) {
      console.log("Invalid hash: " + calculateHashForBlock(newBlock) + " " + newBlock.hash)
      return false
    }
    return true
  }

  const replaceChain = (newBlocks) => {
    if(isValidChain(newBlocks) && newBlocks.length > blockChain.length) {
      console.log("Received blockchain is valid. Replacing current blockchain with received blockchain")
      blockChain = newBlocks
      broadcast(responseLatestMsg())
    } else {
      console.log("Received blockchain is invalid")
    }
  }
}

module.exports = Block;

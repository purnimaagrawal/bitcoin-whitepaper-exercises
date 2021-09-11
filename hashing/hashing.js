"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});


// createBlock
// index
//prevHash
//data
//timestamp
//hash

for (let line of poem) {
	createBlock(line);
}
function createBlock(data) {

	let block = {
		index: Blockchain.blocks.length,
		prevHash: Blockchain.blocks[Blockchain.blocks.length - 1].hash,
		data: data,
		timestamp: Date.now()
	}
	block.hash = blockHash(block);
	Blockchain.blocks.push(block);
	return block;
}

//verify the validity of the blocks in blockchain
function verifyChain(Blockchain) {
	for (let i = 0; i < Blockchain.blocks.length; i++) {
		let error = verifyBlock(Blockchain.blocks[i]);
		if (error == false) {
			return false;
		}
		if (i != 0) {
			if (Blockchain.blocks[i].prevHash != Blockchain.blocks[i - 1].hash) {
				return false;
			}
		}
	}
	return true;
}

function verifyBlock(block) {
	if (block.index == 0) {
		if (block.hash != '000000') {
			return false
		}
	}
	else {
		let bl = {
			index: block.index,
			prevHash: block.prevHash,
			data: block.data,
			timestamp: block.timestamp
		}
		let bhash = blockHash(bl);
		if (block.data == "" || block.prevHash == "" || block.index < 0 || bhash != block.hash) {
			return false;
		}
	}
}

console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);


// **********************************

function blockHash(bl) {
	return crypto.createHash("sha256").update(
		`${bl.index} ${bl.prevHash} ${bl.data} ${bl.timestamp}`
	).digest("hex");
}

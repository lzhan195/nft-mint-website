import { useState } from "react"
import React from "react"
import ReactDOM from "react-dom"
import { ethers } from "ethers"
import { BigNumber } from "@ethersproject/bignumber"
import funksNFT from "./FunksNFT.json"

const funksNFTAddress = "0x06b719173Cf2dB8f7AAddb5327A82E1bE31F6878"

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1)
    const isConnected = Boolean(accounts[0])

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(
                funksNFTAddress,
                funksNFT.abi,
                signer
            )

            try {
                const response = await contract.mint(
                    BigNumber.from(mintAmount),
                    {
                        value: ethers.utils.parseEther(
                            (0.02 * mintAmount).toString()
                        ),
                    }
                )
                console.log("response: ", response)
            } catch (err) {
                console.log("error: ", err)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return
        setMintAmount(mintAmount - 1)
    }

    const handleIncrement = () => {
        if (mintAmount >= 3) return
        setMintAmount(mintAmount + 1)
    }

    return (
        <div>
            <h1>Funks</h1>
            <p>2077, time to find FUNKS.</p>
            {isConnected ? (
                <div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <input type="number" value={mintAmount} />
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <button onClick={handleMint}>Mint Now</button>
                </div>
            ) : (
                <p>You must be connected to mint!</p>
            )}
        </div>
    )
}

export default MainMint

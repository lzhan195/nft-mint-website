import { useState } from "react"
import { ethers, BigNumber } from "ethers"
import funksNFT from "./FunksNFT.json"

const funksNFTAddress = "0x9bBC4D2D2750bC86551E1B074Dd4cD4a8F04c753"

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
                const response = await contract.mint(BigNumber.from(mintAmount))
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
        if ((mintAmount) => 3) return
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

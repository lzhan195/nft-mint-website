import { useState } from "react"
import { ethers } from "ethers"
import funksNFT from "./FunksNFT.json"
import {Box, Button, Flex, Input, Text} from "@chakra-ui/react";

const funksNFTAddress = "0x06b719173Cf2dB8f7AAddb5327A82E1bE31F6878"

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1)
    const isConnected = Boolean(accounts[0])

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(
                funksNFTAddress,
                funksNFT.abi,
                await signer,
            )

            try {
                const response = await contract.mint(
                    mintAmount,
                    {
                        value: ethers.parseEther(
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
        <Flex justify="center" align="center" height="100vh" paddingbuttom="150px">
            <Box width="520px">
                <div>
                    <Text fontSize="48px" textShadow="0 5px #000000">Funks</Text>
                    <Text
                    fontStyle="30px"
                    letterSpacing="-5.5%"
                    fontFamily="VT323"
                    textShadow="0 2px 2px #000000"
                    >2077, TIME TO FIND FUNKS!</Text>
                </div>
            {isConnected ? (
                <div>
                    <Flex align="center" justify="center">
                        <Button
                        backgroundColor="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="15px"
                        marginTop="10px"
                        onClick={handleDecrement}>-</Button>
                        <Input 
                        readOnly
                        fontFamily="inherit"
                        width="100px"
                        height="40px"
                        textAlign="center"
                        paddingLeft="19px"
                        marginTop="10px"
                        type="number" 
                        value={mintAmount} />
                        <Button 
                        backgroundColor="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="15px"
                        marginTop="10px"
                        onClick={handleIncrement}>+</Button>
                    </Flex>
                    <Button 
                     backgroundColor="#D6517D"
                     borderRadius="5px"
                     boxShadow="0px 2px 2px 1px #0F0F0F"
                     color="white"
                     cursor="pointer"
                     fontFamily="inherit"
                     padding="15px"
                     marginTop="10px"
                     onClick={handleMint}>MINT NOW</Button>
                </div>
            ) : (
                <Text
                margin="70px"
                fontSize="30px"
                letterSpacing="-5.5%"
                fontFamily="VT323"
                textShadow="0 3px #000000"
                color="#D6517D"
                >YOU MUST BE CONNECTED TO MINT!</Text>
            )}
            </Box>
        </Flex>
    )
}

export default MainMint

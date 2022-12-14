import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import TokenomTeam from '../TokenomTeam.jsx';
import FindOpponent from './FindOpponent.jsx';
import {
    Routes,
    Route,
} from "react-router-dom";
import FightPage from './FightPage.jsx';
import { useParams } from 'react-router-dom';

function MainPage() {

    const [connectionStatus, setConnectionStatus] = useState(false);

    useEffect(() => {
        const updateConnectionStatus = async () => {
            const { ethereum } = window;

            setConnectionStatus(ethereum ? ((ethereum.selectedAddress !== null) ? 0 : 1) : 2);
        }
        updateConnectionStatus();

        const intervalId = setInterval(updateConnectionStatus, 1000);

        return () => clearInterval(intervalId);
    }, [])

    return <>

        <header className='header'>
            <Header />
        </header>

        <div className='content overflow-hidden'>
            <Content state={connectionStatus} />
        </div>



        <footer className='footer bg-black flex'>
            <p className='text-white m-auto'>Made by Guigui</p>
        </footer>
    </>

}
export default MainPage;

function Content(props) {
    switch (props.state) {
        case 0:
            return <Routes>
                <Route exact path='/' element={
                    <div className='grid grid-cols-3 p-[1%] '>
                        <div className='h-[80vh] overflow-y-scroll'>
                            <TokenomTeam></TokenomTeam>
                        </div>
                        <div className='col-span-2'>
                            <FindOpponent></FindOpponent>
                        </div>
                    </div>
                }></Route>
                <Route path='/fight/:id/:vsId' element={<FightPageFunction />}></Route>
            </Routes>
        case 1:
            return <div className='h-[100%] place-content-center' id='noMM' >
                <p className='mx-[30%] pt-[5%] px-4 pb-4 text-3xl' id='blurBg'>S'il vous plait connectez votre MM au site en cliquant sur le bouton en haut a droite</p>
            </div>
        case 2:
            return <div className='h-[100%] place-content-center' id='noMM' >
                <p className='mx-[20%] pt-[5%] px-4 pb-4 text-3xl' id='blurBg'>Cette application Web est une Dapp, pour 'Decentralized App',
                    ce qui signifie que le back-end de cette application est un contrat intelligent d??ploy?? sur une blockchain.
                    Pour acc??der a l'application vous allez devoir installer un wallet comme <a className="text-blue-600" href='https://metamask.io/' target='blank' >Metamask</a>.<br />
                    Il n'est cependant pas n??cessaire de poss??der des cryptomonnaies sur ce wallet pour acc??der et visualiser le site. <br />
                    ??tant donn?? que j'ai d??ploy?? le contrat sur une blockchain de test, vous pouvez int??rragir avec le site sans poss??der de r??elles cryptomonnaies mais vous allez cependant devoir r??cup??rer des ETH de test goerli, que vous pouvez obtenir gratuitement grace a un Faucet <a className="text-blue-600" href='https://faucets.chain.link/' target='blank'>ici</a>. <br />
                    Je suis conscient que cela peut ??tre un frein pour vous, potentiels recruteurs, et suis en train de mettre en place un syst??me de Stub pour palier ?? ce probl??me.
                </p>
            </div>
        default:
            return <></>
    }
}


function FightPageFunction() {
    // Get the userId param from the URL.
    let { id, vsId } = useParams();

    return (
        <div className="h-full" >
            <FightPage id={id} vsId={vsId}></FightPage>
        </div>
    );
}
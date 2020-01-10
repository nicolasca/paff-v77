import { Heading } from '@chakra-ui/core';
import React from 'react';
import logo from '../../assets/map/map.jpg';
import styles from './Home.module.scss';


function Home() {

  const text = "Le PAFF est un jeu de carte simulant des batailles d’armées stratégiques dans un univers heroic fantasy. En tant que général de son armée, le joueur doit positionner ses troupes et distribuer ses ordres au cours de la bataille en tentant de contrer la stratégie de l’adversaire par l’anticipation, le bluff et un sens de la tactique affuté." + 
  "\nCe jeu comporte pour l’instant 4 factions mais si la guerre venait à se propager, elle pourrait progressivement atteindre les 8 autres factions du continent de Priana.";
  

  return (
    <div className={styles.MainPage + " container"}>
      <div className={styles.Description}>
        <Heading as="h1">PAFF</Heading>
        <p>
          {text}
          </p>
      </div>
      <div className={styles.MapPriana}>
        <img src={logo} alt="" />
      </div>
    </div>
  );
}

export default Home;
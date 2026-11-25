import React from 'react';

import AdiChain from './adichain.svg';
import Aptos from './aptos.svg?react';
import Arbitrum from './arbitrum.svg?react';
import Arc from './arc.png?no-inline';
import Astar from './astar.svg';
import Aurora from './aurora.svg?react';
import Avalanche from './avalanche.svg?react';
import Base from './base.svg?react';
import Berachain from './berachain.svg';
import Bitcoin from './bitcoin.svg?react';
import Bittensor from './bittensor.svg?react';
import Bnb from './bnb.svg?react';
import Cardano from './cardano.svg';
import Cronos from './cronos.svg?react';
import Elysium from './elysium.svg';
import Ethereum from './ethereum.svg?react';
import Etherlink from './etherlink.svg';
import Fantom from './fantom.svg?react';
import Filecoin from './filecoin.svg?react';
import Fuse from './fuse.svg?react';
import Gnosis from './gnosis.svg?react';
import Harmony from './harmony.svg?react';
import Ink from './ink.svg';
import Jovay from './jovay.svg';
import Kaia from './kaia.svg';
import Katana from './katana.jpg?no-inline';
import Linea from './linea.svg';
import Litecoin from './litecoin.svg';
import Mind from './mind.svg';
import Near from './near.svg?react';
import NeoX from './neox.svg';
import Optimism from './optimism.svg?react';
import Pharos from './pharos.svg';
import Plume from './plume.svg';
import PolygonPOS from './polygonPOS.svg?react';
import PolygonZkEvm from './polygonZkEvm.svg?react';
import Robinhood from './robinhood.svg';
import Ronin from './ronin.svg?react';
import Scroll from './scroll.svg?react';
import Solana from './solana.svg?react';
import Starknet from './starknet.svg?react';
import Stellar from './stellar.png?no-inline';
import Sui from './sui.svg';
import Tac from './tac.png?no-inline';
import Taiko from './taiko.svg';
import Tezos from './tezos.svg?react';
import ZkSync from './zkSync.svg?react';
import Tron from './tron.svg?react';
import Sonic from './sonic.svg?react';
import Celo from './celo.svg?react';
import Hyperliquid from './hyperliquid.svg?react';
import Megaeth from './megaeth.svg?react';
import Monad from './monad.svg?react';
import Plasma from './plasma.svg?react';
import Tempo from './tempo.svg?react';
import Unichain from './unichain.svg?react';
import Xdc from './xdc.svg';
import XLayer from './xlayer.png?no-inline';
import XrpLedger from './xrpl.png?no-inline';
import Zcash from './zcash.svg';
import ZkLink from './zklink.svg';
import './ProtocolIcon.scss';

const TextBadgeIcon = ({ label, color }) => (
  <span
    className="protocol-icon__fallback"
    style={{ backgroundColor: color }}
    title={label}
    aria-label={`${label} icon`}
  >
    {label}
  </span>
);

const iconTypes = {
  'ADI Chain': <img src={AdiChain} alt="" />,
  Aptos: <Aptos />,
  Arbitrum: <Arbitrum />,
  Arc: <img src={Arc} alt="" />,
  Astar: <img src={Astar} alt="" />,
  Aurora: <Aurora />,
  Avalanche: <Avalanche />,
  Base: <Base />,
  Berachain: <img src={Berachain} alt="" />,
  Bitcoin: <Bitcoin />,
  Bittensor: <Bittensor />,
  'BNB Smart Chain': <Bnb />,
  Cardano: <img src={Cardano} alt="" />,
  Cronos: <Cronos />,
  Elysium: <img src={Elysium} alt="" />,
  Ethereum: <Ethereum />,
  Etherlink: <img src={Etherlink} alt="" />,
  Fantom: <Fantom />,
  Filecoin: <Filecoin />,
  Fuse: <Fuse />,
  'Gnosis Chain': <Gnosis />,
  Harmony: <Harmony />,
  Ink: <img src={Ink} alt="" />,
  Jovay: <img src={Jovay} alt="" />,
  Kaia: <img src={Kaia} alt="" />,
  Katana: <img src={Katana} alt="" />,
  Linea: <img src={Linea} alt="" />,
  Litecoin: <img src={Litecoin} alt="" />,
  Mind: <img src={Mind} alt="" />,
  Near: <Near />,
  'Neo X': <img src={NeoX} alt="" />,
  Optimism: <Optimism />,
  Pharos: <img src={Pharos} alt="" />,
  Plume: <img src={Plume} alt="" />,
  'Polygon PoS': <PolygonPOS />,
  'Polygon zkEVM': <PolygonZkEvm />,
  'Robinhood Chain': <img src={Robinhood} alt="" />,
  Ronin: <Ronin />,
  Scroll: <Scroll />,
  Solana: <Solana />,
  Starknet: <Starknet />,
  Stellar: <img src={Stellar} alt="" />,
  Sui: <img src={Sui} alt="" />,
  TAC: <img src={Tac} alt="" />,
  Taiko: <img src={Taiko} alt="" />,
  Tezos: <Tezos />,
  TRON: <Tron />,
  Sonic: <Sonic />,
  Celo: <Celo />,
  Hyperliquid: <Hyperliquid />,
  MegaETH: <Megaeth />,
  Monad: <Monad />,
  Plasma: <Plasma />,
  Tempo: <Tempo />,
  Unichain: <Unichain />,
  'XDC Network': <img src={Xdc} alt="" />,
  'X Layer': <img src={XLayer} alt="" />,
  'XRP Ledger': <img src={XrpLedger} alt="" />,
  Zcash: <img src={Zcash} alt="" />,
  zkLink: <img src={ZkLink} alt="" />,
  'ZKsync Era': <ZkSync />,
};

const ProtocolIcon = ({ protocolName = '' }) => {
  const safeProtocolName =
    typeof protocolName === 'string' ? protocolName : '';

  const fallbackLabel = safeProtocolName
    .split(/\s+/)
    .map((chunk) => chunk.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const icon =
    iconTypes[safeProtocolName] || (
      <TextBadgeIcon label={fallbackLabel || '?'} color="#6b7280" />
    );

  return <span className="protocol-icon">{icon}</span>;
};

export default ProtocolIcon;

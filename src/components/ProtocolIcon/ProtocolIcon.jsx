import React from 'react';

import Aptos from './aptos.svg?react';
import Arbitrum from './arbitrum.svg?react';
import Aurora from './aurora.svg?react';
import Avalanche from './avalanche.svg?react';
import Base from './base.svg?react';
import Bitcoin from './bitcoin.svg?react';
import Bnb from './bnb.svg?react';
import Cronos from './cronos.svg?react';
import Ethereum from './ethereum.svg?react';
import Fantom from './fantom.svg?react';
import Filecoin from './filecoin.svg?react';
import Fuse from './fuse.svg?react';
import Gnosis from './gnosis.svg?react';
import Harmony from './harmony.svg?react';
import Near from './near.svg?react';
import Optimism from './optimism.svg?react';
import PolygonPOS from './polygonPOS.svg?react';
import PolygonZkEvm from './polygonZkEvm.svg?react';
import Ronin from './ronin.svg?react';
import Scroll from './scroll.svg?react';
import Solana from './solana.svg?react';
import Starknet from './starknet.svg?react';
import Tezos from './tezos.svg?react';
import ZkSync from './zkSync.svg?react';
import Tron from './tron.svg?react';
import Sonic from './sonic.svg?react';
import Celo from './celo.svg?react';
import Hyperliquid from './hyperliquid.svg?react';
import Klaytn from './klaytn.svg?react';
import Monad from './monad.svg?react';
import Plasma from './plasma.svg?react';
import Tempo from './tempo.svg?react';
import Unichain from './unichain.svg?react';
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
  Aptos: <Aptos />,
  Arbitrum: <Arbitrum />,
  Aurora: <Aurora />,
  Avalanche: <Avalanche />,
  Base: <Base />,
  Bitcoin: <Bitcoin />,
  'BNB Smart Chain': <Bnb />,
  Cronos: <Cronos />,
  Ethereum: <Ethereum />,
  Fantom: <Fantom />,
  Filecoin: <Filecoin />,
  Fuse: <Fuse />,
  Gnosis: <Gnosis />,
  Harmony: <Harmony />,
  Near: <Near />,
  Optimism: <Optimism />,
  'Polygon PoS': <PolygonPOS />,
  'Polygon zkEVM': <PolygonZkEvm />,
  Ronin: <Ronin />,
  Scroll: <Scroll />,
  Solana: <Solana />,
  Starknet: <Starknet />,
  Tezos: <Tezos />,
  zkSync: <ZkSync />,
  TRON: <Tron />,
  Sonic: <Sonic />,
  Celo: <Celo />,
  Klaytn: <Klaytn />,
  Hyperliquid: <Hyperliquid />,
  Monad: <Monad />,
  Plasma: <Plasma />,
  Tempo: <Tempo />,
  Unichain: <Unichain />,
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

export type Difficulty = 'facile' | 'moyen' | 'difficile';

export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  difficulty: Difficulty;
  image?: string; // url relative vers une illustration
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Qu'est-ce que la blockchain ?",
    options: [
      "Une base de données décentralisée",
      "Un type de cryptomonnaie",
      "Un langage de programmation",
      "Un réseau social"
    ],
    answer: "Une base de données décentralisée",
    difficulty: 'facile',
    image: "/illustrations/blockchain.png"
  },
  {
    id: 2,
    question: "Quel est le nom de la première cryptomonnaie ?",
    options: [
      "Ethereum",
      "Bitcoin",
      "Litecoin",
      "Dogecoin"
    ],
    answer: "Bitcoin",
    difficulty: 'facile',
    image: "/illustrations/bitcoin.png"
  },
  {
    id: 3,
    question: "Quel pays africain a lancé la première crypto-monnaie nationale ?",
    options: [
      "Nigeria",
      "Afrique du Sud",
      "Kenya",
      "Ghana"
    ],
    answer: "Nigeria",
    difficulty: 'facile',
    image: "/illustrations/afrique.png"
  },
  {
    id: 4,
    question: "Quel est le principal avantage de la blockchain ?",
    options: [
      "Transparence",
      "Centralisation",
      "Lenteur",
      "Coût élevé"
    ],
    answer: "Transparence",
    difficulty: 'facile',
  },
  {
    id: 5,
    question: "Quel est le nom du créateur du Bitcoin ?",
    options: [
      "Satoshi Nakamoto",
      "Vitalik Buterin",
      "Elon Musk",
      "Charles Hoskinson"
    ],
    answer: "Satoshi Nakamoto",
    difficulty: 'facile',
  },
  {
    id: 6,
    question: "La blockchain est-elle modifiable après validation d’un bloc ?",
    options: [
      "Non",
      "Oui",
      "Parfois",
      "Toujours"
    ],
    answer: "Non",
    difficulty: 'facile',
  },
  {
    id: 7,
    question: "Quel est le symbole du Bitcoin ?",
    options: [
      "BTC",
      "ETH",
      "BNB",
      "SOL"
    ],
    answer: "BTC",
    difficulty: 'facile',
  },
  {
    id: 8,
    question: "Quel est le nom de la blockchain d’Ethereum ?",
    options: [
      "Ethereum",
      "Cardano",
      "Solana",
      "Polkadot"
    ],
    answer: "Ethereum",
    difficulty: 'facile',
  },
  {
    id: 9,
    question: "Quel est l’abréviation de la monnaie numérique du Nigeria ?",
    options: [
      "eNaira",
      "cCedi",
      "mRand",
      "kShilling"
    ],
    answer: "eNaira",
    difficulty: 'facile',
  },
  {
    id: 10,
    question: "Quel secteur africain bénéficie le plus de la blockchain ?",
    options: [
      "Finance",
      "Agriculture",
      "Éducation",
      "Santé"
    ],
    answer: "Finance",
    difficulty: 'facile',
  },
  // Moyen
  {
    id: 11,
    question: "Qu’est-ce qu’un smart contract ?",
    options: [
      "Un programme auto-exécutant sur blockchain",
      "Un contrat papier",
      "Un type de wallet",
      "Un NFT"
    ],
    answer: "Un programme auto-exécutant sur blockchain",
    difficulty: 'moyen',
  },
  {
    id: 12,
    question: "Quel est le rôle du minage dans la blockchain ?",
    options: [
      "Valider les transactions",
      "Créer des NFT",
      "Augmenter la vitesse",
      "Réduire la sécurité"
    ],
    answer: "Valider les transactions",
    difficulty: 'moyen',
  },
  {
    id: 13,
    question: "Quel est le principal langage pour les smart contracts Ethereum ?",
    options: [
      "Solidity",
      "Python",
      "Rust",
      "Java"
    ],
    answer: "Solidity",
    difficulty: 'moyen',
  },
  {
    id: 14,
    question: "Qu’est-ce qu’un wallet ?",
    options: [
      "Un portefeuille numérique pour crypto",
      "Un site web",
      "Un exchange",
      "Un token"
    ],
    answer: "Un portefeuille numérique pour crypto",
    difficulty: 'moyen',
  },
  {
    id: 15,
    question: "Quel est le but d’un NFT ?",
    options: [
      "Certifier l’unicité d’un actif numérique",
      "Créer des tokens",
      "Augmenter la vitesse",
      "Réduire la sécurité"
    ],
    answer: "Certifier l’unicité d’un actif numérique",
    difficulty: 'moyen',
  },
  {
    id: 16,
    question: "Quel projet africain utilise la blockchain pour l’agriculture ?",
    options: [
      "AgriLedger",
      "BitPesa",
      "Yellow Card",
      "Paxful"
    ],
    answer: "AgriLedger",
    difficulty: 'moyen',
  },
  {
    id: 17,
    question: "Qu’est-ce qu’une clé privée ?",
    options: [
      "Un code secret pour accéder à un wallet",
      "Un NFT",
      "Un smart contract",
      "Un exchange"
    ],
    answer: "Un code secret pour accéder à un wallet",
    difficulty: 'moyen',
  },
  {
    id: 18,
    question: "Quel est le principal risque de la blockchain ?",
    options: [
      "Perte de la clé privée",
      "Trop de transparence",
      "Lenteur",
      "Coût faible"
    ],
    answer: "Perte de la clé privée",
    difficulty: 'moyen',
  },
  {
    id: 19,
    question: "Quel est le nom du testnet d’Ethereum ?",
    options: [
      "Goerli",
      "Mainnet",
      "Binance",
      "Polygon"
    ],
    answer: "Goerli",
    difficulty: 'moyen',
  },
  {
    id: 20,
    question: "Quel pays africain a le plus de startups blockchain ?",
    options: [
      "Nigeria",
      "Afrique du Sud",
      "Kenya",
      "Égypte"
    ],
    answer: "Nigeria",
    difficulty: 'moyen',
  },
  // Difficile
  {
    id: 21,
    question: "Qu’est-ce que la preuve d’enjeu (Proof of Stake) ?",
    options: [
      "Un mécanisme de consensus basé sur la détention de tokens",
      "Un type de NFT",
      "Un wallet",
      "Un smart contract"
    ],
    answer: "Un mécanisme de consensus basé sur la détention de tokens",
    difficulty: 'difficile',
  },
  {
    id: 22,
    question: "Quel est le rôle d’un oracle dans la blockchain ?",
    options: [
      "Fournir des données externes aux smart contracts",
      "Créer des tokens",
      "Valider les blocs",
      "Gérer les wallets"
    ],
    answer: "Fournir des données externes aux smart contracts",
    difficulty: 'difficile',
  },
  {
    id: 23,
    question: "Qu’est-ce qu’un DAO ?",
    options: [
      "Organisation autonome décentralisée",
      "Un wallet",
      "Un NFT",
      "Un exchange"
    ],
    answer: "Organisation autonome décentralisée",
    difficulty: 'difficile',
  },
  {
    id: 24,
    question: "Quel est le principal problème des blockchains publiques ?",
    options: [
      "Scalabilité",
      "Centralisation",
      "Sécurité",
      "Transparence"
    ],
    answer: "Scalabilité",
    difficulty: 'difficile',
  },
  {
    id: 25,
    question: "Qu’est-ce qu’un fork dans la blockchain ?",
    options: [
      "Une séparation de la chaîne en deux versions",
      "Un smart contract",
      "Un NFT",
      "Un wallet"
    ],
    answer: "Une séparation de la chaîne en deux versions",
    difficulty: 'difficile',
  },
  {
    id: 26,
    question: "Quel est le rôle du hash dans la blockchain ?",
    options: [
      "Garantir l’intégrité des données",
      "Créer des tokens",
      "Gérer les wallets",
      "Valider les smart contracts"
    ],
    answer: "Garantir l’intégrité des données",
    difficulty: 'difficile',
  },
  {
    id: 27,
    question: "Quel est le principal avantage des blockchains privées ?",
    options: [
      "Contrôle d’accès",
      "Transparence totale",
      "Décentralisation",
      "Open source"
    ],
    answer: "Contrôle d’accès",
    difficulty: 'difficile',
  },
  {
    id: 28,
    question: "Qu’est-ce qu’un token ERC-20 ?",
    options: [
      "Un standard de token sur Ethereum",
      "Un NFT",
      "Un wallet",
      "Un smart contract"
    ],
    answer: "Un standard de token sur Ethereum",
    difficulty: 'difficile',
  },
  {
    id: 29,
    question: "Quel est le rôle du consensus dans la blockchain ?",
    options: [
      "Valider les transactions et blocs",
      "Créer des tokens",
      "Gérer les wallets",
      "Augmenter la vitesse"
    ],
    answer: "Valider les transactions et blocs",
    difficulty: 'difficile',
  },
  {
    id: 30,
    question: "Quel projet africain utilise la blockchain pour la traçabilité alimentaire ?",
    options: [
      "AgriLedger",
      "BitPesa",
      "Yellow Card",
      "Paxful"
    ],
    answer: "AgriLedger",
    difficulty: 'difficile',
  },
]; 
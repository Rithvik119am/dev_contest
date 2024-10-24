import { FaWallet } from "react-icons/fa";
import { IoSwapHorizontal } from "react-icons/io5";

// NODE
export const MAINNET_ALGONODE_NODE = "https://mainnet-api.algonode.cloud";
export const TESTNET_ALGONODE_NODE = "https://testnet-api.algonode.cloud";

// INDEXER
export const MAINNET_ALGONODE_INDEXER = "https://mainnet-idx.algonode.cloud";
export const TESTNET_ALGONODE_INDEXER = "https://testnet-idx.algonode.cloud";

// NF
export const MAINNET_NFD_API_BASE_URL = "https://api.nf.domains";
export const TESTNET_NFD_API_BASE_URL = "https://api.testnet.nf.domains";

// DONATION WALLETS
export const DONATE_WALLET_1 =
  "O2ZPSV6NJC32ZXQ7PZ5ID6PXRKAWQE2XWFZK5NK3UFULPZT6OKIOROEAPU";
export const DONATE_WALLET_2 =
  "VYPDFMVRXCI2Z4FPC2GHB4QC6PSCTEDAS4EU7GE3W4B3MRHXNZO6BB2RZA";

// MINT FEES
export const MINT_FEE_WALLET =
  "RBZ4GUE7FFDZWCN532FFR5AIYJ6K4V2GKJS5B42JPSWOAVWUT4OHWG57YQ";
export const MINT_FEE_PER_ASA = 0;
export const UPDATE_FEE_PER_ASA = 0;

export const IPFS_ENDPOINT = "https://ipfs.algonode.xyz/ipfs/";

export const CREATOR_WALLETS = [];

export const PREFIXES = [];

// TOOLS
export const TOOLS = [
  {
    id: "simple_mint",
    label: "Token Creator",
    description: "Easily Inscribe an Asset on Algorand using Crust Network",
    path: "/token-creator",
    category: "mint",
  },
];

// array of external links to be displayed in the dropdown menu
// icon can be any react element
export const EXTERNAL_LINKS = [
  {
    name: "Wen Wallet",
    url: "https://wallet.wen.tools",
    icon: <FaWallet size={20} color="white" />,
  },
  {
    name: "Wen Swap",
    url: "https://swap.wen.tools",
    icon: <IoSwapHorizontal size={24} color="white" />,
  },
];

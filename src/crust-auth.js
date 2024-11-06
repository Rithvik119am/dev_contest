import { peraWallet } from "./utils";

export const CRUST_DEBUG = false;

// Algorand wallet
export async function signLoginAlgorandForCrustIpfsEndpoint(address) {
  const u = {
    account: address,
    wallet: "algorand",
  }
  const msg =
    u.wallet === "near" || u.wallet === "aptos-martian" || u.wallet === "aptos-petra" || u.wallet === "web3auth"
      ? u.pubKey || ""
      : u.account;
  const prefix = getPerfix(u);

  // use remark as singmsg
  await peraWallet.reconnectSession();
  return peraWallet.signData([{ data: Buffer.from(msg), message: 'For login' }], u.account).then(signedData => {
    return window.btoa(String.fromCharCode.apply(null, signedData[0]));
  }).then(signature => {
    if (signature.length) {
      const perSignData = u.wallet === "elrond" ? signature : `${prefix}-${msg}:${signature}`;
      const base64Signature = window.btoa(perSignData);
      const authBasic = `${base64Signature}`;

      return authBasic;
    }
    return '';
  })
    .catch((err) => {
      throw new Error('Algorand wallet signMessage error: ', err);
    });
};

export function isCrustAuth() {
  // localStorage.setItem("authBasic", authBasic);
  const token = localStorage.getItem("authBasic")
  if (token === "" || token === undefined || token === null) {
    return false;
  }

  return true
}

const getPerfix = (user) => {
  if (user.wallet === "algorand") {
    return "algo";
  }
  return "substrate";
};


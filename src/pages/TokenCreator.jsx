import { useState } from "react";

import algosdk from "algosdk";
import { toast } from "react-toastify";
import { useAtom } from 'jotai';
import { atomWithStorage, RESET } from 'jotai/utils';
import { Button, TextField, FormControlLabel, Checkbox } from "@mui/material";
import {
  getNodeURL,
  getAssetPreviewURL,
  getTokenPreviewURL,
  createAssetMintArrayV2,
} from "../utils";
import { TOOLS } from "../constants";

const simpleMintAtom = atomWithStorage('simpleMint', {
  name: "",
  unitName: "",
  totalSupply: 1,
  image_there: false,
  decimals: 0,
  image: null,
  format: "Token",
  freeze: false,
  clawback: false,
  defaultFrozen: false,
  urlField: "",
});

export function SimpleMint() {
  const [formData, setFormData] = useAtom(simpleMintAtom);
  const [processStep, setProcessStep] = useState(0);

  const [createdAssetID, setCreatedAssetID] = useState(null);

  // batchATC is a AtomicTransactionComposer to batch and send all transactions
  const [batchATC, setBatchATC] = useState(null);

  async function mint() {
    try {
      const wallet = localStorage.getItem("wallet");
      if (!wallet) {
        toast.error("Please connect your wallet");
        return;
      }
      if (
        formData.name === "" ||
        formData.unitName === "" ||
        formData.totalSupply === "" ||
        formData.decimals === ""
      ) {
        toast.error("Please fill all the required fields");
        return;
      }
      setProcessStep(1);
      let metadata = {
        name: formData.name,
        standard: formData.format.toLocaleLowerCase(),
        properties: {},
      };
      let imageURL;
      imageURL = formData.urlField;
      
      const nodeURL = getNodeURL();

      if (formData.image) {
          metadata.image = imageURL;
          metadata.image_mime_type = formData.image ? formData.image.type : "";
        
      }

      let metadataForIPFS = {
        asset_name: formData.name,
        unit_name: formData.unitName,
        has_clawback: formData.clawback ? "Y" : "N",
        has_freeze: formData.freeze ? "Y" : "N",
        default_frozen: formData.defaultFrozen ? "Y" : "N",
        decimals: formData.decimals,
        total_supply: formData.totalSupply,
        ipfs_data: metadata,
      };
        metadata.properties = metadata.properties.traits;
        metadataForIPFS = {
          ...metadataForIPFS,
          asset_note: metadata,
          asset_url: imageURL,
        };
        
        const batchATC = await createAssetMintArrayV2([metadataForIPFS], nodeURL);
        setBatchATC(batchATC);
      
      toast.info("Please sign the transaction");
      setProcessStep(2);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setProcessStep(0);
    }
  }

  async function sendTransaction() {
    try {
      const wallet = localStorage.getItem("wallet");
      if (!wallet) {
        toast.error("Please connect your wallet");
        return;
      }
      if (!batchATC) {
        toast.error("Please create the transaction first");
        return;
      }
      setProcessStep(3);
      const nodeURL = getNodeURL();
      const algodClient = new algosdk.Algodv2("", nodeURL, {
        "User-Agent": "evil-tools",
      });

      const txres = await batchATC.execute(algodClient, 4);

      if (!txres || !txres.txIDs || txres.txIDs.length === 0) {
        // err tx
        console.error("transaction submit error, batchATC.execute return : ", txres);
        toast.error("transaction submit error");
        return
      }

      const assetCreateTxID = txres.txIDs[0];

      const result = await algosdk.waitForConfirmation(algodClient, assetCreateTxID, 3);

      setCreatedAssetID(result["asset-index"]);

      removeStoredData(); // Remove stored data now that mint is complete
      toast.success("Asset created successfully!");
      setProcessStep(4);
    } catch (error) {
      console.log("Something went wrong: ", error);
      toast.error("Something went wrong!");
      setProcessStep(2);
    }
  }
  
  /** Remove the locally stored data */
  function removeStoredData() {
    setFormData(RESET);
    // setToken(RESET);
  }

  return (
    <div className="mx-auto text-white mb-4 text-center flex flex-col items-center max-w-[40rem] gap-y-2 min-h-screen p-4" style={{
      backgroundColor: '#3B1E54', 
      color: '#EEEEEE'
    }}>
      <p className="text-2xl font-bold mt-1" style={{color: '#EEEEEE'}}>
        {TOOLS.find((tool) => tool.path === window.location.pathname).label}
      </p>
      <form className="mt-4 flex flex-col gap-y-4" style={{color: '#EEEEEE'}}>
        <div className="flex flex-col gap-y-2">
          <label className="text-sm leading-none text-gray-200" style={{color: '#EEEEEE'}}>Name*</label>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ex: USAlgo 001"
            value={formData.name}
            onChange={(e) => {
              setFormData({
                ...formData,
                name: e.target.value,
              });
            }}
            style={{
              backgroundColor: '#D4BEE4', 
              color: '#3B1E54',
              borderColor: '#9B7EBD'
            }}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="text-sm leading-none text-gray-200" style={{color: '#EEEEEE'}}>Unit Name*</label>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Ex: USA001"
            value={formData.unitName}
            onChange={(e) => {
              setFormData({
                ...formData,
                unitName: e.target.value,
              });
            }}
            style={{
              backgroundColor: '#D4BEE4', 
              color: '#3B1E54',
              borderColor: '#9B7EBD'
            }}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="text-sm leading-none text-gray-200" style={{color: '#EEEEEE'}}>Total Supply*</label>
          <TextField
            fullWidth
            variant="outlined"
            type="number"
            min={1}
            placeholder="Recommended: 1 for NFTs"
            value={formData.totalSupply}
            onChange={(e) => {
              setFormData({
                ...formData,
                totalSupply: e.target.value,
              });
            }}
            style={{
              backgroundColor: '#D4BEE4', 
              color: '#3B1E54',
              borderColor: '#9B7EBD'
            }}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="text-sm leading-none text-gray-200" style={{color: '#EEEEEE'}}>Decimals*</label>
          <TextField
            fullWidth
            variant="outlined"
            type="number"
            min={0}
            placeholder="Recommended: 0 for NFTs"
            value={formData.decimals}
            onChange={(e) => {
              setFormData({
                ...formData,
                decimals: e.target.value,
              });
            }}
            style={{
              backgroundColor: '#D4BEE4', 
              color: '#3B1E54',
              borderColor: '#9B7EBD'
            }}
          />
        </div>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.image}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  image: e.target.checked,
                });
              }}
              style={{color: '#EEEEEE'}}
            />
          }
          label="Need image"
          style={{color: '#EEEEEE'}}
        />
        
        {formData.image && (
          <div className="flex flex-col gap-y-2">
            <label className="text-sm leading-none text-gray-200" style={{color: '#EEEEEE'}}>URL Field</label>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter Image URL"
              value={formData.urlField}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  urlField: e.target.value,
                });
              }}
              style={{
                backgroundColor: '#D4BEE4', 
                color: '#3B1E54',
                borderColor: '#9B7EBD'
              }}
            />
          </div>
        )}
        <div className="flex flex-col gap-y-2">
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.freeze}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    freeze: e.target.checked,
                  });
                }}
                style={{color: '#EEEEEE'}}
              />
            }
            label="Freeze"
            style={{color: '#EEEEEE'}}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.clawback}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    clawback: e.target.checked,
                  });
                }}
                style={{color: '#EEEEEE'}}
              />
            }
            label="Clawback"
            style={{color: '#EEEEEE'}}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.defaultFrozen}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    defaultFrozen: e.target.checked,
                  });
                }}
                style={{color: '#EEEEEE'}}
              />
            }
            label="Default Frozen"
            style={{color: '#EEEEEE'}}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          {processStep === 4 ? (
            <>
              <p className="text-green-500 text-sm" style={{color: '#EEEEEE'}}>
                Asset created successfully!
                <br />
              </p>
              {createdAssetID && (
                <a
                  href={
                    formData.format === "Token"
                      ? getTokenPreviewURL(createdAssetID)
                      : getAssetPreviewURL(createdAssetID)
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary-yellow hover:text-primary-yellow/80 transition text-lg py-2 animate-pulse"
                  style={{color: '#EEEEEE'}}
                >
                  View the Created Asset (May take up to 30s to Load)
                </a>
              )}
              <p className="text-slate-400 text-xs" style={{color: '#EEEEEE'}}>
                You can reload the page if you want to use again.
              </p>
            </>
          ) : processStep === 3 ? (
            <>
              <p className="text-green-200/60 text-sm animate-pulse" style={{color: '#EEEEEE'}}>
                Sending transaction...
              </p>
            </>
          ) : processStep === 2 ? (
            <>
              <p className="text-green-200/60 text-sm animate-pulse" style={{color: '#EEEEEE'}}>
                Transaction created!
              </p>
              <Button
                variant="contained"
                className="rounded bg-secondary-orange hover:bg-secondary-orange/80 transition text-black/90 font-semibold px-4 py-1 mt-2"
                onClick={() => {
                  sendTransaction();
                }}
                style={{color: '#EEEEEE', backgroundColor: '#9B7EBD'}}
              >
                Step 2: Sign
              </Button>
            </>
          ) : processStep === 1 ? (
            <div className="mx-auto flex flex-col">
              <div
                className="spinner-border animate-spin inline-block mx-auto w-8 h-8 border-4 rounded-full"
                role="status"
              ></div>
              Creating transaction...
            </div>
          ) : (
            <Button
              variant="contained"
              className="rounded bg-secondary-orange hover:bg-secondary-orange/80 transition text-black/90 font-semibold px-4 py-1 mt-2"
              onClick={mint}
              style={{color: '#EEEEEE', backgroundColor: '#9B7EBD'}}
            >
              Step 1: Mint
            </Button>
          )}
        </div>
        <p className="text-sm italic text-slate-200 mb-6" style={{color: '#EEEEEE'}}>Site Fee: Free/Pin Fee: Variable</p>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            removeStoredData();
            window.location.reload();
          }}
          style={{color: '#EEEEEE', borderColor: '#9B7EBD'}}
        >
          Clear & start over
        </Button>
        
      </form>
    </div>
  );
}
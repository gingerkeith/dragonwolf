import contractABI from "../utils/contract_ABI.json";
import forge_contractABI from "../utils/forge_contract_ABI.json";
import { Abi } from "abitype";
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const externalContracts = {
  80002: {
    DragonWolf: {
      address: "0xC65f39B9706504538fa642BA93190A6c14afa1Fe",
      abi: contractABI as Abi,
    },
    DragonWolf_Forge: {
      address: "0xBD8e63F4e29171742d81b5566ca030F3e2FdBDCE",
      abi: forge_contractABI as Abi,
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;

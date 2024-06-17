import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";
import contractABI from "../utils/contract_ABI.json";

const externalContracts = {
  80002: {
    DragonWolf: {
      address: "0xC6760c2Fd1809742B4577aAaa4013C92e9Cd89bB",
      abi: contractABI,
    },
  },
} as const;


export default externalContracts satisfies GenericContractsDeclaration;

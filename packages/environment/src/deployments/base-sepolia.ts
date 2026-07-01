import { Network } from "../networks.js";
import { Deployment, defineDeployment, Kind } from "../releases.js";

export default defineDeployment<typeof Deployment.BASE_SEPOLIA>({
  ccipChainSelector: 10344971235874465080n,
  externalContracts: {
    ccipRouter: "0xd3b06cebf099ce7da4accf578aaebfdbd6e88a93",
    wrappedNative: "0x4200000000000000000000000000000000000006",
    tokenAdminRegistry: "0x736d0bbb318c1b27ff686cd19804094e66250e17",
  },
  kind: Kind.TEST,
  label: "Base Sepolia Testnet",
  network: Network.BASE_SEPOLIA,
  slug: Deployment.BASE_SEPOLIA,
});

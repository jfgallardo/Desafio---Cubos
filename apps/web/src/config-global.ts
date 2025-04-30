import packageJson from "../package.json";
import { paths } from "./routes/paths";

export type ConfigValue = {
  site: {
    name: string;
    description: string;
    version: string;
    serverUrl: string;
  };
  auth: {
    method: string;
    skip: boolean;
    redirectPath: string;
  };
};

export const CONFIG: ConfigValue = {
  site: {
    name: "CUBOS - Movie",
    description: "Descubra, explore e assista aos melhores filmes com CUBOS.",
    version: packageJson.version,
    serverUrl: process.env.NEXT_PUBLIC_API_SERVER || "",
  },
  auth: {
    method: "jwt",
    skip: false,
    redirectPath: paths.dashboard.root,
  },
};

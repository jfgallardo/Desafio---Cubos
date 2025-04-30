import { CONFIG } from "@/config-global";
import DashboardView from "@/sections/dashboard/view/dashboard-view";

export const metadata = { title: `Dashboard | ${CONFIG.site.name}` };

export default function Page() {
  return <DashboardView />;
}

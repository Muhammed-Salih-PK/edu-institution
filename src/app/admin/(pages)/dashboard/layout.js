export async function generateMetadata() {
  return {
    title: "Admin Panel - Dashboard",
    robots: "noindex, nofollow", // Prevent search engines from indexing this page
  };
}
export default function DashboardLayout({ children }) {
  return <>{children}</>;
}
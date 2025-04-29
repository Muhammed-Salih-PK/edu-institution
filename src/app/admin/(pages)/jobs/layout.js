export async function generateMetadata() {
  return {
    title: "Admin Panel - Manage Jobs",
    robots: "noindex, nofollow", // Prevent search engines from indexing this page
  };
}
export default function JobLayout({ children }) {
  return <>{children}</>;
}

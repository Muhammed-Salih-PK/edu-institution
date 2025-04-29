
export async function generateMetadata() {
  return {
    title: "Admin Panel - Manage Courses",
    robots: "noindex, nofollow", // Prevent search engines from indexing this page
  };
}

export default function Layout({ children }) {
  return (
    <>
      {children}
    </>
  );
}

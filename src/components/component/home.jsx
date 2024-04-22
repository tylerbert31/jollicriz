import ProfileCards from "./profile_cards";
import CommentSection from "./comments";
import Header from "./header/header";

export async function Home() {
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 min-w-[420px]">
      <Header />
      <main className="flex-1 overflow-auto p-4">
        <ProfileCards />
        <CommentSection />
      </main>
    </div>
  );
}

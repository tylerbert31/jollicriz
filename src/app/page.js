import LoginForm from "@/components/component/login/form";

export default function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Jollicriz
          </h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

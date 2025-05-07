
import { PrivacyPolicyButton } from "@/components/PrivacyPolicyButton";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your App</h1>
        <p className="text-xl text-gray-600 mb-8">Start building your amazing project here!</p>
        <PrivacyPolicyButton />
      </div>
    </div>
  );
};

export default Index;

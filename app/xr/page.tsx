import Web3AuthProvider from "@/components/client/providers/Web3AuthProvider";
import XRLoginPage from "@/components/client/XRLoginPage";

export default function XRPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-white">
      <Web3AuthProvider>
        <XRLoginPage />
      </Web3AuthProvider>
    </div>
  );
}

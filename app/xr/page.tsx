import Web3AuthProvider from "@/components/client/providers/SafeAuthProvider";
import XRLoginPage from "@/components/client/XRLoginPage";
import TestPush from "@/components/client/push/TestPush";

export default function PushPage() {
  return (
    // <div className="h-screen w-screen flex items-center justify-center bg-white">
    <Web3AuthProvider>
      <XRLoginPage />
    </Web3AuthProvider>
    // </div>
  );
}

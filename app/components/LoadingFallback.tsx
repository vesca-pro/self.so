import { Loader2 } from "lucide-react";
import React from "react";

interface LoadingFallbackProps {
  message: string;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <Loader2 className="h-10 w-10 mr-2 animate-spin" />
      <p className="mt-2.5 text-center text-lg">{message}</p>
    </div>
  );
};

export default LoadingFallback;

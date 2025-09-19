import React from "react";

const WarningBanner: React.FC<{ message: string }> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="mb-2 p-2 bg-yellow-100 text-yellow-800 rounded text-sm">
      {message}
    </div>
  );
};

export default WarningBanner;

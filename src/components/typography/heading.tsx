import React, { FC } from "react";

const Heading: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <h1 className="text-3xl font-bold text-black dark:text-white">
      {children}
    </h1>
  );
};

export default Heading;

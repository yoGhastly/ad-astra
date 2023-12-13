import React, { ReactChild, ReactNode } from "react";
import { Skeleton } from "moti/skeleton";

const Loader = ({
  children,
  show
}: {
  children: ReactChild;
  show: boolean;
}) => <Skeleton show={show}>{children}</Skeleton>;

export default Loader;

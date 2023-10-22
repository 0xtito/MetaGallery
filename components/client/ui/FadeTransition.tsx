"use client";

import { Transition } from "@headlessui/react";

interface FadeTransitionProps {
  children: React.ReactNode;
  show: boolean;
  afterExit: () => void;
}

function FadeTransition({ children, show, afterExit }: FadeTransitionProps) {
  return (
    <Transition
      show={show}
      enter="transition-opacity duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-1000"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      afterLeave={afterExit}
    >
      {children}
    </Transition>
  );
}

export default FadeTransition;

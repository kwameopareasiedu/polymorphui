import type { ComponentVariants } from "polymorphui/variant";

export default {
  spinner: {},
  text: {
    default: "text-sm tracking-wide text-cyan-600",
  },
  button: {
    default:
      "flex justify-center items-center gap-1 bg-[#228be6] px-4 py-2 rounded text-white text-sm font-[600] transition-opacity enabled:hover:bg-[#1c7ed6] enabled:active:translate-y-[1px] focus:outline-0 focus:opacity-85 disabled:opacity-50 data-[flex=true]:w-full",
  },
} as ComponentVariants;

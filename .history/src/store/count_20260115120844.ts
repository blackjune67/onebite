import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useCountStore = create(
  combine({ count: 0 }, (set, get) => ({
    actions: {
      increase: () => {
        get()
        set((state) => ({
          count: state.count + 1,
        }));
      },
      decrease: () => {
        set((state) => ({
          count: state.count - 1,
        }));
      },
    },
  })),
);


export const useCount = () => {
  const count = useCountStore((store) => store.count);
  return count;
};

export const useCountIncrease = () => {
  const increase = useCountStore((store) => store.actions.increase);
  return increase;
};

export const useCountDecrease = () => {
  const decrease = useCountStore((store) => store.actions.decrease);
  return decrease;
};

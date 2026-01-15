import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useCountStore = create(
  immer(
    combine({ count: 0 }, (set, get) => ({
      actions: {
        increase: () => {
          get();
          set(() => {})
        },
        decrease: () => {
          set((state) => ({
            count: state.count - 1,
          }));
        },
      },
    })),
  ),
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

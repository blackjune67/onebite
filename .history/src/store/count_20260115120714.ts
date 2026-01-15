import { create } from "zustand";
import { combine } from "zustand/middleware";

type Store = {
  count: number;
  actions: {
    increase: () => void;
    decrease: () => void;
  };
};

create(
  combine({ count: 0 }, (set, get) => ({
    actions: {
      increase: () => {
        get()
        set((store) => ({
          count: store.count + 1,
        }));
      },
      decrease: () => {
        set((store) => ({
          count: store.count - 1,
        }));
      },
    },
  })),
);

export const useCountStore = create<Store>((set, get) => ({
  count: 0,
}));

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

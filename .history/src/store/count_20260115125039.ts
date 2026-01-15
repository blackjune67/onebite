import { create } from "zustand";
import { combine, subscribeWithSelector, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useCountStore = create(
  subscribeWithSelector(
    immer(
      combine({ count: 0 }, (set, get) => ({
        actions: {
          increase: () => {
            set((state) => {
              state.count += 1;
            });
          },
          decrease: () => {
            set((state) => {
              state.count -= 1;
            });
          },
        },
      })),
    ),
  ),
);

useCountStore.subscribe(
  (store) => store.count,
  (count, prevCount) => {
    console.log(count, prevCount);

    const store = useCountStore.getState();
    console.log("==> store", store);
  },
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

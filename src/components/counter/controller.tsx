import { useCountDecrease, useCountIncrease } from "@/store/count";
import { Button } from "../ui/button";

export default function Controller() {
  // const increase = useCountStore((state) => state.increase);
  // const decrease = useCountStore((state) => state.decrease);
  const increase = useCountIncrease();
  const decrease = useCountDecrease();

  return (
    <div>
      <Button onClick={decrease}>-</Button>
      <Button onClick={increase}>+</Button>
    </div>
  );
}

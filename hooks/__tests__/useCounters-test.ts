import { renderHook, act } from "@testing-library/react-native";

import { Card, cards } from "@/lib/counterModifiers";
import { useCounters } from "../useCounters";

const bristlyBill = cards.filter((card) => card.name === "Bristly Bill")[0];
const doublers = cards.filter((c) => c.passiveModifier?.doubleAdded);
const plusOnes = cards.filter((c) => c.passiveModifier?.plus);

describe("useCounters", () => {
  let hook: { current: ReturnType<typeof useCounters> };

  beforeEach(() => {
    const { result } = renderHook(() => useCounters(5));
    hook = result;
  });

  describe("activateAbility", () => {
    describe("Double all counters ability", () => {
      describe("With 0 doublers", () => {
        it("doubles all counters", () => {
          // Stack
          // - Start with 5 counters
          // - 5 new counters from from Bristly Bill doubling
          // Total: 10 counters
          act(() => {
            hook.current.activateAbility(bristlyBill);
          });
          expect(hook.current.counters).toBe(10);
        });

        describe("When there is a plusOne", () => {
          beforeEach(() => {
            act(() => {
              hook.current.setActiveCards((prev) => [...prev, plusOnes[0]]);
            });
          });

          it("doubles all counters and adds one", () => {
            // Stack
            // - Start with 5 counters
            // - 5 new counters from from Bristly Bill doubling
            // - Add 1 from plusOne
            // Total: 11 counters
            act(() => {
              hook.current.activateAbility(bristlyBill);
            });
            expect(hook.current.counters).toBe(11);
          });
        });
      });

      describe("With 1 doubler", () => {
        beforeEach(() => {
          act(() => {
            hook.current.setActiveCards([doublers[0]]);
          });
        });

        it("double doubles all counters", () => {
          // Stack
          // - Start with 5 counters
          // - 5 new counters from from Bristly Bill doubling
          // - 5 gets doubled to 10 by doubler
          // Total: 15 counters
          act(() => {
            hook.current.activateAbility(bristlyBill);
          });
          expect(hook.current.counters).toBe(15);
        });

        describe("When there is a plusOne", () => {
          beforeEach(() => {
            act(() => {
              hook.current.setActiveCards((prev) => [...prev, plusOnes[0]]);
            });
          });

          it("doubles all counters and adds one then doubles that", () => {
            // Stack
            // - Start with 5 counters
            // - 5 new counters from from Bristly Bill doubling
            // - Add 1 from plusOne
            // - 6 gets doubled to 12 by doubler
            // Total: 17 counters
            act(() => {
              hook.current.activateAbility(bristlyBill);
            });
            expect(hook.current.counters).toBe(17);
          });
        });
      });

      describe("With 2 doublers", () => {
        beforeEach(() => {
          act(() => {
            hook.current.setActiveCards([doublers[0], doublers[1]]);
          });
        });

        it("double double doubles all counters", () => {
          // Stack
          // - Start with 5 counters
          // - 5 new counters from from Bristly Bill doubling
          // - 5 gets doubled to 10 by doubler
          // - 10 gets doubled to 20 by doubler
          // Total: 25 counters
          act(() => {
            hook.current.activateAbility(bristlyBill);
          });
          expect(hook.current.counters).toBe(25);
        });

        describe("When there is a plusOne", () => {
          beforeEach(() => {
            act(() => {
              hook.current.setActiveCards((prev) => [...prev, plusOnes[0]]);
            });
          });

          it("doubles all counters and adds one then doubles that then doubles again", () => {
            // Stack
            // - Start with 5 counters
            // - 5 new counters from from Bristly Bill doubling
            // - Add 1 from plusOne
            // - 6 gets doubled to 12 by doubler
            // - 12 gets doubled to 24 by doubler
            // Total: 29 counters
            act(() => {
              hook.current.activateAbility(bristlyBill);
            });
            expect(hook.current.counters).toBe(29);
          });
        });
      });
    });
  });
});

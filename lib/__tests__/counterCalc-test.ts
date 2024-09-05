import { activatedAbilityCounterCalc, counterCalc } from "../counterCalc";
import { Card, cards } from "../counterModifiers";

const doublers = cards.filter((c) => c.passiveModifier?.doubleAdded);
const plusOnes = cards.filter((c) => c.passiveModifier?.plus);
const bristlyBill = cards.filter((card) => card.name === "Bristly Bill")[0];

describe("counterCalc", () => {
  let activeCards: Card[] = [];

  beforeEach(() => {
    activeCards = [];
  });

  describe("Passive abilities", () => {
    describe("When there are 0 doublers", () => {
      describe("When 1 counter is added", () => {
        it("adds the counter", () => {
          // Stack
          // - Add 1
          // Total: 1 new counter
          const newCounters = counterCalc(1, activeCards);
          expect(newCounters).toBe(1);
        });

        describe("When there is a plusOne", () => {
          beforeEach(() => {
            activeCards.push(plusOnes[0]);
          });

          it("adds the counter and one", () => {
            // Stack
            // - Add 1
            // - Add 1 from plusOne
            // Total: 2 new counters
            const newCounters = counterCalc(1, activeCards);
            expect(newCounters).toBe(2);
          });
        });

        describe("When there are 2 plusOnes", () => {
          beforeEach(() => {
            activeCards.push(plusOnes[0]);
            activeCards.push(plusOnes[1]);
          });

          it("adds the counter and two", () => {
            // Stack
            // - Add 1
            // - Add 1 from plusOne
            // - Add 1 from plusOne
            // Total: 3 new counters
            const newCounters = counterCalc(1, activeCards);
            expect(newCounters).toBe(3);
          });
        });
      });
    });

    describe("When there is 1 doubler", () => {
      beforeEach(() => {
        activeCards.push(doublers[0]);
      });

      describe("When 1 counter is added", () => {
        it("adds double that many counters", () => {
          // Stack
          // - Add 1
          // - 1 gets doubled to 2 from doubler
          // Total: 2 new counters
          const newCounters = counterCalc(1, activeCards);
          expect(newCounters).toBe(2);
        });

        describe("When there is a plusOne", () => {
          beforeEach(() => {
            activeCards.push(plusOnes[0]);
          });

          it("adds 2 + double that many counters", () => {
            // Stack
            // - Add 1
            // - Add 1 from plusOne
            // - 2 gets doubled to 4 from doubler
            // Total: 4 new counters
            const newCounters = counterCalc(1, activeCards);
            expect(newCounters).toBe(4);
          });
        });

        describe("When there are 2 plusOnes", () => {
          beforeEach(() => {
            activeCards.push(plusOnes[0]);
            activeCards.push(plusOnes[1]);
          });

          it("adds 3 + double that many counters", () => {
            // Stack
            // - Add 1
            // - Add 1 from plusOne
            // - Add 1 from plusOne
            // - 3 gets doubled to 6 from doubler
            // Total: 6 new counters
            const newCounters = counterCalc(1, activeCards);
            expect(newCounters).toBe(6);
          });
        });
      });
    });

    describe("When there are 2 doublers", () => {
      beforeEach(() => {
        activeCards.push(doublers[0]);
        activeCards.push(doublers[1]);
      });

      describe("When 1 counter is added", () => {
        it("adds the counter", () => {
          // Stack
          // - Add 1
          // - 1 gets doubled to 2 from doubler
          // - 2 gets doubled to 4 from doubler
          // Total: 4 new counters
          const newCounters = counterCalc(1, activeCards);
          expect(newCounters).toBe(4);
        });

        describe("When there is a plusOne", () => {
          beforeEach(() => {
            activeCards.push(plusOnes[0]);
          });

          it("adds the counter and one", () => {
            // Stack
            // - Add 1
            // - Add 1 from plusOne
            // - 2 gets doubled to 4 from doubler
            // - 4 gets doubled to 8 from doubler
            // Total: 8 new counters
            const newCounters = counterCalc(1, activeCards);
            expect(newCounters).toBe(8);
          });
        });

        describe("When there are 2 plusOnes", () => {
          beforeEach(() => {
            activeCards.push(plusOnes[0]);
            activeCards.push(plusOnes[1]);
          });

          it("adds the counter and one", () => {
            // Stack
            // - Add 1
            // - Add 1 from plusOne
            // - Add 1 from plusOne
            // - 3 gets doubled to 6 from doubler
            // - 6 gets doubled to 12 from doubler
            // Total: 8 new counters
            const newCounters = counterCalc(1, activeCards);
            expect(newCounters).toBe(12);
          });
        });
      });
    });

    describe("When no counters are added", () => {
      beforeEach(() => {
        activeCards.push(plusOnes[0]);
        activeCards.push(plusOnes[1]);
        activeCards.push(doublers[0]);
        activeCards.push(doublers[1]);
      });

      it("returns 0", () => {
        const newCounters = counterCalc(0, activeCards);
        expect(newCounters).toBe(0);
      });
    });
  });
});

describe("activatedAbilityCounterCalc", () => {
  describe("Active abilities", () => {
    let abilityCard: Card;

    describe("Double all counters ability", () => {
      beforeEach(() => {
        abilityCard = bristlyBill;
      });

      it("doubles all counters", () => {
        // Stack
        // - Start with 5 counters
        // - 5 new counters from from Bristly Bill doubling
        // Total: 5 new counters
        const newCounters = activatedAbilityCounterCalc(abilityCard, 5);
        expect(newCounters).toBe(5);
      });

      describe("When there are no counters", () => {
        it("returns 0", () => {
          const newCounters = activatedAbilityCounterCalc(abilityCard, 0);
          expect(newCounters).toBe(0);
        });
      });
    });
  });
});

import { calculatePersentLoan, addDays } from "app/services/utils"

describe("calculatePersentLoan", () => {

  it("should return valid value", async () => {
    let values =  {
      sum: 10000
      territory: 0.5
      date_start: new Date()
      date_end: addDays(new Date(), 30)
    }

    let res = calculatePersentLoan(values)

    expect(res).toEqual(1550)
  })

  it("should return valid value", async () => {
    let values =  {
      sum: 1000
      territory: 1.5
      date_start: new Date()
      date_end: addDays(new Date(), 10)
    }

    let res = calculatePersentLoan(values)

    expect(res).toEqual(165)
  })

})

import { calculatePersentLoan, addDays } from "app/services/utils"

describe("calculatePersentLoan", () => {

  it("should return valid value", async () => {
    let options =  {
      sum: 1000
      territory: 0.5
      date_start: new Date()
      date_end: addDays(new Date(), 30)
    }

    let res = calculatePersentLoan(options)

    expect(res).toEqual(305)
  })

  it("should return valid value", async () => {
    let options =  {
      sum: 100
      territory: 1.5
      date_start: new Date()
      date_end: addDays(new Date(), 10)
    }

    let res = calculatePersentLoan(options)

    expect(res).toEqual(11.5)
  })

})

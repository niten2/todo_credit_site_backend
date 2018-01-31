import { Client, Loan } from "config/initialize/mongoose"

describe("", () => {

  describe("#addLoan", () => {
    it('should add loan', async () => {
      let client = await factory.create('client')
      let loan1 = await factory.create('loan')
      let loan2 = await factory.create('loan')

      await client.addLoan(loan1)
      await client.addLoan(loan2)

      const sum = loan1.sum + loan2.sum

      expect(client.total_sum_loans).toEqual(sum)
    })
  })

})

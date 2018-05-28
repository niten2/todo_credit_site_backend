import { Client, Loan } from "config/mongoose"

describe("#addLoan", () => {

  it('should add loan', async () => {
    let client = await factory.create('client')
    let loan = await factory.create('loan')

    await client.addLoan(loan)

    client = await Client.findById(client.id)
    loan = await Loan.findById(loan.id)

    expect(client.loans[0]).toEqual(loan._id)
    expect(loan.client).toEqual(client._id)
  })

})

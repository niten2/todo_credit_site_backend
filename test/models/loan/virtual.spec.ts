import { Loan } from "config/mongoose"
import { calculateLoan, addDays } from "app/services/utils"

describe("#total", () => {

  it('should calculate total', async () => {
    let territory = await factory.create('territory', { rate: 0.5 })

    let client = await factory.create('client', {
      territory: territory
    })

    let loan = await factory.create('loan', {
      client: client.id,
      sum: 1000,
      date_start: new Date(),
      date_end: addDays(new Date(), 30),
    })

    await client.addLoan(loan)

    loan = await Loan.findById(loan.id)

    await Loan.populate(loan, {
      path: 'client',
      populate: { path: 'territory' }
    })

    expect(await loan.total).toEqual(1305)
  })

  it('should calculate total overdue', async () => {
    let territory = await factory.create('territory', { rate: 0.5 })

    let client = await factory.create('client', {
      territory: territory
    })

    let loan = await factory.create('loan', {
      client: client.id,
      sum: 100,
      date_start: addDays(new Date(), -31),
      date_end: addDays(new Date(), -1),
    })

    await client.addLoan(loan)

    loan = await Loan.findById(loan.id)

    await Loan.populate(loan, {
      path: 'client',
      populate: { path: 'territory' }
    })

    expect(await loan.total).toEqual(146)
  })

})

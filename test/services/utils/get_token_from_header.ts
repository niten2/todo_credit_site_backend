import { getTokenFromHeader } from "app/services/utils"

describe("getTokenFromHeader", () => {

  it("should return token", async () => {
    const token = "token"

    let req = {
      header: (value: string): string | null {
        if (value === "Authorization" || value === "authorization") {
          return `Token ${token}`
        }
      }
    }

    let res = getTokenFromHeader(req)

    expect(res).toEqual(token)
  })

  it("should return null", async () => {
    const token = "token"

    let req = {
      header: (value: string): null { return null }
    }

    let res = getTokenFromHeader(req)

    expect(res).toEqual(null)
  })

})

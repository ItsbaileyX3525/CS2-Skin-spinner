const prevButton = document.getElementById("prevButton") as HTMLButtonElement
const nextButton = document.getElementById("nextButton") as HTMLButtonElement
const marketText = document.getElementById("marketPrice") as HTMLParagraphElement
const caseImage = document.getElementById("caseImage") as HTMLImageElement;
const caseName = document.getElementById("caseName") as HTMLParagraphElement;
const buyButton = document.getElementById("buyButton") as HTMLButtonElement;
const spentAmountText = document.getElementById("spent-amount") as HTMLSpanElement;
const gainAmountText = document.getElementById("net-gain-amount") as HTMLSpanElement;
let marketPrice: number = 0.00
let caseLoaded: boolean = false
let totalSpent: number = 0.00
let totalGain: number = 0.00
let onCase: number = 0

let cachedPrices: Record<string, string> = {
  //"Kilowatt Case" : "3.14" - Example
}

const caseNames: string[] = [
  "Kilowatt Case",
  "Revolution Case",
  "Fracture Case",
  "Operation Bravo Case",
]

const cases: Record<string, string> = {
  "Kilowatt Case" : "/assets/kilowatt.png",
  "Revolution Case" : "/assets/revolution.png",
  "Fracture Case" : "/assets/fracture.png",
  "Operation Bravo Case" : "/assets/operation bravo.png",
}

async function fetchPrice(caseType: string): Promise<void> {
  caseLoaded = false
  if (cachedPrices[caseType]) {
    console.log(cachedPrices[caseType])
    marketPrice = parseFloat(cachedPrices[caseType])
    marketText.innerText = "Market price: £" + String(marketPrice)
    caseLoaded = true
    return
  }
  marketText.innerText = "Market price: Loading..."
  var validCase: string[] = caseType.split(" ")
  var caseUrl: string = ""
  for (let e of validCase) {
    caseUrl += e + "%20"
  }
  console.log(caseUrl)
  const fetched = await fetch(`https://api.flik.host/steam_market.php?item=${caseUrl}`)
  
  const data = await fetched.json();

  if (!data || data.ok) {
    console.log(data)
    return;
  }

  marketPrice = data.sell_req
  cachedPrices[caseType] = String(marketPrice)
  marketText.innerText = "Market price: £" + String(marketPrice)
  caseLoaded = true
} 

nextButton.addEventListener("click", async () => {
  if (! caseLoaded) {
    return
  }
  onCase += 1
  if (onCase > caseNames.length - 1) {
    onCase = 0
  }
  caseImage.src = cases[caseNames[onCase]]
  caseName.innerText = caseNames[onCase]
  await fetchPrice(caseNames[onCase])

})

prevButton.addEventListener("click", async () => {
  if (! caseLoaded) {
    return
  }
  onCase -= 1
  if (onCase <= -1) {
    onCase = caseNames.length - 1
  }
  caseImage.src = cases[caseNames[onCase]]
  caseName.innerText = caseNames[onCase]
  await fetchPrice(caseNames[onCase])

})

buyButton.addEventListener("click", () => {
  if (!caseLoaded) {
    return
  }
  totalSpent -= marketPrice
  totalGain -= marketPrice
  spentAmountText.innerHTML = "£" + String(totalSpent.toFixed(2))
  gainAmountText.innerHTML = "£" + String(totalGain.toFixed(2))
})

document.addEventListener("DOMContentLoaded", async () => {
  await fetchPrice("Kilowatt Case")
});

(window as any).fetchPrice = fetchPrice
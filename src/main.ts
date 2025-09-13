const prevButton = document.getElementById("prevButton") as HTMLButtonElement
const nextButton = document.getElementById("nextButton") as HTMLButtonElement
const marketText = document.getElementById("marketPrice") as HTMLParagraphElement
const caseImage = document.getElementById("caseImage") as HTMLImageElement;
const caseName = document.getElementById("caseName") as HTMLParagraphElement;
const buyButton = document.getElementById("buyButton") as HTMLButtonElement;
const spentAmountText = document.getElementById("spent-amount") as HTMLSpanElement;
const gainAmountText = document.getElementById("net-gain-amount") as HTMLSpanElement;
const openScreen = document.getElementById("open-screen") as HTMLDivElement;
const revealedItem = document.getElementById("revealed-item") as HTMLDivElement;
const closeOpeningButton = document.getElementById("close-opening") as HTMLButtonElement;
const itemName = document.getElementById("item-name") as HTMLDivElement;
const itemValue = document.getElementById("item-value") as HTMLDivElement;
const openSound = new Audio('/assets/open.mp3');

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
  "CS:GO Weapon Case",
]

const cases: Record<string, string> = {
  "Kilowatt Case" : "/assets/kilowatt.png",
  "Revolution Case" : "/assets/revolution.png",
  "Fracture Case" : "/assets/fracture.png",
  "Operation Bravo Case" : "/assets/operation bravo.png",
  "CS:GO Weapon Case" : "/assets/weapon.png"
}

const kilowattItems: { name: string; value: number; rarity: string }[] = [
  { name: "Tec-9 | Slag", value: 0.18, rarity: "consumer" },
  { name: "XM1014 | Irezumi", value: 0.14, rarity: "consumer" },
  { name: "UMP-45 | Motorized", value: 0.14, rarity: "consumer" },
  { name: "SSG 08 | Dezastre", value: 0.15, rarity: "consumer" },
  { name: "Nova | Dark Sigil", value: 0.13, rarity: "consumer" },
  { name: "Dual Berettas | Hideout", value: 0.14, rarity: "consumer" },
  { name: "MAC-10 | Light Box", value: 0.23, rarity: "consumer" },
  { name: "MP7 | Just Smile", value: 1.25, rarity: "mil-spec" },
  { name: "Five-SeveN | Hybrid", value: 1.57, rarity: "mil-spec" },
  { name: "Sawed-Off | Analog Input", value: 1.04, rarity: "mil-spec" },
  { name: "M4A4 | Etch lord", value: 3.24, rarity: "restricted" },
  { name: "Glock-18 | Block-18", value: 1.14, rarity: "mil-spec" },
  { name: "Zeus x27 | Olympus", value: 8.21, rarity: "classified" },
  { name: "USP-S | Jawbreaker", value: 13.15, rarity: "classified" },
  { name: "M4A1-S | Black Lotus", value: 16.80, rarity: "classified" },
  { name: "AWP | Chrome Cannon", value: 56.10, rarity: "covert" },
  { name: "AK-47 | Inheritance", value: 181.13, rarity: "covert" },
  { name: "Kukri Knife | Fade", value: 412.53, rarity: "contraband" },
]

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

function getRandomItem() {
  const rand = Math.random() * 100;
  let filteredItems;
  
  if (rand < 50) {
    filteredItems = kilowattItems.filter(item => item.rarity === "consumer" || item.rarity === "mil-spec");
  } else if (rand < 80) {
    filteredItems = kilowattItems.filter(item => item.rarity === "restricted");
  } else if (rand < 95) { 
    filteredItems = kilowattItems.filter(item => item.rarity === "classified");
  } else {
    filteredItems = kilowattItems.filter(item => item.rarity === "covert" || item.rarity === "contraband");
  }
  
  return filteredItems[Math.floor(Math.random() * filteredItems.length)];
}

function startCaseOpening() {  
  openSound.play().catch(e => console.log("Could not play sound:", e));
  
  openScreen.classList.remove("hidden");
  openScreen.classList.add("absolute");
  
  revealedItem.classList.add("hidden");
  closeOpeningButton.classList.add("hidden");
  
  setTimeout(() => {
    const item = getRandomItem();
    
    totalGain += item.value;
    gainAmountText.innerHTML = "£" + String(totalGain.toFixed(2));
    
    itemName.innerText = item.name;
    itemValue.innerText = "£" + item.value.toFixed(2);
    revealedItem.classList.remove("hidden");
    closeOpeningButton.classList.remove("hidden");
    
  }, 7000);
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
  totalSpent += marketPrice
  totalGain -= marketPrice
  spentAmountText.innerHTML = "£" + String(totalSpent.toFixed(2))
  gainAmountText.innerHTML = "£" + String(totalGain.toFixed(2))
  
  startCaseOpening()
})

closeOpeningButton.addEventListener("click", () => {
  openScreen.classList.add("hidden")
  openScreen.classList.remove("absolute")
  
})

document.addEventListener("DOMContentLoaded", async () => {
  await fetchPrice("Kilowatt Case")
});

(window as any).fetchPrice = fetchPrice
const prevButtonLow = document.getElementById("prevButton") as HTMLButtonElement
const nextButtonLow = document.getElementById("nextButton") as HTMLButtonElement
const marketTextLow = document.getElementById("marketPrice") as HTMLParagraphElement
const caseImageLow = document.getElementById("caseImage") as HTMLImageElement;
const caseNameLow = document.getElementById("caseName") as HTMLParagraphElement;
const buyButtonLow = document.getElementById("buyButton") as HTMLButtonElement;
const prevButtonHigh = document.getElementById("prevButtonHigh") as HTMLButtonElement
const nextButtonHigh = document.getElementById("nextButtonHigh") as HTMLButtonElement
const marketTextHigh = document.getElementById("marketPriceHigh") as HTMLParagraphElement
const caseImageHigh = document.getElementById("caseImageHigh") as HTMLImageElement;
const caseNameHigh = document.getElementById("caseNameHigh") as HTMLParagraphElement;
const buyButtonHigh = document.getElementById("buyButtonHigh") as HTMLButtonElement;
const spentAmountText = document.getElementById("spent-amount") as HTMLSpanElement;
const gainAmountText = document.getElementById("net-gain-amount") as HTMLSpanElement;
const openScreen = document.getElementById("open-screen") as HTMLDivElement;
const revealedItem = document.getElementById("revealed-item") as HTMLDivElement;
const closeOpeningButton = document.getElementById("close-opening") as HTMLButtonElement;
const itemName = document.getElementById("item-name") as HTMLDivElement;
const itemValue = document.getElementById("item-value") as HTMLDivElement;
const openSound = new Audio('/assets/open.mp3');
const weaponWheel = document.getElementById("weapon-wheel") as HTMLDivElement;
const wheelItems = document.getElementById("wheel-items") as HTMLDivElement;
const deleteData = document.getElementById('delete-data') as HTMLParagraphElement;
const eraseScreen = document.getElementById("erase-screen") as HTMLDivElement;
const eraseButton = document.getElementById("erase-button") as HTMLButtonElement;
const dontEraseButton = document.getElementById("dont-erase-button") as HTMLButtonElement;

let marketPriceLow: number = 0.00
let marketPriceHigh: number = 0.00
let caseLoaded: boolean = false
let totalSpent: number = 0.00
let totalGain: number = 0.00
let onCaseLow: number = 0
let onCaseHigh: number = 0
let keyPriceLow: number = 2.50
let keyPriceHigh: number = 9.50 //Fluctuates a lot so just keep it at an average

const winSounds: HTMLAudioElement[] = [
  new Audio("/sounds/EZ4ENCE.mp3"),
  new Audio("/sounds/inhuman.mp3"),
  new Audio("/sounds/Ultimate.mp3"),
  new Audio("/sounds/Michael.mp3")
]

const musicKits: Record<string, HTMLAudioElement> = {
  "Music Kit | Inhuman" : new Audio('/sounds/inhuman.mp3'),
  "Music Kit | Reason" : new Audio('/sounds/Reason.mp3'),
  "Music Kit | Feel The Power" : new Audio('/sounds/Feel The Power.mp3'),
  "Music Kit | Make U SWEAT!" : new Audio('/sounds/Make U SWEAT!.mp3'),
  "Music Kit | Under Bright Lights" : new Audio('/sounds/Under Bright Lights.mp3'),
  "Music Kit | All Night" : new Audio('/sounds/All Night.mp3'),
}

let cachedPrices: Record<string, string> = {}

function saveData(): void {

  let data = {
    "totalSpent" : totalSpent,
    "totalGain" : totalGain,
    //Perhaps save weapons claimed
  }
  spentAmountText.innerHTML = "£" + String(totalSpent.toFixed(2))
  gainAmountText.innerHTML = "£" + String(totalGain.toFixed(2))
  localStorage.setItem("data", JSON.stringify(data))
}

function loadData(): void {
  var data: string | null = localStorage.getItem("data")
  if (data === null) {
    saveData()
    loadData()
    return
  }
  var parsedData = JSON.parse(data) as { totalSpent?: number; totalGain?: number }
  totalGain = typeof parsedData.totalGain === "number" ? parsedData.totalGain : 0.00
  totalSpent = typeof parsedData.totalSpent === "number" ? parsedData.totalSpent : 0.00
  spentAmountText.innerHTML = "£" + String(totalSpent.toFixed(2))
  gainAmountText.innerHTML = "£" + String(totalGain.toFixed(2))

}

const caseNamesLow: string[] = [
  "Kilowatt Case",
  "Revolution Case",
  "Fracture Case",
  "Snakebite Case",
  "Fever Case",
  "Clutch Case",
  "Dreams And Nightmares Case",
  "Falchion Case",
  "Danger Zone Case",
  "Horizon Case",
  "NIGHTMODE Music Kit"
]

const casesLow: Record<string, string> = {
  "Kilowatt Case" : "/assets/cases/kilowatt.png",
  "Revolution Case" : "/assets/cases/revolution.png",
  "Fracture Case" : "/assets/cases/fracture.png",
  "Snakebite Case" : "/assets/cases/snakebite.png",
  "Fever Case" : "/assets/cases/fever.png",
  "Clutch Case" : "/assets/cases/clutch.png",
  "Dreams And Nightmares Case" : "/assets/cases/dreams.png",
  "Falchion Case" : "/assets/cases/falchion.png",
  "Danger Zone Case" : "/assets/cases/danger zone.png",
  "Horizon Case" : "/assets/cases/horizon.png",
  "NIGHTMODE Music Kit" : "/assets/kits/nightmode.png"
}

const caseNamesHigh: string[] = [
  "Operation Bravo Case",
  "CS:GO Weapon Case",
  "CS:GO Weapon Case 2",
  "eSports 2013 Case",
  "eSports 2013 Winter Case",
  "eSports 2014 Summer Case",
  "Operation Hydra Case",
  "Operation Riptide Case",
  "Glove Case",
]

const casesHigh: Record<string, string> = {
  "Operation Bravo Case" : "/assets/cases/operation bravo.png",
  "CS:GO Weapon Case" : "/assets/cases/weapon.png",
  "CS:GO Weapon Case 2" : "/assets/cases/weapon2.png",
  "eSports 2013 Case" : "/assets/cases/esports 2013.png",
  "eSports 2013 Winter Case" : "/assets/cases/esports 2013 winter.png",
  "eSports 2014 Summer Case" : "/assets/cases/esports 2014 summer.png",
  "Operation Hydra Case" : "/assets/cases/operation hydra.png",
  "Operation Riptide Case" : "/assets/cases/operation riptide.png",
  "Glove Case" : "/assets/cases/glove.png"
}

//@ts-ignore
const _blank: { name: string; value: number; rarity: string; }[] = [
  { name: " | ", value: 0.0, rarity: "covert" },
  { name: " | ", value: 0.0, rarity: "covert" },
  { name: " | ", value: 0.0, rarity: "covert" },
  { name: " | ", value: 0.0, rarity: "covert" },
  { name: " | ", value: 0.0, rarity: "covert" },
  { name: " | ", value: 0.0, rarity: "covert" },
  { name: " | ", value: 0.0, rarity: "covert" },
  { name: " | ", value: 0.0, rarity: "covert" },
  { name: " | ", value: 0.0, rarity: "covert" },
  { name: " | ", value: 0.0, rarity: "covert" },
]


const kilowattItems: { name: string; value: number; rarity: string }[] = [
  { name: "Tec-9 | Slag", value: 0.18, rarity: "mil-spec" },
  { name: "XM1014 | Irezumi", value: 0.14, rarity: "mil-spec" },
  { name: "UMP-45 | Motorized", value: 0.14, rarity: "mil-spec" },
  { name: "SSG 08 | Dezastre", value: 0.15, rarity: "mil-spec" },
  { name: "Nova | Dark Sigil", value: 0.13, rarity: "mil-spec" },
  { name: "Dual Berettas | Hideout", value: 0.14, rarity: "mil-spec" },
  { name: "MAC-10 | Light Box", value: 0.23, rarity: "mil-spec" },
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
  { name: "★ Kukri Knife | Fade", value: 412.53, rarity: "contraband" },
  { name: "★ Kukri Knife | Forest DDPAT", value: 385.00, rarity: "contraband" },
  { name: "★ Kukri Knife | Vanilla", value: 520.00, rarity: "contraband" },
  { name: "★ Kukri Knife | Crimson Web - kukri Knife", value: 450.00, rarity: "contraband" },
  { name: "★ Kukri Knife | Case Hardened", value: 390.00, rarity: "contraband" },
]

const revolutionItems: { name: string; value: number; rarity: string; }[] = [
  { name: "P250 | Re.built", value: 0.14, rarity: "mil-spec" },
  { name: "Tec-9 | Rebel", value: 0.14, rarity: "mil-spec" },
  { name: "MAG-7 | Insomnia", value: 0.15, rarity: "mil-spec" },
  { name: "SCAR-20 | Fragments", value: 0.14, rarity: "mil-spec" },
  { name: "MP5-SD | Liquidation", value: 0.16, rarity: "mil-spec" },
  { name: "MP9 | Featherweight", value: 0.14, rarity: "mil-spec" },
  { name: "SG 553 | Cyberforce", value: 0.15, rarity: "mil-spec" },
  { name: "R8 Revolver | Banana Cannon", value: 0.93, rarity: "restricted" },
  { name: "P90 | Neoqueen", value: .80, rarity: "restricted" },
  { name: "MAC-10 | Sakkaku", value: .22, rarity: "restricted" },
  { name: "Glock-18 | Umbral Rabbit", value: 1.12, rarity: "restricted" },
  { name: "M4A1-S | Empthorosaur-S", value: 4.35, rarity: "restricted" },
  { name: "P2000 | Wicked Sick", value: 6.69, rarity: "classified" },
  { name: "UMP-45 | Wild Child", value: 6.67, rarity: "classified" },
  { name: "AWP | Duality", value: 9.18, rarity: "classified" },
  { name: "AK-47 | Headshot", value: 51.53, rarity: "covert" },
  { name: "M4A1 | Temukau", value: 63.04, rarity: "covert" },
  { name: "★ Sport Gloves | Vice", value: 9387.11, rarity: "contraband" },
  { name: "★ Driver Gloves | King Snake", value: 3936.66, rarity: "contraband" },
  { name: "★ Sport Gloves | Omega", value: 2296.85, rarity: "contraband" },
  { name: "★ Hand Wraps | Cobalt Skulls", value: 1686.66, rarity: "contraband" },
  { name: "★ Driver Gloves | Imperial Plaid", value: 1171.89, rarity: "contraband" },
]

const fractureItems: { name: string; value: number; rarity: string; }[] = [
  { name: "P90 | Freight", value: 0.14, rarity: "mil-spec" },
  { name: "Negev | Ultralight", value: 0.13, rarity: "mil-spec" },
  { name: "PP-Bizon | Runic", value: 0.15, rarity: "mil-spec" },
  { name: "P2000 | Gnarled", value: 0.17, rarity: "mil-spec" },
  { name: "SG 553 | Ol' Rusty", value: 0.12, rarity: "mil-spec" },
  { name: "SSG 08 | Mainframe 001", value: 0.15, rarity: "mil-spec" },
  { name: "P250 | Cassette", value: 0.15, rarity: "mil-spec" },
  { name: "MAC-10 | Allure", value: 1.40, rarity: "restricted" },
  { name: "Tec-9 | Brother", value: 2.10, rarity: "restricted" },
  { name: "MAG-7 | Monster Call", value: 2.03, rarity: "restricted" },
  { name: "MP5-SD | Kitbash", value: 0.99, rarity: "restricted" },
  { name: "Galil AR | Connexion", value: 1.45, rarity: "restricted" },
  { name: "XM1014 | Entombed", value: 6.12, rarity: "classified" },
  { name: "M4A4 | Tooth Fairy", value: 16.00, rarity: "classified" },
  { name: "Glock-18 | Vouge", value: 8.32, rarity: "classified" },
  { name: "AK-47 | Legion of Anubis", value: 35.23, rarity: "covert" },
  { name: "Desert Eagle | Printstream", value: 75.43, rarity: "covert" },
  { name: "★ Skeleton Knife | Fade", value: 952.50, rarity: "contraband" },
  { name: "★ Skeleton Knife | Slaughter - Skeleton Knife", value: 603.75, rarity: "contraband" },
  { name: "★ Skeleton Knife | Case Hardened", value: 606.30, rarity: "contraband" },
  { name: "★ Skeleton Knife | Blue Steel", value: 465.00, rarity: "contraband" },
  { name: "★ Nomad Knife | Slaughter - Nomad Knife", value: 376.89, rarity: "contraband" },
]

const recoilItems: { name: string; value: number; rarity: string; }[] = [
  { name: "UMP-45 | Roadblock", value: 0.20, rarity: "mil-spec" },
  { name: "Negev | Drop Me", value: 0.20, rarity: "mil-spec" },
  { name: "MAC-10 | Monkeyflage", value: 0.21, rarity: "mil-spec" },
  { name: "FAMAS | Meow 36", value: 0.23, rarity: "mil-spec" },
  { name: "Galil AR | Destroyer", value: 0.23, rarity: "mil-spec" },
  { name: "Glock-18 | Winterized", value: 0.26, rarity: "mil-spec" },
  { name: "M4A4 | Poly Mag", value: 0.85, rarity: "mil-spec" },
  { name: "R8 Revolver | Crazy 8", value: 1.42, rarity: "restricted" },
  { name: "P90 | Vent Rush", value: 1.22, rarity: "restricted" },
  { name: "Dual Berettas | Flora Carnivora", value: 1.65, rarity: "restricted" },
  { name: "SG 553 | Dragon Tech", value: 1.29, rarity: "restricted" },
  { name: "M249 | Downtown", value: 1.40, rarity: "restricted" },
  { name: "Sawed-Off | Kiss♥Love", value: 8.95, rarity: "classified" },
  { name: "P250 | Visions", value: 7.48, rarity: "classified" },
  { name: "AK-47 | Ice Coaled", value: 14.52, rarity: "classified" },
  { name: "AWP | Chromatic Aberration", value: 26.73, rarity: "covert" },
  { name: "USP-S | Printstream", value: 96.68, rarity: "covert" },
  { name: "★ Sport Gloves | Nocts", value: 3637.50, rarity: "contraband" },
  { name: "★ Driver Gloves | Snow Leopard", value: 2651.48, rarity: "contraband" },
  { name: "★ Specialist Gloves | Tiger Strike", value: 1918.19, rarity: "contraband" },
  { name: "★ Specialist Gloves | Marble Fade", value: 2300.09, rarity: "contraband" },
  { name: "★ Driver Gloves | Black Tie", value: 1838.60, rarity: "contraband" },
]

const snakebiteItems: { name: string; value: number; rarity: string; }[] = [
  { name: "R8 Revolver | Junk Yard", value: 0.57, rarity: "mil-spec" },
  { name: "UMP-45 | Oscillator", value: 0.41, rarity: "mil-spec" },
  { name: "CZ75-Auto | Circaetus", value: 0.48, rarity: "mil-spec" },
  { name: "SG 553 | Heavy Metal", value: 0.51, rarity: "mil-spec" },
  { name: "M249 | O.S.I.P.R.", value: 0.44, rarity: "mil-spec" },
  { name: "Nova | Windblown", value: 0.42, rarity: "mil-spec" },
  { name: "Glock-18 | Clear Polymer", value: 1.16, rarity: "mil-spec" },
  { name: "Negev | dev_texture", value: 1.34, rarity: "restricted" },
  { name: "MAC-10 | Button Masher", value: 1.40, rarity: "restricted" },
  { name: "P250 | Cyber Shell", value: 1.52, rarity: "restricted" },
  { name: "Desert Eagle | Trigger Discipline", value: 3.82, rarity: "restricted" },
  { name: "AK-47 | Slate", value: 15.94, rarity: "restricted" },
  { name: "XM1014 | XOXO", value: 12.53, rarity: "classified" },
  { name: "MP9 | Food Chain", value: 12.32, rarity: "classified" },
  { name: "Galil AR | Chromatic Aberration", value: 16.22, rarity: "classified" },
  { name: "USP-S | The Traitor", value: 111.00, rarity: "covert" },
  { name: "M4A4 | In Living Color", value: 116.25, rarity: "covert" },
  { name: "★ Sport Gloves | Slingshot", value: 5263.37, rarity: "contraband" },
  { name: "★ Sport Gloves | Scarlet Shamagh", value: 1657.69, rarity: "contraband" },
  { name: "★ Broken Fang Gloves | Jade", value: 567.27, rarity: "contraband" },
  { name: "★ Hand Wraps | CAUTION!", value: 909.44, rarity: "contraband" },
  { name: "★ Moto Gloves | Blood Pressure", value: 866.66, rarity: "contraband" },
]

const feverItems: { name: string; value: number; rarity: string; }[] = [
  { name: "P2000 | Sure Grip", value: 0.26, rarity: "mil-spec" },
  { name: "XM1014 | Mockingbird", value: 0.26, rarity: "mil-spec" },
  { name: "MAG-7 | Resupply", value: 0.23, rarity: "mil-spec" },
  { name: "MP9 | Nexus", value: 0.23, rarity: "mil-spec" },
  { name: "SSG 08 | Memorial", value: 0.32, rarity: "mil-spec" },
  { name: "M4A4 | Choppa", value: 1.01, rarity: "mil-spec" },
  { name: "USP-S | PC-GRN", value: 0.71, rarity: "mil-spec" },
  { name: "Nova | Rising Sun", value: 2.33, rarity: "restricted" },
  { name: "P90 | Wave Breaker", value: 2.11, rarity: "restricted" },
  { name: "Galil AR | Control", value: 2.21, rarity: "restricted" },
  { name: "Zeus x27 | Tosai", value: 1.70, rarity: "restricted" },
  { name: "Desert Eagle | Serpent Strike", value: 1.71, rarity: "restricted" },
  { name: "UMP-45 | K.O Factory", value: 11.87, rarity: "classified" },
  { name: "Glock-18 | Shinobu", value: 18.24, rarity: "classified" },
  { name: "AK-47 | Searing Rage", value: 27.74, rarity: "classified" },
  { name: "FAMAS | Bad Trip", value: 19.47, rarity: "covert" },
  { name: "AWP | Printstream", value: 239.83, rarity: "covert" },
  { name: "★ Skeleton Knife | Doppler", value: 1031.25, rarity: "contraband" },
  { name: "★ Nomad Knife | Marble Fade", value: 395.63, rarity: "contraband" },
  { name: "★ Skeleton Knife | Tiger Tooth", value: 503.08, rarity: "contraband" },
  { name: "★ Skeleton Knife | Damascus Steel", value: 325.10, rarity: "contraband" },
  { name: "★ Skeleton Knife | Ultraviolet", value: 651.39, rarity: "contraband" },
]

const  clutchItems: { name: string; value: number; rarity: string; }[] = [
  { name: "MP9 | Black Sand", value: 0.26, rarity: "mil-spec" },
  { name: "PP-Bizon | Night Riot", value: 0.26, rarity: "mil-spec" },
  { name: "P2000 | Urban Hazard", value: 0.23, rarity: "mil-spec" },
  { name: "XM1014 | Oxide Blaze", value: 0.23, rarity: "mil-spec" },
  { name: "R8 Revolver | Grip", value: 0.32, rarity: "mil-spec" },
  { name: "SG 553 | Aloha", value: 1.01, rarity: "mil-spec" },
  { name: "Five-SeveN | Flame Test", value: 0.71, rarity: "mil-spec" },
  { name: "Nova | Wild Six", value: 2.33, rarity: "restricted" },
  { name: "Negev | Lionfish", value: 2.11, rarity: "restricted" },
  { name: "MAG-7 | SWAG-7", value: 2.21, rarity: "restricted" },
  { name: "UMP-45 | Artic Wolf", value: 1.70, rarity: "restricted" },
  { name: "Glock-18 | Moonrise", value: 1.71, rarity: "restricted" },
  { name: "AUG | Stymphalian", value: 11.87, rarity: "classified" },
  { name: "AWP | Mortis", value: 18.24, rarity: "classified" },
  { name: "USP-S | Cortex", value: 27.74, rarity: "classified" },
  { name: "MP7 | Bloodsport", value: 19.47, rarity: "covert" },
  { name: "M4A4 | Neo-Noir", value: 239.83, rarity: "covert" },
  { name: "★ Sport Gloves | Omega", value: 1031.25, rarity: "contraband" },
  { name: "★ Hand Wraps | Overprint", value: 395.63, rarity: "contraband" },
  { name: "★ Hydra Gloves | Emerald", value: 503.08, rarity: "contraband" },
  { name: "★ Driver Gloves | Racing Green", value: 325.10, rarity: "contraband" },
  { name: "★ Hydra Gloves | Mangrove", value: 651.39, rarity: "contraband" },
]

const DreamsNightmaresItems: { name: string; value: number; rarity: string; }[] = [
  { name: "P2000 | Lifted Spirits", value: 0.22, rarity: "mil-spec" },
  { name: "Sawed-Off | Spirit Board", value: 0.22, rarity: "mil-spec" },
  { name: "MP5-SD | Necro Jr.", value: 0.20, rarity: "mil-spec" },
  { name: "Five-SeveN | Scrawl", value: 0.26, rarity: "mil-spec" },
  { name: "MAC-10 | Ensnared", value: 0.26, rarity: "mil-spec" },
  { name: "MAG-7 | Foresight", value: 0.18, rarity: "mil-spec" },
  { name: "SCAR-20 | Poultrygeist", value: 0.18, rarity: "mil-spec" },
  { name: "G3SG1 | Dream Glade", value: 1.35, rarity: "restricted" },
  { name: "XM1014 | Zombie Offensive", value: 0.88, rarity: "restricted" },
  { name: "PP-Bizon | Space Cat", value: 1.16, rarity: "restricted" },
  { name: "USP-S | Ticket to Hell", value: 1.13, rarity: "restricted" },
  { name: "M4A1-S | Night Terror", value: 2.27, rarity: "restricted" },
  { name: "MP7 | Abyssal Apparition", value: 6.92, rarity: "classified" },
  { name: "Dual Berettas | Melondrama", value: 7.43, rarity: "classified" },
  { name: "FAMAS | Rapid Eye Movement", value: 9.14, rarity: "classified" },
  { name: "MP9 | Starlight Protector", value: 17.34, rarity: "covert" },
  { name: "AK-47 | Nightwish", value: 76.55, rarity: "covert" },
  { name: "★ Butterfly Knife | Gamma Doppler", value: 3426.15, rarity: "contraband" },
  { name: "★ Butterfly Knife | Lore", value: 3187.49, rarity: "contraband" },
  { name: "★ Butterfly Knife | Autotronic", value: 2201.25, rarity: "contraband" },
  { name: "★ Butterfly Knife | Freehand", value: 989.26, rarity: "contraband" },
  { name: "★ Butterfly Knife | Black Laminate", value: 1263.75, rarity: "contraband" },
  { name: "★ Huntsman Knife | Gamma Doppler", value: 347.24, rarity: "contraband" },
  { name: "★ Bowie Knife | Gamma Doppler", value: 307.50, rarity: "contraband" },
  { name: "★ Falchion Knife | Gamma Doppler", value: 318.86, rarity: "contraband" },
]

const flachionItems: { name: string; value: number; rarity: string; }[] = [
  { name: "Nova | Ranger", value: 0.71, rarity: "mil-spec" },
  { name: "UMP-45 | Riot", value: 0.53, rarity: "mil-spec" },
  { name: "P90 | Elite Build", value: 0.71, rarity: "mil-spec" },
  { name: "Glock-18 | Bunsen Burner", value: 2.10, rarity: "mil-spec" },
  { name: "Galil AR | Rocket Pop", value: 7.57, rarity: "mil-spec" },
  { name: "USP-S | Torque", value: 1.43, rarity: "mil-spec" },
  { name: "Negev | Loudmouth", value: 4.31, rarity: "restricted" },
  { name: "P2000 | Handgun", value: 3.69, rarity: "restricted" },
  { name: "FAMAS | Neural Net", value: 2.94, rarity: "restricted" },
  { name: "MP9 | Ruby Poison Dart", value: 2.72, rarity: "restricted" },
  { name: "M4A4 | Evil Daimyo", value: 17.15, rarity: "restricted" },
  { name: "CZ75-Auto | Yellow Jacket", value: 22.27, rarity: "classified" },
  { name: "SG 553 | Cyrex", value: 20.44, rarity: "classified" },
  { name: "MP7 | Nemesis", value: 20.23, rarity: "classified" },
  { name: "AK-47 | Aquamarine Revenge", value: 200.71, rarity: "covert" },
  { name: "AWP | Hyper Beast", value: 247.49, rarity: "covert" },
  { name: "★ Falchion Knife | Slaughter", value: 249.95, rarity: "contraband" },
  { name: "★ Falchion Knife | Case Hardened", value: 285.00, rarity: "contraband" },
  { name: "★ Falchion Knife | Blue Steel", value: 220.00, rarity: "contraband" },
  { name: "★ Falchion Knife | Boreal Forest", value: 163.67, rarity: "contraband" },
  { name: "★ Falchion Knife | Vanilla", value: 143.84, rarity: "contraband" },
]

const dangerzoneItems: { name: string; value: number; rarity: string; }[] = [
  { name: "Sawed-Off | Black Sand", value: 0.23, rarity: "mil-spec" },
  { name: "Nova | Wood Fired", value: 0.20, rarity: "mil-spec" },
  { name: "SG 553 | Danger Close", value: 0.23, rarity: "mil-spec" },
  { name: "Tec-9 | Fubar", value: 0.55, rarity: "mil-spec" },
  { name: "MP9 | Modest Threat", value: 0.21, rarity: "mil-spec" },
  { name: "Glock-18 | Oxide Blaze", value: 0.65, rarity: "mil-spec" },
  { name: "M4A4 | Magnesium", value: 5.45, rarity: "mil-spec" },
  { name: "G3SG1 | Scavenger", value: 1.39, rarity: "restricted" },
  { name: "MAC-10 | Pipe Down", value: 2.09, rarity: "restricted" },
  { name: "Galil AR | Signal", value: 1.85, rarity: "restricted" },
  { name: "P250 | Nevermore", value: 1.94, rarity: "restricted" },
  { name: "USP-S | Flashback", value: 1.96, rarity: "restricted" },
  { name: "MP5-SD | Phosphor", value: 10.03, rarity: "classified" },
  { name: "UMP-45 | Momentum", value: 8.79, rarity: "classified" },
  { name: "Desert Eagle | Mecha Industries", value: 14.90, rarity: "classified" },
  { name: "AWP | Neo-Noir", value: 47.37, rarity: "covert" },
  { name: "AK-47 | Asiimov", value: 240.00, rarity: "covert" },
  { name: "★ Stiletto Knife | Fade", value: 651.21, rarity: "contraband" },
  { name: "★ Talon Knife | Blue Steel", value: 584.44, rarity: "contraband" },
  { name: "★ Navaja Knife | Crimson Web", value: 175.53, rarity: "contraband" },
  { name: "★ Talon Knife | Vanilla", value: 89.14, rarity: "contraband" },
  { name: "★ Navaja Knife | Case Hardened", value: 189.14, rarity: "contraband" },
]

const horizonItems: { name: string; value: number; rarity: string; }[] = [
  { name: "R8 Revolver | Survivalist", value: 0.39, rarity: "mil-spec" },
  { name: "AUG | Amber Slipstream", value: 0.34, rarity: "mil-spec" },
  { name: "Dual Berettas | Shread", value: 0.38, rarity: "mil-spec" },
  { name: "P90 | Traction", value: 0.77, rarity: "mil-spec" },
  { name: "Tec-9 | Snek-9", value: 0.78, rarity: "mil-spec" },
  { name: "MP9 | Capillary", value: 0.48, rarity: "mil-spec" },
  { name: "Glock-18 | Warhawk", value: 0.86, rarity: "mil-spec" },
  { name: "MP7 | Powercore", value: 3.58, rarity: "restricted" },
  { name: "CZ75-Auto | Eco", value: 3.82, rarity: "restricted" },
  { name: "G3SG1 | High Seas", value: 3.50, rarity: "restricted" },
  { name: "Nova | Toy Soldier", value: 3.83, rarity: "restricted" },
  { name: "AWP | PAW", value: 5.57, rarity: "restricted" },
  { name: "Sawed-Off | Devourer", value: 16.62, rarity: "classified" },
  { name: "FAMAS | Eye of Athena", value: 18.43, rarity: "classified" },
  { name: "M4A1-S | Nightmare", value: 75.00, rarity: "classified" },
  { name: "Desert Eagle | Code Red", value: 152.75, rarity: "covert" },
  { name: "AK-47 | Neon Rider", value: 225.00, rarity: "covert" },
  { name: "★ Stiletto Knife | Fade", value: 651.21, rarity: "contraband" },
  { name: "★ Stiletto Knife | Night Stripe", value: 299.99, rarity: "contraband" },
  { name: "★ Ursus Knife | Stained", value: 150.06, rarity: "contraband" },
  { name: "★ Navaja Knife | Vanilla", value: 89.14, rarity: "contraband" },
  { name: "★ Talon Knife | Case Hardened", value: 725.84, rarity: "contraband" },
]

const NIGHTMODEitems: { name: string; value: number; rarity: string; }[] = [
  { name: "Music Kit | Under Bright Lights", value: 8.21, rarity: "covert" },
  { name: "Music Kit | Inhuman", value: 5.57, rarity: "covert" },
  { name: "Music Kit | All Night", value: 2.62, rarity: "covert" },
  { name: "Music Kit | Reason", value: 1.55, rarity: "covert" },
  { name: "Music Kit | Feel The Power", value: 1.45, rarity: "covert" },
  { name: "Music Kit | Make U SWEAT!", value: 0.97, rarity: "covert" },
]

const relationLow: Record<string, { name: string; value: number; rarity: string; }[]> = {
  "Kilowatt Case" : kilowattItems,
  "Revolution Case" : revolutionItems,
  "Fracture Case" : fractureItems,
  "Recoil Case" : recoilItems,
  "Snakebite Case" : snakebiteItems,
  "Fever Case" : feverItems,
  "Clutch Case" : clutchItems,
  "Dreams And Nightmares Case" : DreamsNightmaresItems,
  "Falchion Case" : flachionItems,
  "Danger Zone Case" : dangerzoneItems,
  "Horizon Case" : horizonItems,
  "NIGHTMODE Music Kit" : NIGHTMODEitems
}

const weaponItems: { name: string; value: number; rarity: string; }[] = [
  { name: "MP7 | Skulls", value: 15.08, rarity: "mil-spec" },
  { name: "SG 553 | Ultraviolet", value: 34.45, rarity: "mil-spec" },
  { name: "AUG | Wings", value: 13.54, rarity: "mil-spec" },
  { name: "Glock-18 | Dragon Tattoo", value: 120.00, rarity: "restricted" },
  { name: "M4A1-S | Dark Water - M4A1-S", value: 90.00, rarity: "restricted" },
  { name: "USP-S | Dark Water - USP-S", value: 61.40, rarity: "restricted" },
  { name: "Desert Eagle | Hypnotic", value: 98.24, rarity: "classified" },
  { name: "AK-47 | Case Hardened", value: 370.99, rarity: "classified" },
  { name: "AWP | Lightning Strike", value: 543.54, rarity: "covert" },
  { name: "★ Gut Knife | Fade", value: 221.04, rarity: "contraband" },
  { name: "★ Karambit | Vanilla", value: 1736.47, rarity: "contraband" },
  { name: "★ M9 Bayonet | Blue Steel", value: 873.71, rarity: "contraband" },
  { name: "★ M9 Bayonet | Stained", value: 657.75, rarity: "contraband" },
  { name: "★ Gut Knife | Case Hardened - Gut Knife", value: 323.19, rarity: "contraband" },
]

const weapon2Items: { name: string; value: number; rarity: string; }[] = [
  { name: "SCAR-20 | Crimson Web", value: 8.45, rarity: "mil-spec" },
  { name: "P250 | Hive", value: 2.44, rarity: "mil-spec" },
  { name: "FMAS | Hexane", value: 2.54, rarity: "mil-spec" },
  { name: "Tec-9 | Blue Titanium", value: 6.50, rarity: "mil-spec" },
  { name: "M4A1-S | Blood Tiger", value: 8.07, rarity: "mil-spec" },
  { name: "Nova | Graphite", value: 12.13, rarity: "restricted" },
  { name: "Dual Berettas | Hemoglobin", value: 12.24, rarity: "restricted" },
  { name: "MP9 | Hypnotic", value: 12.41, rarity: "restricted" },
  { name: "Five-SeveN | Case Hardened", value: 15.23, rarity: "restricted" },
  { name: "P90 | Cold Blooded", value: 49.59, rarity: "classified" },
  { name: "USP-S | Serum", value: 54.09, rarity: "classified" },
  { name: "SSG 08 | Blood in the Water", value: 94.17, rarity: "covert" },
  { name: "★ Karambit | Crimson Web", value: 4515.87, rarity: "contraband" },
  { name: "★ M9 Bayonet | Crimson Web", value: 2925.00, rarity: "contraband" },
  { name: "★ Karambit | Vanilla", value: 1736.47, rarity: "contraband" },
  { name: "★ M9 Bayonet | Vanilla", value: 1222.54, rarity: "contraband" },
  { name: "★ Karambit | Stained", value: 900.00, rarity: "contraband" },
]

const esports2013Items: { name: string; value: number; rarity: string; }[] = [
  { name: "MAG-7 | Memento", value: 2.12, rarity: "mil-spec" },
  { name: "FAMAS | Doomkitty", value: 1.54, rarity: "mil-spec" },
  { name: "M4A4 | Faded Zebra", value: 11.07, rarity: "mil-spec" },
  { name: "Sawed-Off | Orange DDPAT - Sawed-Off", value: 32.54, rarity: "restricted" },
  { name: "P250 | Splash", value: 22.00, rarity: "restricted" },
  { name: "Galil AR | Orange DDPAT - Galil AR", value: 25.05, rarity: "restricted" },
  { name: "AK-47 | Red Laminate", value: 325.14, rarity: "classified" },
  { name: "AWP | BOOM", value: 350.45, rarity: "classified" },
  { name: "P90 | Death by Kitty", value: 42.44, rarity: "covert" },
  { name: "★ Karambit | Boreal Forest", value: 1231.35, rarity: "contraband" },
  { name: "★ Karambit | Crimson Web", value: 2500.00, rarity: "contraband" },
  { name: "★ M9 Bayonet | Slaughter", value: 1100.00, rarity: "contraband" },
  { name: "★ Gut Knife | Case Hardened - Gut Knife", value: 750.00, rarity: "contraband" },
  { name: "★ Flip Knife | Blue Steel", value: 500.00, rarity: "contraband" },
]

const esports2013winterItems: { name: string; value: number; rarity: string; }[] = [
  { name: "PP-Bizon | Water Sigil", value: 4.15, rarity: "mil-spec" },
  { name: "Nova | Ghost Camo", value: 1.94, rarity: "mil-spec" },
  { name: "Five-SeveN | Nightshade", value: 2.07, rarity: "mil-spec" },
  { name: "G3SG1 | Azure Zebra", value: 2.45, rarity: "mil-spec" },
  { name: "P250 | Steel Disruption", value: 2.43, rarity: "mil-spec" },
  { name: "Galil AR | Blue Titanium", value: 7.14, rarity: "mil-spec" },
  { name: "P90 | Blind Spot", value: 8.32, rarity: "restricted" },
  { name: "AK-47 | Blue Laminate", value: 26.42, rarity: "restricted" },
  { name: "FAMAS | Afterimage", value: 32.28, rarity: "classified" },
  { name: "AWP | Eletric Hive", value: 75.64, rarity: "classified" },
  { name: "Desert Eagle | Cobalt Disruption", value: 110.25, rarity: "classified" },
  { name: "M4A4 | X-Ray", value: 142.12, rarity: "covert" },
  { name: "★ Gut Knife | Urban Masked", value: 3072.35, rarity: "contraband" },
  { name: "★ Flip Knife | Blue Steel", value: 1800.00, rarity: "contraband" },
  { name: "★ M9 Bayonet | Fade", value: 1300.00, rarity: "contraband" },
  { name: "★ Karambit | Safari Mesh", value: 900.00, rarity: "contraband" },
  { name: "★ Gut Knife | Forest DDPAT", value: 600.00, rarity: "contraband" },
]

const esports2014summerItems: { name: string; value: number; rarity: string; }[] = [
  { name: "CZ75-Auto | Hexane", value: 2.89, rarity: "mil-spec" },
  { name: "XM1014 | Red Python", value: 1.49, rarity: "mil-spec" },
  { name: "Negev | Bratatat", value: 4.34, rarity: "mil-spec" },
  { name: "SSG 08 | Dark Water", value: 1.82, rarity: "mil-spec" },
  { name: "USP-S | Blood Tiger", value: 5.00, rarity: "mil-spec" },
  { name: "MAC-10 | Ultraviolet", value: 26.39, rarity: "mil-spec" },
  { name: "P90 | Virus", value: 4.42, rarity: "restricted" },
  { name: "PP-Bizon | Blue Streak", value: 6.93, rarity: "restricted" },
  { name: "MP7 | Ocean Foam", value: 3.74, rarity: "restricted" },
  { name: "Glock-18 | Steel Disruption", value: 6.81, rarity: "restricted" },
  { name: "Desert Eagle | Crimson Web", value: 114.63, rarity: "restricted" },
  { name: "AUG | Bengal Tiger", value: 32.52, rarity: "classified" },
  { name: "P2000 | Corticera", value: 30.95, rarity: "classified" },
  { name: "Nova | Bloomstick", value: 37.57, rarity: "classified" },
  { name: "AWP | Corticera", value: 83.33, rarity: "classified" },
  { name: "M4A4 | Bullet Rain", value: 187.50, rarity: "covert" },
  { name: "AK-47 | Jaguar", value: 322.49, rarity: "covert" },
  { name: "★ M9 Bayonet | Stained", value: 3072.35, rarity: "contraband" },
  { name: "★ Karambit | Night - Karambit", value: 2200.00, rarity: "contraband" },
  { name: "★ M9 Bayonet | Night - M9 Bayonet", value: 1400.00, rarity: "contraband" },
  { name: "★ Gut Knife | Fade", value: 1000.00, rarity: "contraband" },
  { name: "★ Bayonet | Foest DDPAT", value: 400.00, rarity: "contraband" },
]

const bravoItems: { name: string; value: number; rarity: string; }[] = [
  { name: "SG 553 | Wave Spray", value: 8.00, rarity: "mil-spec" },
  { name: "G3SG1 | Demeter", value: 10.43, rarity: "mil-spec" },
  { name: "Dual Berettas | Black Limba", value: 15.08, rarity: "mil-spec" },
  { name: "UMP-45 | Bone Pile", value: 7.56, rarity: "mil-spec" },
  { name: "Galil AR | Shattered", value: 23.25, rarity: "mil-spec" },
  { name: "Nova | Tempest", value: 8.32, rarity: "mil-spec" },
  { name: "M4A1-S | Bright Water", value: 45.00, rarity: "restricted" },
  { name: "MAC-10 | Graven", value: 39.12, rarity: "restricted" },
  { name: "USP-S | Overgrowth", value: 63.00, rarity: "restricted" },
  { name: "M4A4 | Zirka", value: 60.00, rarity: "restricted" },
  { name: "P90 | Emerald Dragon", value: 240.00, rarity: "classified" },
  { name: "P200 | Ocean Foam", value: 132.12, rarity: "classified" },
  { name: "AWP | Graphite", value: 200.07, rarity: "classified" },
  { name: "AK-47 | Fire Serpent", value: 3154.32, rarity: "covert" },
  { name: "Desert Eagle | Golden Koi", value: 283.07, rarity: "covert" },
  { name: "★ M9 Bayonet | Fade", value: 1869.04, rarity: "contraband" },
  { name: "★ M9 Bayonet | Slaughter - M9 Bayonet", value: 1169.22, rarity: "contraband" },
  { name: "★ Karambit | Vanilla", value: 1736.47, rarity: "contraband" },
  { name: "★ Karambit | Stained", value: 900.00, rarity: "contraband" },
  { name: "★ Bayonet | Slaughter - Bayonet", value: 468.75, rarity: "contraband" },
]

const hydraItems: { name: string; value: number; rarity: string; }[] = [
  { name: "FAMAS | Macabre", value: 4.34, rarity: "mil-spec" },
  { name: "MAG-7 | Hard Water", value: 2.99, rarity: "mil-spec" },
  { name: "UMP-45 | Metal Flowers", value: 3.88, rarity: "mil-spec" },
  { name: "Tec-9 | Cut Out", value: 7.38, rarity: "mil-spec" },
  { name: "MAC-10 | Aloha", value: 4.41, rarity: "mil-spec" },
  { name: "M4A1-S | Briefing", value: 25.89, rarity: "mil-spec" },
  { name: "USP-S | Blueprint", value: 36.00, rarity: "mil-spec" },
  { name: "P2000 | Woodsman", value: 17.42, rarity: "restricted" },
  { name: "P250 | Red Rock", value: 21.79, rarity: "restricted" },
  { name: "P90 | Death Grip", value: 19.68, rarity: "restricted" },
  { name: "SSG 08 | Death's Head", value: 18.39, rarity: "restricted" },
  { name: "AK-47 | Orbit Mk01", value: 74.54, rarity: "restricted" },
  { name: "Dual Berettas | Cobra Strike", value: 44.98, rarity: "classified" },
  { name: "Galil AR | Sugar Rush", value: 87.95, rarity: "classified" },
  { name: "M4A4 | Hellfire", value: 390.00, rarity: "classified" },
  { name: "Five-SeveN | Hyper Beast", value: 129.85, rarity: "covert" },
  { name: "AWP | Oni Taiji", value: 525.00, rarity: "covert" },
  { name: "★ Sport Gloves | Pandora's Box", value: 24000.00, rarity: "contraband" },
  { name: "★ Moto Gloves | Spearmint", value: 18000.00, rarity: "contraband" },
  { name: "★ Driver Gloves | Crimson Weave", value: 15000.00, rarity: "contraband" },
  { name: "★ Hand Wraps | Slaughter", value: 12000.00, rarity: "contraband" },
  { name: "★ Specialist Gloves | Foundation", value: 8000.00, rarity: "contraband" },
]

const ripideItems: { name: string; value: number; rarity: string; }[] = [
  { name: "Dual Berettas | Tread", value: 8.00, rarity: "mil-spec" },
  { name: "G3SG1 | Keeping Tabs", value: 10.43, rarity: "mil-spec" },
  { name: "MP7 | Guerrilla", value: 15.08, rarity: "mil-spec" },
  { name: "PP-Bizon | Lumen", value: 7.56, rarity: "mil-spec" },
  { name: "AUG | Plague", value: 23.25, rarity: "mil-spec" },
  { name: "XM1014 | Watchdog", value: 8.32, rarity: "mil-spec" },
  { name: "USP-S | Black Lotus", value: 45.00, rarity: "restricted" },
  { name: "MAG-7 | BI83 Spectrum", value: 39.12, rarity: "restricted" },
  { name: "FAMAS | ZX Spectron", value: 63.00, rarity: "restricted" },
  { name: "Five-SeveN | Boost Protocol", value: 60.00, rarity: "restricted" },
  { name: "MP9 | Mount Fuji", value: 240.00, rarity: "classified" },
  { name: "M4A4 | Spider Lily", value: 132.12, rarity: "classified" },
  { name: "MAC-10 | Toybox", value: 200.07, rarity: "classified" },
  { name: "Glock-18 | Snack Attack", value: 3154.32, rarity: "covert" },
  { name: "SSG 08 | Turbo Peek", value: 283.07, rarity: "covert" },
  { name: "Desert Eagle | Ocean Drive", value: 283.07, rarity: "covert" },
  { name: "AK-47 | Leet Museo", value: 283.07, rarity: "covert" },
  { name: "★ Butterfly Knife | Gamma Doppler - Butterfly Knife", value: 3324.00, rarity: "contraband" },
  { name: "★ Karambit | Autotronic", value: 243.54, rarity: "contraband" },
  { name: "★ Bowie Knife | Freehand", value: 124.11, rarity: "contraband" },
  { name: "★ Bowie Knife | Gamma Doppler - Bowie Knife", value: 343.00, rarity: "contraband" },
]

const gloveItems: { name: string; value: number; rarity: string; }[] = [
  { name: "MAG-7 | Sonar", value: 0.48, rarity: "mil-spec" },
  { name: "MP9 | Sand Scale", value: 0.32, rarity: "mil-spec" },
  { name: "P2000 | Turf", value: 0.74, rarity: "mil-spec" },
  { name: "Galil AR | Black Sand", value: 0.63, rarity: "mil-spec" },
  { name: "CZ75-Auto | Polymer", value: 0.46, rarity: "mil-spec" },
  { name: "MP7 | Cirrus", value: 0.61, rarity: "mil-spec" },
  { name: "Glock-18 | Ironwork", value: 1.92, rarity: "mil-spec" },
  { name: "G3SG1 | Stinger", value: 2.00, rarity: "restricted" },
  { name: "Nova | Gila", value: 1.67, rarity: "restricted" },
  { name: "Dual Berettas | Royal Consorts", value: 3.46, rarity: "restricted" },
  { name: "M4A1-S | Flashback", value: 10.29, rarity: "restricted" },
  { name: "USP-S | Cyrex", value: 7.84, rarity: "restricted" },
  { name: "Sawed-Off | Wasteland Princess", value: 18.01, rarity: "classified" },
  { name: "P90 | Shallow Grave", value: 14.36, rarity: "classified" },
  { name: "FAMAS | Mecha Industries", value: 21.65, rarity: "classified" },
  { name: "SSG 08 | Dragonfire", value: 44.25, rarity: "covert" },
  { name: "M4A4 | Buzz Kill", value: 311.25, rarity: "covert" },
  { name: "★ Sport Gloves | Pandora's Box", value: 47784.88, rarity: "contraband" },
  { name: "★ Sport Gloves | Hedge Maze", value: 42107.03, rarity: "contraband" },
  { name: "★ Sport Gloves | Superconductor", value: 17778.43, rarity: "contraband" },
  { name: "★ Specialist Gloves | Crimson Kimono", value: 17174.25, rarity: "contraband" },
  { name: "★ Moto Gloves | Spearmint", value: 11052.73, rarity: "contraband" },
]


const relationHigh: Record<string, { name: string; value: number; rarity: string; }[]> = {
  "CS:GO Weapon Case" : weaponItems,
  "eSports 2013 Case" : esports2013Items,
  "eSports 2013 Winter Case" : esports2013winterItems,
  "Operation Bravo Case" : bravoItems,
  "CS:GO Weapon Case 2" : weapon2Items,
  "eSports 2014 Summer Case" : esports2014summerItems,
  "Operation Hydra Case" : hydraItems,
  "Operation Riptide Case" : ripideItems,
  "Glove Case" : gloveItems,
}


async function fetchPriceLow(caseType: string): Promise<void> {
  caseLoaded = false
  if (cachedPrices[caseType]) {
    marketPriceLow = parseFloat(cachedPrices[caseType])
    marketTextLow.innerText = "Market price: £" + String(marketPriceLow)
    caseLoaded = true
    return
  }
  marketTextLow.innerText = "Market price: Loading..."
  var validCase: string[] = caseType.split(" ")
  var caseUrl: string = ""
  for (let e of validCase) {
    caseUrl += e + "%20"
  }

  const fetched = await fetch(`https://api.flik.host/steam_market.php?item=${caseUrl}`)
  
  const data = await fetched.json();

  if (!data || !data.mean_price) {
    return;
  }

  marketPriceLow = data.mean_price
  cachedPrices[caseType] = String(marketPriceLow)
  marketTextLow.innerText = "Market price: £" + String(marketPriceLow)
  caseLoaded = true
} 

async function fetchPriceHigh(caseType: string): Promise<void> {
  caseLoaded = false
  if (cachedPrices[caseType]) {
    marketPriceHigh = parseFloat(cachedPrices[caseType])
    marketTextHigh.innerText = "Market price: £" + String(marketPriceHigh)
    caseLoaded = true
    return
  }
  marketTextHigh.innerText = "Market price: Loading..."
  var validCase: string[] = caseType.split(" ")
  var caseUrl: string = ""
  for (let e of validCase) {
    caseUrl += e + "%20"
  }
  const fetched = await fetch(`https://api.flik.host/steam_market.php?item=${caseUrl}`)
  
  const data = await fetched.json();

  if (!data || !data.mean_price) {
    return;
  }

  marketPriceHigh = data.mean_price
  cachedPrices[caseType] = String(marketPriceHigh)
  marketTextHigh.innerText = "Market price: £" + String(marketPriceHigh)
  caseLoaded = true
} 

function getRandomItem(
  source: Array<{ name: string; value: number; rarity: string }> | Record<string, any> = kilowattItems
) {
  const items = Array.isArray(source)
    ? source
    : Object.keys(source).map((k) => {
        const v = source[k];
        if (typeof v === "number") return { name: k, value: v, rarity: "mil-spec" };
        return { name: k, value: typeof v.value === "number" ? v.value : 0, rarity: v.rarity ?? "mil-spec" };
      });

  const chances = {
    milspec: 79.92,
    restricted: 15.98,
    classified: 3.2,
    covert: 0.64,
    contraband: 0.26,
  };

  const rand = Math.random() * 100;
  let pool: typeof items = [];

  if (rand < chances.milspec) {
    pool = items.filter((i) => i.rarity === "mil-spec");
  } else if (rand < chances.milspec + chances.restricted) {
    pool = items.filter((i) => i.rarity === "restricted");
  } else if (rand < chances.milspec + chances.restricted + chances.classified) {
    pool = items.filter((i) => i.rarity === "classified");
  } else if (rand < chances.milspec + chances.restricted + chances.classified + chances.covert) {
    pool = items.filter((i) => i.rarity === "covert");
  } else {
    pool = items.filter((i) => i.rarity === "contraband");
  }

  if (!pool || pool.length === 0) {
    return items[Math.floor(Math.random() * items.length)];
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

function createWheelItems(caseItems: { name: string; value: number; rarity: string }[], winningItem: { name: string; value: number; rarity: string }, isHighCase: boolean = false): void {
  wheelItems.innerHTML = '';
  
  const rarityWeights: Record<string, number> = {
    "mil-spec": 15984,
    restricted: 1598,
    classified: 320,
    covert: 64,
    contraband: 26
  };
  
  const createWeightedPool = (items: typeof caseItems): typeof caseItems => {
    const weightedPool: typeof caseItems = [];
    items.forEach(item => {
      const weight = rarityWeights[item.rarity] || 1;
      for (let i = 0; i < weight; i++) {
        weightedPool.push(item);
      }
    });
    return weightedPool;
  };
  
  const getItemImage = (itemName: string, rarity: string): string => {
    if (rarity === 'contraband') {
      return '/assets/gold.png';
    }
    
    let folder = '';
    
    if (isHighCase) {
      const currentCaseHigh = caseNamesHigh[onCaseHigh];
      if (currentCaseHigh === 'Operation Bravo Case') folder = 'operation bravo';
      else if (currentCaseHigh === 'CS:GO Weapon Case') folder = 'weapon case 1';
      else if (currentCaseHigh === 'CS:GO Weapon Case 2') folder = 'weapon case 2';
      else if (currentCaseHigh === 'eSports 2013 Case') folder = 'esports 2013';
      else if (currentCaseHigh === 'eSports 2013 Winter Case') folder = 'esports 2013 winter';
      else if (currentCaseHigh === 'eSports 2014 Summer Case') folder = 'esports 2014 summer';
      else if (currentCaseHigh === 'Operation Riptide Case') folder = 'operation riptide';
      else if (currentCaseHigh === 'Operation Hydra Case') folder = 'operation hydra';
      else if (currentCaseHigh === 'Glove Case') folder = 'glove';
      else folder = 'kilowatt';
    } else {
      const currentCaseLow = caseNamesLow[onCaseLow];
      if (currentCaseLow === 'Kilowatt Case') folder = 'kilowatt';
      else if (currentCaseLow === 'Revolution Case') folder = 'revolution';
      else if (currentCaseLow === 'Fracture Case') folder = 'fracture';
      else if (currentCaseLow === 'Dreams And Nightmares Case') folder = 'dreams';
      else if (currentCaseLow === 'Danger Zone Case') folder = 'danger';
      else if (currentCaseLow === 'Falchion Case') folder = 'falchion';
      else if (currentCaseLow === 'Clutch Case') folder = 'clutch';
      else if (currentCaseLow === 'Fever Case') folder = 'fever';
      else if (currentCaseLow === 'Recoil Case') folder = 'recoil';
      else if (currentCaseLow === 'Snakebite Case') folder = 'snakebite';      
      else if (currentCaseLow === 'Horizon Case') folder = 'horizon';      
      else if (currentCaseLow === 'NIGHTMODE Music Kit') folder = 'nightmode';      
      else folder = 'kilowatt';
    }
    
    const imageName = itemName.split(' | ')[1]?.toLowerCase().replace(/\s+/g, ' ') || 'slag';
    return `/assets/${folder}/${imageName}.png`;
  };
  
  const weightedPool = createWeightedPool(caseItems);
  const wheelItemsArray: { name: string; value: number; rarity: string }[] = [];
  
  for (let i = 0; i < 200; i++) {
    const randomItem = weightedPool[Math.floor(Math.random() * weightedPool.length)];
    wheelItemsArray.push(randomItem);
  }
  
  wheelItemsArray.push(winningItem);
  const winningPosition = wheelItemsArray.length - 1;
  
  for (let i = 0; i < 20; i++) {
    const randomItem = weightedPool[Math.floor(Math.random() * weightedPool.length)];
    wheelItemsArray.push(randomItem);
  }
  
  wheelItemsArray.forEach((item) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = `wheel-item rarity-${item.rarity}`;
    
    const imageUrl = getItemImage(item.name, item.rarity);

    itemDiv.innerHTML = `
      <img src="${imageUrl}" alt="${item.name}" class="w-24 h-24 object-contain" onerror="this.style.display='none'">
    `;
    
    wheelItems.appendChild(itemDiv);
  });
  
  const itemWidth = 124;
  const wheelCenter = weaponWheel.offsetWidth / 2;
  
  const finalPosition = -(winningPosition * itemWidth) + wheelCenter - (itemWidth / 2);
  
  document.documentElement.style.setProperty('--final-position', `${finalPosition}px`);
}

function getActualItemImage(itemName: string, onHigh: boolean = false): string {
  let folder = '';
  
  const currentCaseLow = caseNamesLow[onCaseLow];
  const currentCaseHigh = caseNamesHigh[onCaseHigh];
  
  if (onHigh) {
    if (currentCaseHigh === 'Operation Bravo Case') folder = 'operation bravo';
    else if (currentCaseHigh === 'CS:GO Weapon Case') folder = 'weapon case 1';
    else if (currentCaseHigh === 'CS:GO Weapon Case 2') folder = 'weapon case 2';
    else if (currentCaseHigh === 'eSports 2013 Case') folder = 'esports 2013';
    else if (currentCaseHigh === 'eSports 2013 Winter Case') folder = 'esports 2013 winter';
    else if (currentCaseHigh === 'eSports 2014 Summer Case') folder = 'esports 2014 summer';
    else if (currentCaseHigh === 'Operation Riptide Case') folder = 'operation riptide';
    else if (currentCaseHigh === 'Operation Hydra Case') folder = 'operation hydra';
    else if (currentCaseHigh === 'Glove Case') folder = 'glove';
  } else {
    if (currentCaseLow === 'Kilowatt Case') folder = 'kilowatt';
    else if (currentCaseLow === 'Revolution Case') folder = 'revolution';
    else if (currentCaseLow === 'Fracture Case') folder = 'fracture';
    else if (currentCaseLow === 'Dreams And Nightmares Case') folder = 'dreams';
    else if (currentCaseLow === 'Danger Zone Case') folder = 'danger';
    else if (currentCaseLow === 'Falchion Case') folder = 'falchion';
    else if (currentCaseLow === 'Clutch Case') folder = 'clutch';
    else if (currentCaseLow === 'Fever Case') folder = 'fever';
    else if (currentCaseLow === 'Recoil Case') folder = 'recoil';
    else if (currentCaseLow === 'Snakebite Case') folder = 'snakebite';      
    else if (currentCaseLow === 'Horizon Case') folder = 'horizon';
    else if (currentCaseLow === 'NIGHTMODE Music Kit') folder = 'nightmode';      
    else folder = 'kilowatt';
  }

  const imageName = itemName.split(' | ')[1]?.toLowerCase().replace(/\s+/g, ' ') || 'slag';
  return `/assets/${folder}/${imageName}.png`;
}

function startWheelSpin(): void {
  weaponWheel.classList.add('wheel-spinning');
}

function startCaseOpeningLow() {  
  openSound.pause()
  openSound.currentTime = 0.0
  openSound.play()
  
  openScreen.classList.remove("hidden");
  openScreen.classList.add("absolute");
  
  revealedItem.classList.add("hidden");
  closeOpeningButton.classList.add("hidden");
  weaponWheel.classList.remove('wheel-spinning');
  
  const item = getRandomItem(relationLow[caseNamesLow[onCaseLow]]);
  createWheelItems(relationLow[caseNamesLow[onCaseLow]], item, false);
  
  setTimeout(() => {
    startWheelSpin();
  }, 500);
  
  if (item.rarity == "contraband") {
    setTimeout(() => {
      winSounds[Math.floor(Math.random() * ((winSounds.length - 1) - 0 + 1)) + 0].play()
    }, 6500)
  }
  if (item.name.startsWith("Music Kit")) {
      setTimeout(() => {
        musicKits[item.name].play()
      }, 6500)
  }

  setTimeout(() => {
    totalGain += item.value;
    gainAmountText.innerHTML = "£" + String(totalGain.toFixed(2));
    
    itemName.innerText = item.name;
    itemValue.innerText = "£" + item.value.toFixed(2);
    
    // Set the actual item image (not gold.png for contraband)
    const itemImage = document.getElementById('item-image') as HTMLImageElement;
    if (itemImage) {
      itemImage.src = getActualItemImage(item.name, false);
      itemImage.alt = item.name;
    }
    
    revealedItem.classList.remove("hidden");
    closeOpeningButton.classList.remove("hidden");
    
  }, 6500);
} 

function startCaseOpeningHigh() {  
  openSound.pause()
  openSound.currentTime = 0.0
  openSound.play()
  
  openScreen.classList.remove("hidden");
  openScreen.classList.add("absolute");
  
  revealedItem.classList.add("hidden");
  closeOpeningButton.classList.add("hidden");
  weaponWheel.classList.remove('wheel-spinning');
  
  const item = getRandomItem(relationHigh[caseNamesHigh[onCaseHigh]]);
  
  createWheelItems(relationHigh[caseNamesHigh[onCaseHigh]], item, true);
  
  setTimeout(() => {
    startWheelSpin();
  }, 500);
  
  setTimeout(() => {
    totalGain += item.value;
    gainAmountText.innerHTML = "£" + String(totalGain.toFixed(2));
    
    itemName.innerText = item.name;
    itemValue.innerText = "£" + item.value.toFixed(2);
    
    // Set the actual item image (not gold.png for contraband)
    const itemImage = document.getElementById('item-image') as HTMLImageElement;
    if (itemImage) {
      itemImage.src = getActualItemImage(item.name, true);
      itemImage.alt = item.name;
    }
    
    revealedItem.classList.remove("hidden");
    closeOpeningButton.classList.remove("hidden");
    
  }, 6500);
} 


nextButtonLow.addEventListener("click", async () => {
  if (! caseLoaded) {
    return
  }
  onCaseLow += 1
  if (onCaseLow > caseNamesLow.length - 1) {
    onCaseLow = 0
  }
  caseImageLow.src = casesLow[caseNamesLow[onCaseLow]]
  caseNameLow.innerText = caseNamesLow[onCaseLow]
  await fetchPriceLow(caseNamesLow[onCaseLow])

})

prevButtonLow.addEventListener("click", async () => {
  if (! caseLoaded) {
    return
  }
  onCaseLow -= 1
  if (onCaseLow <= -1) {
    onCaseLow = caseNamesLow.length - 1
  }
  caseImageLow.src = casesLow[caseNamesLow[onCaseLow]]
  caseNameLow.innerText = caseNamesLow[onCaseLow]
  await fetchPriceLow(caseNamesLow[onCaseLow])

})

buyButtonLow.addEventListener("click", () => {
  if (!caseLoaded) {
    return
  }
  totalSpent += keyPriceLow
  totalSpent += marketPriceLow
  totalGain -= marketPriceLow
  saveData()
  startCaseOpeningLow()
})

nextButtonHigh.addEventListener("click", async () => {
  if (! caseLoaded) {
    return
  }
  onCaseHigh += 1
  if (onCaseHigh > caseNamesHigh.length - 1) {
    onCaseHigh = 0
  }
  caseImageHigh.src = casesHigh[caseNamesHigh[onCaseHigh]]
  caseNameHigh.innerText = caseNamesHigh[onCaseHigh]
  await fetchPriceHigh(caseNamesHigh[onCaseHigh])

})

prevButtonHigh.addEventListener("click", async () => {
  if (! caseLoaded) {
    return
  }
  onCaseHigh -= 1
  if (onCaseHigh <= -1) {
    onCaseHigh = caseNamesHigh.length - 1
  }
  caseImageHigh.src = casesHigh[caseNamesHigh[onCaseHigh]]
  caseNameHigh.innerText = caseNamesHigh[onCaseHigh]
  await fetchPriceHigh(caseNamesHigh[onCaseHigh])

})

buyButtonHigh.addEventListener("click", () => {
  if (!caseLoaded) {
    return
  }
  totalSpent += keyPriceHigh
  totalSpent += marketPriceHigh
  totalGain -= marketPriceHigh
  saveData()
  startCaseOpeningHigh()
})

closeOpeningButton.addEventListener("click", () => {
  for (let e of winSounds) {
    e.pause()
    e.currentTime = 0
  }
  for (let e of Object.values(musicKits)) {
    e.pause()
    e.currentTime = 0
  }
  openScreen.classList.add("hidden")
  openScreen.classList.remove("absolute")
  weaponWheel.classList.remove('wheel-spinning')
  wheelItems.innerHTML = ''
})

deleteData.addEventListener("click", () => {
  eraseScreen.classList.add("absolute")
  eraseScreen.classList.remove("hidden")
})

eraseButton.addEventListener("click", () => {
  localStorage.clear()
  window.location.reload()
})

dontEraseButton.addEventListener("click", () => {
  eraseScreen.classList.add("hidden")
  eraseScreen.classList.remove("absolute")
})

document.addEventListener("DOMContentLoaded", async () => {
  loadData()
  for (let e of Object.values(musicKits)) {
    e.volume = .1
  }
  for (let e of winSounds) {
    e.volume = .1
  }
  await fetchPriceLow("Kilowatt Case")
  await fetchPriceHigh("Operation Bravo Case")
});

//(window as any).fetchPrice = fetchPriceLow
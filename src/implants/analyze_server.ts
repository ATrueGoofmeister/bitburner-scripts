import { NS } from "@ns";

export async function main(ns: NS): Promise<void> {
   let host = ns.getHostname()
   let server = ns.getServer(host)
   ns.print("successfully running on '" + host + "'. Starting analysis...")
   ns.print(">>>> hacking level : " + ns.getHackingLevel())
   ns.print(">>>> available money: " + server.moneyAvailable)
   ns.print(">>>> max money: " + server.moneyMax)
   ns.print(">>>> current security level: " + server.hackDifficulty)
   ns.print(">>>> min security level: " + server.minDifficulty)
   ns.print(">>>> required hacking level: " + server.requiredHackingSkill)
   ns.print(">>>> num ports required: " + server.numOpenPortsRequired)
   ns.print(">>>> max ram: " + server.maxRam)
   ns.print(">>>> used ram: " + server.ramUsed)
   ns.print(">>>> grow time: " + ns.getGrowTime(host))
   ns.print(">>>> weaken time: " + ns.getWeakenTime(host))
   ns.print(">>>> hack time: " + ns.getHackTime(host))
   }
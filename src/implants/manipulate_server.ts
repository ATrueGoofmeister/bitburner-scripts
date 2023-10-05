import { NS } from "@ns";
import { Server } from "@ns";

class Selector {
   hacking_level: number
   security_level: number

   constructor(_hacking_level: number, _security_level: number) {
      this.hacking_level = _hacking_level
      this.security_level = _security_level
   }

   // todo(al) sanity-check the min-/max-boarders
   isWeakenable(): boolean {
      return this.security_level >= this.hacking_level * 0.66 
            && this.security_level <= this.hacking_level
   }

   isHackable(): boolean {
      return this.security_level >= this.hacking_level * 0.33 
         && this.security_level <= this.hacking_level * 0.66
   }
   
   isGrowable(): boolean {
      return this.security_level >= this.hacking_level * 0
         && this.security_level <= this.hacking_level * 0.33
   }
}

export async function main(ns: NS): Promise<void> {
   let host = ns.getHostname()
   let server = ns.getServer(host)
   ns.print("successfully running on '" + host + "'. Starting manipulation...")

   if (server.requiredHackingSkill === undefined 
      || server.hackDifficulty === undefined) {
      ns.print("necessary server information not available.")
      return
   }

   while (true) {
      let hacking_level = ns.getHackingLevel()
      let selector = new Selector(hacking_level, server.hackDifficulty)
   
      if (hacking_level >= server.requiredHackingSkill) {
         ns.print("manipulating '" + host + "' [ hacking_level: " + hacking_level + "/ security_level " + server.hackDifficulty + "].")
         if(selector.isHackable()) {
            await ns.hack(host)
         } else if (selector.isGrowable()) {
            await ns.grow(host)
         } else if (selector.isWeakenable()){
            await ns.weaken(host)
         }
      } else {
         ns.print("manipulating '" + host + "' not successfull. Insufficient hacking skill [" + hacking_level + "/" + server.requiredHackingSkill + "].")
      }
      await ns.sleep(200)
   }
}
import { NS } from "@ns";
import { Server } from "@ns";

export async function scan_host(ns: NS, host: string, node_blacklist: string[]) {
	node_blacklist.push(host)
	let nodes: string[] = ns.scan(host)
	for (let node_nr = 0; node_nr < nodes.length; node_nr++) {
		let current_host: string = nodes[node_nr]
		if (!node_blacklist.includes(current_host)) {
			let current_server: Server = ns.getServer(current_host)
			let hackingLevel: number = ns.getHackingLevel()

			ns.print("current host : " + current_host)
			ns.print(">>> numOpenPorts [" + current_server.openPortCount + " / " + current_server.numOpenPortsRequired + "]")
			ns.print(">>> requiredHackingSkill [" + hackingLevel + " / " + current_server.requiredHackingSkill + "]")
			ns.print(">>> hasAdminRights [" + current_server.hasAdminRights + "]")


		    if (current_server.requiredHackingSkill !== undefined 
					&& current_server.openPortCount !== undefined 
					&& current_server.numOpenPortsRequired !== undefined
					&& hackingLevel >= current_server.requiredHackingSkill
					&& current_server.openPortCount >= current_server.numOpenPortsRequired
					&& !current_server.hasAdminRights) {
				ns.print("No admin rights available for '" + current_host + "' nuking...")
				ns.nuke(current_host)
		    } 
			
			if (current_server.hasAdminRights) {
				await ns.hack(current_host)
			}
			
			await scan_host(ns, current_host, node_blacklist)
		}
	}
}

export async function main(ns: NS): Promise<void> {
	while (true) {
        let node_blacklist: string[]  = []
        await scan_host(ns, "home", node_blacklist)	
	}
}
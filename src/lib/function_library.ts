import { NS } from "@ns";
import { Server } from "@ns";

// todo(al) evaluate how to chose implant by script argument
export const implant_filename: string = "implants/manipulate_server.js"
//export const implant_filename: string = "implants/analyze_server.js"

function enough_open_ports(server: Server): boolean {
    return (server.openPortCount !== undefined
        && server.numOpenPortsRequired !== undefined
        && (server.openPortCount >= server.numOpenPortsRequired))
}

function gain_root_access(ns: NS, node: string){
    let current_server = ns.getServer(node)

    // todo(al) evaluate if programs can be created automatically
    if(!enough_open_ports(current_server)) {
        if (!ns.fileExists("BruteSSH.exe")) {
            ns.print("cannot open ssh ports, BruteSSH.exe does not exist.")
            return
        }
        ns.brutessh(node)
    }

    if(enough_open_ports(current_server)) {
        if (!ns.fileExists("NUKE.exe")) {
            ns.print("cannot gain root access, NUKE.exe does not exist.")
            return
        }
        ns.nuke(node) 
    } else {
        ns.print("could not open enough ports for node '" + node + "' [" + current_server.openPortCount + "/ " + current_server.numOpenPortsRequired + "]")
    }
}

export function implant_manipulation_file(ns: NS, node: string){
    if(!ns.hasRootAccess(node)) {
        gain_root_access(ns, node)
    }

    if (ns.hasRootAccess(node)){
        ns.scp(implant_filename, node, "home")
        ns.exec(implant_filename, node)
    } else {
        ns.print("could not implant manipulation file on node '" + node + "', missing root access.")
    }
}

export function remove_manipulation_file(ns: NS, node: string) {
    if (ns.fileExists(implant_filename, node)) {
        ns.print("file '" + implant_filename  + "' exists on node '"+ node +"'. Deleting...")
        ns.rm(implant_filename, node)
    } else {
        ns.print("file '" + implant_filename  + "' does not exist on node '"+ node + "'. Doing nothing...")
    }
}

export function get_subnodes(ns: NS, node_blacklist: string[], node_of_interest: string, node_action: (ns:NS, a: string) => void) {
    node_action(ns, node_of_interest)
    node_blacklist.push(node_of_interest)
    let connected_nodes: string[] = ns.scan(node_of_interest)    
    connected_nodes.forEach((element) => {
        if (!node_blacklist.includes(element)) {
            get_subnodes(ns, node_blacklist, element, node_action)
        }
    })
}
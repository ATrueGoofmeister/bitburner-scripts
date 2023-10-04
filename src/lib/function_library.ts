import { NS } from "@ns";

export const filename: string = "manipulate_server.js"

export function copy_manipulation_file(ns: NS, node: string) {
    if (!ns.fileExists(filename, node)) {
        ns.print("file '" + filename + " does not exist on node '" + node + "'. Secure copying file...")
        ns.scp(filename, node, "home")
    } else {
        ns.print("file '" + filename + " does already exist on node '" + node + "'. Doing nothing...")
    }
}

export function remove_manipulation_file(ns: NS, node: string) {
    if (ns.fileExists(filename, node)) {
        ns.print("file '" + filename  + "' exists on node '"+ node +"'. Deleting...")
        ns.rm(filename, node)
    } else {
        ns.print("file '" + filename  + "' does not exist on node '"+ node + "'. Doing nothing...")
    }
}

export function execute_manipulation_file(ns: NS, node: string) {
    if (ns.fileExists(filename, node)) {
        if(!ns.getServer(node).hasAdminRights) {
            ns.print("cannot access '" + node + "'. Enforcing admin rights...")
            // todo(al) get those admin rights!
        }
        ns.exec(filename, node)
    } else {
        ns.print("file '" + filename + " does not exist on node '" + node + "'. Doing nothing...")
    }

}

export function copy_and_execute_manipulation_file(ns: NS, node: string){
    if(!ns.hasRootAccess(node)) {
        // todo(al) get those admin rights!
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
import { NS } from "@ns";
import { implant_manipulation_file } from "./lib/function_library"
import { remove_manipulation_file } from "./lib/function_library"
import { get_subnodes } from "./lib/function_library"


export async function main(ns: NS): Promise<void> {
    let node_blacklist: string[] = []
    get_subnodes(ns, node_blacklist, "home", remove_manipulation_file)
}
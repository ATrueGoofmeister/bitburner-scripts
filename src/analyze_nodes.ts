import { NS } from "@ns";
import { copy_manipulation_file } from "./lib/function_library"
import { remove_manipulation_file } from "./lib/function_library"
import { execute_manipulation_file } from "./lib/function_library"
import { get_subnodes } from "./lib/function_library"


export async function main(ns: NS): Promise<void> {
    let node_blacklist: string[] = []
    get_subnodes(ns, node_blacklist, "home", copy_and_execute_manipulation_file)
}
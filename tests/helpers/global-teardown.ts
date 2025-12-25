import {FullConfig} from "@playwright/test";
import {exec} from "node:child_process";

export default async function globalTeardown(config: FullConfig) {
    if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
        exec("allure serve", (error, stdout, stderr) => {
            if (error) {
                console.error(error);
            }
        })
    }
}